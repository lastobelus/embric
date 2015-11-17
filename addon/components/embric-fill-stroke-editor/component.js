import Ember from 'ember';
import layout from './template';

export default Ember.Component.extend({
  layout,
  classNames: ['embric-control', 'embric-control-fill-stroke'],
  fill: Ember.computed('editor.selection', {
    get() {
      return this.get('editor').getActiveProperty('fill');
    }
  }),
  name: 'Fill & Stroke'
});
