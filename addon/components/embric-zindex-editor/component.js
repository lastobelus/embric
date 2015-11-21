import Ember from 'ember';
import layout from './template';

export default Ember.Component.extend({
  layout,
  name: 'Arrange Objects',
  animate: true,
  classNames: ['embric-control', 'embric-zindex-editor']
});
