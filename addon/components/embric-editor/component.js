import Ember from 'ember';
import layout from './template';
import SelectionProxy from 'embric/utils/selection-proxy';
import  animDissolveAway from 'embric/utils/anim-dissolve-away';

function _emptySelection() {
  return Ember.Object.create({
    type: 'empty'
  });
}

export default Ember.Component.extend({
  layout,
  currentCanvas: null,
  classNames: ['embric-editor'],
  currentCanvasJSON() {
    let canvas = this.get('currentCanvas.fabricCanvas');
    let json = JSON.stringify(canvas);
    return json;
  },
  redrawDebounce: 100,

  selection: SelectionProxy.create({ selection: _emptySelection() }),

  _updateSelection() {
    let canvas = this.get('currentCanvas.fabricCanvas');
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
    let canvas = this.get('currentCanvas.fabricCanvas');
    canvas.renderAll();
  },

  actions: {
    registerCanvas(fabricCanvas) {
      this.set('currentCanvas', fabricCanvas);
      let canvas = fabricCanvas.get('fabricCanvas');
      let updateSelection = () => {
        this._updateSelection();
      };
      canvas
        .on('object:selected', updateSelection)
        .on('group:selected', updateSelection)
        .on('path:created', updateSelection)
        .on('selection:cleared', updateSelection);
      window.cv = fabricCanvas.fabricCanvas;
    },
    setJSON(json) {
      let canvas = this.get('currentCanvas.fabricCanvas');
      canvas.loadFromJSON(json, () => {
        canvas.renderAll();
      });
    },
    deleteSelection(animate) {
      let canvas = this.get('currentCanvas.fabricCanvas');
      let objects = this.get('selection.objects');
      canvas.deactivateAll();
      this._updateSelection();
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
      let canvas = this.get('currentCanvas.fabricCanvas');
      let objects = this.get('selection.objects');
      if (Ember.isEmpty(objects)) {
        return;
      }
      canvas.deactivateAll().renderAll();
      var newObjs = [];
      objects.forEach(function(obj) {
        var newObj = obj.clone();
        canvas.remove(obj);
        newObjs.push(newObj);
      });
      var group = new window.fabric.Group(newObjs);
      canvas.add(group);
      canvas.setActiveObject(group);
      this._updateSelection();
    },
    unMakeGroup() {
      let canvas = this.get('currentCanvas.fabricCanvas');
      let objects;
      // this logic is slightly different then the selection.objects accessor
      if (canvas.getActiveGroup()) {
        objects = canvas.getActiveGroup().getObjects();
      } else if (canvas.getActiveObject()) {
        objects = [canvas.getActiveObject()];
      }
      // must discard selection, or if selection contains groups & non groups, weird things happen
      canvas.deactivateAll().renderAll();
      objects.forEach(function(group) {
        if (group.type === 'group') {
          var items = group.getObjects();
          group._restoreObjectsState();
          canvas.remove(group);
          for(var i = 0; i < items.length; i++) {
            canvas.add(items[i]);
          }
        }
      });
      canvas.renderAll();
    }
  }
});
