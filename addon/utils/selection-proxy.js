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
  selectionType: Ember.computed('selection', {
    get() {
      let selection = this.get('selection');
      if (Ember.isEmpty(selection)) {
        return 'empty';
      }
      return Ember.get(selection, 'type');
    }
  }),

  isGroup: Ember.computed.equal('selectionType', 'group'),

  unknownProperty(key) {
    if (this.get('isGroup')) {
      let objects = this.get('objects');
      let values = objects.mapBy(key);
      let uniqueValues = Ember.A(values).uniq();
      if (uniqueValues.length === 1) {
        return uniqueValues[0] || '';
      } else {
        return '';
      }
    } else {
      let selection = this.get('selection');
      return Ember.get(selection, key);
    }
  },
  setUnknownProperty(keyWithParser, value) {
    let selection = this.get('selection');
    if (Ember.isEmpty(selection)) {
      return '';
    }
    let objects = this.get('objects');
    let [key, parsedValue] = this.parsedValueForKey(keyWithParser, value);
    objects.forEach(function(obj) {
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
  objects: Ember.computed('selection', {
    get() {
      let selection = this.get('selection');
      let isGroup = this.get('isGroup');
      let objects = isGroup ? selection.getObjects() : [selection];
      return Ember.A(objects);
    }
  })
});