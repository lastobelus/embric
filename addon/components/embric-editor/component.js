import Ember from 'ember';
import layout from './template';

export default Ember.Component.extend({
  layout: layout,
  currentCanvas: null,
  classNames: ["embric-editor"],
  actions: {
    registerCanvas(fabricCanvas) {
      this.set('currentCanvas', fabricCanvas);
    }
  }
});
