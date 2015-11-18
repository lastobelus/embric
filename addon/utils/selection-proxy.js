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
  unknownProperty(key) {
    let selection = this.get('selection');
    if (Ember.isEmpty(selection)) {
      return '';
    }
    let selectionType = Ember.get(selection, 'type');
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
    let selectionType = Ember.get(selection, 'type');
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
  }
});