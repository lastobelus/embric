import Ember from 'ember';
import layout from './template';

export default Ember.Component.extend({
  layout,
  name: 'JSON Loader',
  classNames: ['embric-control', 'embric-control-json-loader'],
  actions: {
    getJSON() {
      let json = this.get('editor').currentCanvasJSON();
      this.set('json', json);
    }
  }
});
