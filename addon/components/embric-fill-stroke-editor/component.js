import Ember from 'ember';
import layout from './template';

export default Ember.Component.extend({
  /**
    The name of the widget (rendered as a ```<label>``` in the default template)

    @attribute name
    @default "Fill & Stroke"
    @type String
    @public
  */
  name: 'Fill & Stroke',
  layout,
  classNames: ['embric-control', 'embric-control-fill-stroke']
});
