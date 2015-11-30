import Ember from 'ember';
import layout from './template';
import SelectionProxy from 'embric/utils/selection-proxy';
import  animDissolveAway from 'embric/utils/anim-dissolve-away';
import  ZindexSupport from 'embric/mixins/zindex-support';

function _emptySelection() {
  return Ember.Object.create({
    type: 'empty',
    fill: '#8BADA3',
    stroke: '#0D1F30',
    strokeWidth: 1,
    opacity: 1.0
  });
}

/**
  Mediates the connection between embric components and a `Fabric Canvas`. It also wraps
  Fabric selections in an {{#crossLink "Utils.SelectionProxy"}}{{/crossLink}}, so that properties
  of the current selection can be bound. The various mixins that are used to implement
  editor widgets assume that an instance of `EmbricEditor` is bound to their `editor`
  property.

  ### Example

  ```htmlbars
  \{{#embric-editor as |editor| }}
    <h2>Editor</h2>
    \{{fabric-canvas width=800 height=300 editor=editor }}
    <div class="editor-controls-panel">
      <h3>Controls</h3>
      <div class="control-column">
        \{{embric-fill-stroke-editor editor=editor}}
        \{{embric-basic-shapes-widget editor=editor}}
        \{{embric-static-text-editor editor=editor}}
      </div>
      <div class="control-column">
        \{{embric-group-editor editor=editor}}
        \{{embric-duplicate-selection editor=editor}}
        \{{embric-delete-selection editor=editor}}
        \{{embric-zindex-editor editor=editor}}
      </div>
    </div>
  \{{/embric-editor}}
  ```

  @class EmbricEditor
  @namespace Components
  @extends Ember.Component
  @public
*/
/**
  The top-level embric component, `embric-editor` contains no markup and yields an instance
  that interface widgets can bind to.
  When an included {{#crossLink "Elements.fabric-canvas"}}{{/crossLink}} is bound to an instance
  of `embric-editor`, when it creates its fabric canvas it will register it with the bound editor,
  making the fabric selection and canvas available to widgets bound to the same instance
  of `embric-editor`.
  @element embric-editor
*/
export default Ember.Component.extend(ZindexSupport, {
  layout,
  currentCanvas: null,
  classNames: ['embric-editor'],
  /**
    The fabric `canvas` object the editor is managing.

    @property canvas
    @type fabric.Canvas
    @public
  */
  canvas: Ember.computed('currentCanvas', {
    get() {
      return this.get('currentCanvas.fabricCanvas');
    }
  }),
  currentCanvasJSON() {
    let canvas = this.get('canvas');
    let json = JSON.stringify(canvas);
    return json;
  },
  defaultProperties: _emptySelection(), // TODO: App prefs
  redrawDebounce: 100,

  /**
    A proxy for the current selection in the `fabric canvas`.
    Normal ember get/set semantics can be used with this
    object.
    If there are multiple objects selected, getters return a
    property if it has the same value for all objects in the
    selection, and setters set the property recursively on
    all objects in the selection.


    @property selection
    @type SelectionProxy
    @public
  */
  selection: SelectionProxy.create({ selection: _emptySelection() }),


  updateSelection() {
    console.log('updateSelection');
    let canvas = this.get('canvas');
    let selection;
    let isMulti;
    if (selection = canvas.getActiveGroup()) {
      isMulti = true;
    } else {
      isMulti = false;
      selection = canvas.getActiveObject() || _emptySelection();
    }
    this.set('selection', SelectionProxy.create({ selection, isMulti, changeHandler: () => {
      Ember.run.debounce(this, '_redraw', this.get('redrawDebounce'), false);
    } }));
    canvas.renderAll();
  },
  _redraw() {
    let canvas = this.get('canvas');
    canvas.renderAll();
  },

  _duplicateCanvasObjectsToGroup(canvas, objects) {
    let group = [];
    objects.forEach((object) => {
      let newObj = this._duplicateCanvasObject(canvas, object);
      group.push(newObj);
    });
    return group;
  },

  _duplicateCanvasObject(canvas, object) {
    if (object.get('type') === 'group') {
      let newObjs = this._duplicateCanvasObjectsToGroup(canvas, object.getObjects());
      let group = new window.fabric.Group(newObjs);
      object.stateProperties.forEach((prop) => {
        if (!object.delegatedProperties[prop]) {
          group.set(prop, object.get(prop));
        }
      });
      return group;
    } else {
      let newObj = object.clone();
      return newObj;
    }
  },

  actions: {
    registerCanvas(fabricCanvas) {
      this.set('currentCanvas', fabricCanvas);
      let canvas = fabricCanvas.get('fabricCanvas');
      let updateSelection = () => {
        this.updateSelection();
      };
      canvas
        .on('object:selected', updateSelection)
        .on('group:selected', updateSelection)
        .on('path:created', updateSelection)
        .on('selection:cleared', updateSelection);
      window.cv = fabricCanvas.fabricCanvas;
    },

    setJSON(json) {
      let canvas = this.get('canvas');
      canvas.loadFromJSON(json, () => {
        canvas.renderAll();
      });
    },

    deleteSelection(animate) {
      let canvas = this.get('canvas');
      let objects = this.get('selection.objects');
      canvas.deactivateAll();
      this.updateSelection();
      objects.forEach(function(object) {
        if (animate) {
          let [properties, animation] = animDissolveAway(canvas, object);
          object.animate(properties, animation);
        } else {
          canvas.remove(object);
        }
      });
    },

    makeGroup() {
      let canvas = this.get('canvas');
      let selection = this.get('selection');
      if (selection.get('isSingle')) {
        return;
      }
      let objects = selection.get('objects');
      if (Ember.isEmpty(objects)) {
        return;
      }
      canvas.deactivateAll().renderAll();
      let newObjs = [];
      objects.forEach(function(obj) {
        let newObj = obj.clone();
        canvas.remove(obj);
        newObjs.push(newObj);
      });
      let group = new window.fabric.Group(newObjs);
      canvas.add(group);
      canvas.setActiveObject(group);
      this.updateSelection();
    },

    unMakeGroup() {
      let canvas = this.get('canvas');
      let objects = this.get('selection.objects');
      // must discard selection, or if selection contains groups & non groups, weird things happen
      canvas.deactivateAll().renderAll();
      objects.forEach(function(group) {
        if (group.type === 'group') {
          let items = group.getObjects();
          group._restoreObjectsState();
          canvas.remove(group);
          for (let i = 0; i < items.length; i++) {
            canvas.add(items[i]);
          }
        }
      });
      canvas.renderAll();
    },

    duplicateSelection() {
      let canvas = this.get('canvas');
      let objects = this.get('selection.objects');
      canvas.deactivateAll();
      this.updateSelection();
      let group = this._duplicateCanvasObjectsToGroup(canvas, objects);

      group.forEach((object) => {
        canvas.add(object);
      });

      if (group.length === 1) {
        canvas.setActiveObject(group[0]);
      } else if (group.length > 1) {
        group = new window.fabric.Group(group, {
          canvas
        });
        group.addWithUpdate();
        canvas.setActiveGroup(group);
      }
      canvas.renderAll();
    }
  }
});
