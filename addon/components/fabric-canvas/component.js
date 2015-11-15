import Ember from 'ember';

export default Ember.Component.extend({
  tagName: "canvas",
  attributeBindings: [ 'height', 'width' ],
  height: Ember.computed.oneWay('defaultHeight'),
  width: Ember.computed.oneWay('defaultWidth'),
  defaultHeight: "500",
  defaultWidth: "700",
  
  didInsertElement() {
    let canvas = new window.fabric.Canvas(this.get('elementId'));
    this.set('fabricCanvas', canvas);
  }
});
