import Ember from 'ember';
import layout from './template';

export default Ember.Component.extend({
  layout,
  /**
    The name of the widget (rendered as a ```<label>``` in the default template)

    @attribute name
    @default "Duplicate Selection"
    @type String
    @public
  */
  name: 'Duplicate Selection',
  /**
    Whether the new object(s) is animated on to the screen.

    @attribute animate
    @default false
    @type boolean
    @public
  */
  animate: false,
  classNames: ['embric-control', 'embric-control-delete-selection']
});
