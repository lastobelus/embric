import Ember from 'ember';
import layout from './template';

export default Ember.Component.extend({
  layout,
  name: 'Delete Selection',
  animate: true,
  classNames: ['embric-control', 'embric-control-delete-selection']
});
