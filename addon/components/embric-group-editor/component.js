import Ember from 'ember';
import layout from './template';

export default Ember.Component.extend({
  layout,
  name: 'Group Editor',
  classNames: ['embric-control', 'embric-control-group-editor']
});
