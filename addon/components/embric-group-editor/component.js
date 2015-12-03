import Ember from 'ember';
import layout from './template';

export default Ember.Component.extend({
  layout,
  /**
    The name of the widget (rendered as a ```<label>``` in the default template)

    @attribute name
    @default "Group Editor"
    @type String
    @public
  */
  name: 'Group Editor',
  classNames: ['embric-control', 'embric-control-group-editor']
});
