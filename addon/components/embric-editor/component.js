import Ember from 'ember';
import layout from './template';

let   FabricPropertyParsers = {
  asInt: (x) => {
    return parseInt(x, 10);
  },
  asFloat: (x) => {
    return parseFloat(x, 10);
  }
};

let Selection = Ember.Object.extend({
  selection: null,
  changeHandler: null,
  unknownProperty(key) {
    let selection = this.get('selection');
    if (Ember.isEmpty(selection)) {
      return '';
    }
    let selectionType = selection.get('type');
    if (selectionType === 'group') {
      let values = Ember.A(selection.objects).mapBy(key);
      let uniqueValues = Ember.A(values).uniq();
      if (uniqueValues.length === 1) {
        return uniqueValues[0] || '';
      } else {
        return '';
      }
    } else {
      return Ember.get(selection, key);
    }
  },

  setUnknownProperty(keyWithParser, value) {
    let selection = this.get('selection');
    if (Ember.isEmpty(selection)) {
      return '';
    }
    let selectionType = selection.get('type');
    let objects = (selectionType === 'group') ? selection.objects : [selection];
    let [key, parsedValue] = this.parsedValueForKey(keyWithParser, value);
    Ember.A(objects).forEach(function(obj) {
      Ember.set(obj, key, parsedValue);
    });
    let changeHandler = this.get('changeHandler');
    if (changeHandler) {
      changeHandler();
    }
    return parsedValue;
  },

  parsedValueForKey(key, value) {
    let keyParts = key.split('-');
    console.log('keyParts: ', keyParts);
    if (keyParts.length < 2) {
      return [key, value];
    }
    let parser = FabricPropertyParsers[keyParts[keyParts.length - 1]];
    if (parser) {
      keyParts.pop();
      console.log('now keyParts: ', keyParts);
      return [keyParts.join('.'), parser(value)];
    } else {
      return [key, value];
    }
  }
});

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
    this.set('selection', Selection.create({selection, changeHandler: () =>{
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
