import Ember from 'ember';
import layout from './template';

/**
  Widget that provides `Group` and `Ungroup` buttons for making/un-making groups
  of the current selection.

  ### Example

  ```htmlbars
  \{{#embric-editor as |editor| }}
      \{{embric-group-editor editor=editor}}
  \{{/embric-editor}}
  ```

  @element embric-group-editor
  @uses
  @public
*/
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
