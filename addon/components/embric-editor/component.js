import Ember from 'ember';
import layout from './template';

export default Ember.Component.extend({
  layout,
  currentCanvas: null,
  classNames: ['embric-editor'],
  currentCanvasJSON() {
    let canvas = this.get('currentCanvas.fabricCanvas');
    let json = JSON.stringify(canvas);
    return json;
  },

  getActiveProperty(name) {
    let selection = this.get('selection');
    if (!selection) {
      return '';
    }
    let selectionType = selection.get('type');
    if (selectionType === 'group') {
      let values = Ember.A(selection.objects).mapBy(name);
      let uniqueValues = Ember.A(values).uniq();
      if (uniqueValues.length === 1) {
        return uniqueValues[0];
      } else {
        return '';
      }
    } else {
      return selection[name] || '';
    }
  },
  selection: null,

  _updateSelection() {
    let canvas = this.get('currentCanvas.fabricCanvas');
    let selection = canvas.getActiveGroup() || canvas.getActiveObject();
    this.set('selection', selection);
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

    setActiveProperty(name, value) {
      let selection = this.get('selection');
      if (!selection) {
        return '';
      }
      let selectionType = selection.get('type');
      if (selectionType === 'group') {
        for (let object of selection.objects) {
          object.set(name, value).setCoords();
        }
      } else {
        selection.set(name, value).setCoords();
      }

      let canvas = this.get('currentCanvas.fabricCanvas');
      canvas.renderAll();
    }

  }
});
