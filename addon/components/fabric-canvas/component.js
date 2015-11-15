import Ember from 'ember';
import layout from './template';

var computed = Ember.computed;

export default Ember.Component.extend({
  tagName: "canvas",
  attributeBindings: [ 'height', 'width' ],
  height: Ember.computed.oneWay('defaultHeight'),
  width: Ember.computed.oneWay('defaultWidth'),
  defaultHeight: "500",
  defaultWidth: "700",
  
  didInsertElement() {
    let canvas = new fabric.Canvas(this.get('elementId'));
    this.set('fabricCanvas', canvas);
  }
});
