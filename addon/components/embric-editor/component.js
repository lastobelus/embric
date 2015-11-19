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
    let selection = canvas.getActiveGroup() || canvas.getActiveObject() || _emptySelection();
    this.set('selection', SelectionProxy.create({ selection, changeHandler: () => {
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
      console.log('deactivateAll');
      canvas.deactivateAll();
      console.log('_updateSelection');
      this._updateSelection();
      console.log('setup animate', animate);
      objects.forEach(function(object) {
        if (animate) {
          let [properties, animation] = animDissolveAway(object);
          console.log('properties: ', properties);
          console.log('animation', animation);
          object.animate(properties, animation);
        } else {
          canvas.remove(object);
        }
      });
    }
  }
});
