import Ember from 'ember';

let FabricPropertyParsers = {
  asInt: (x) => {
    return parseInt(x, 10);
  },
  asFloat: (x) => {
    return parseFloat(x, 10);
  }
};

export default Ember.Object.extend({
  selection: null,
  changeHandler: null,
  isMulti: false,
  selectionType: Ember.computed('isMulti', 'selection', {
    get() {
      if (this.get('isMulti')) {
        return 'multi';
      }
      let selection = this.get('selection');
      if (Ember.isEmpty(selection)) {
        return 'empty';
      }
      return Ember.get(selection, 'type');
    }
  }),
  isGroup: Ember.computed.equal('selectionType', 'group'),
  isEmpty: Ember.computed.equal('selectionType', 'empty'),

  unknownProperty(key) {
    let selection = this.get('selection');
    return this._uniqueProperty(selection, key);
  },
  _uniqueProperty(obj, key){
    if (Ember.get(obj, 'type') === 'group') {
      let objects = obj.getObjects();
      let unique = Ember.get(objects[0], key);
      if(unique) {
        for (var i = objects.length - 1; i > 0; i--) {
          if (unique !== this._uniqueProperty(objects[i], key)) {
            return '';
          }
          return unique;
        }
      } else {
        return '';
      }
    } else {
      return Ember.get(obj, key);
    }
  },
  setUnknownProperty(keyWithParser, value) {
    let selection = this.get('selection');
    if (this.get('isEmpty')) {
      return '';
    }
    let [key, parsedValue] = this.parsedValueForKey(keyWithParser, value);
    this._recursiveSetProperty(selection, key, parsedValue);

    let changeHandler = this.get('changeHandler');
    if (changeHandler) {
      changeHandler();
    }
    this.notifyPropertyChange(key);
    return parsedValue;
  },
  _recursiveSetProperty(obj, key, value) {
    if (Ember.get(obj, 'type') === 'group') {
      let objects = obj.getObjects();
      objects.forEach((child) => {
        this._recursiveSetProperty(child, key, value);
      });
    } else {
      Ember.set(obj, key, value);
    }
  },
  parsedValueForKey(key, value) {
    let keyParts = key.split('-');
    if (keyParts.length < 2) {
      return [key, value];
    }
    let parser = FabricPropertyParsers[keyParts[keyParts.length - 1]];
    if (parser) {
      keyParts.pop();
      return [keyParts.join('.'), parser(value)];
    } else {
      return [key, value];
    }
  },
  objects: Ember.computed('selection', 'isEmpty', 'selectionType', {
    get() {
      if (this.get('isEmpty')) {
        return [];
      }
      let selection = this.get('selection');
      let isGroup = this.get('isGroup') || this.get('isMulti');
      let objects = isGroup ? selection.getObjects() : [selection];
      return Ember.A(objects);
    }
  }).volatile()
});