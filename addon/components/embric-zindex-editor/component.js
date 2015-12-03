import Ember from 'ember';
import layout from './template';

export default Ember.Component.extend({
  layout,
  /**
    The name of the widget (rendered as a ```<label>``` in the default template)

    @attribute name
    @default "Arrange Objects"
    @type String
    @public
  */
  name: 'Arrange Objects',
  classNames: ['embric-control', 'embric-zindex-editor']
});
