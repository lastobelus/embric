import Ember from 'ember';
import layout from './template';

export default Ember.Component.extend({
  layout,
  currentCanvas: null,
  classNames: ['embric-editor'],
  currentCanvasJSON() {
    let canvas = this.get('currentCanvas.fabricCanvas');
    let json = JSON.stringify(canvas);
    console.log("got json: ",json);
    return json;
  },
  actions: {
    registerCanvas(fabricCanvas) {
      this.set('currentCanvas', fabricCanvas);
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
