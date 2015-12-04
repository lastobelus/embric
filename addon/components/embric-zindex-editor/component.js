import Ember from 'ember';
import layout from './template';

/**
  Widget that displays 4 buttons for manipulating the z-index of selected items:
  * `Bring To Front`
  * `Bring Forward`
  * `Send To Back`
  * `Send Backward`


  ### Example
  ```htmlbars
  \{{#embric-editor as |editor| }}
    \{{embric-zindex-editor editor=editor}}
  \{{/embric-editor}}
  ```

  @element embric-zindex-editor
  @uses Mixins.ZindexSupport
  @public
*/
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
