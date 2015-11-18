import Ember from 'ember';
import layout from './template';
import SelectionProxy from 'embric/utils/selection-proxy';

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

  selection: null,
  _updateSelection() {
    let canvas = this.get('currentCanvas.fabricCanvas');
    let selection = canvas.getActiveGroup() || canvas.getActiveObject();
    this.set('selection', SelectionProxy.create({selection, changeHandler: () =>{
      Ember.run.debounce(this, '_redraw', this.get('redrawDebounce'), false);
    }}));
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
    }
  }
});
