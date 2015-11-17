import Ember from 'ember';
import layout from './template';

export default Ember.Component.extend({
  name: 'Fill & Stroke',
  layout,
  classNames: ['embric-control', 'embric-control-fill-stroke'],
  fill: Ember.computed('editor.selection', {
    get() {
      return this.get('editor').getActiveProperty('fill');
    }
  }),
  stroke: Ember.computed('editor.selection', {
    get() {
      return this.get('editor').getActiveProperty('stroke');
    }
  }),
  strokeWidth: Ember.computed('editor.selection', {
    get() {
      return this.get('editor').getActiveProperty('strokeWidth');
    }
  })
});
