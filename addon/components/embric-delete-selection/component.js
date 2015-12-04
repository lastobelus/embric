import Ember from 'ember';
import layout from './template';

/**
  Widget that provides a button to delete the current selection. Works on single
  or multiple selection, & works when selection includes groups.

  ### Example

  ```htmlbars
  \{{#embric-editor as |editor| }}
    \{{embric-delete-selection  editor=editor animated=true}}
  \{{/embric-editor}}
  ```

  @element embric-delete-selection
  @uses Utils.AnimDissolveAway
  @public
*/
export default Ember.Component.extend({
  layout,
  /**
    The name of the widget (rendered as a ```<label>``` in the default template)

    @attribute name
    @default "Delete Selection"
    @type String
    @public
  */
  name: 'Delete Selection',
  /**
    Whether the deletion is animated. The default animation is a dissolve/scale.

    @attribute animate
    @default false
    @type boolean
    @public
  */
  animate: true,
  classNames: ['embric-control', 'embric-control-delete-selection']
});
