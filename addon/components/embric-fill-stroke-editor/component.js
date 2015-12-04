import Ember from 'ember';
import layout from './template';

/**
  Widget that provides color-pickers for the fill and stroke colors of the current selection;
  and a number field for the stroke width.

  In the default template the color-pickers are implemented simply by providing `type="color"`
  to the underlying `input`.

  ### Example

  ```htmlbars
  \{{#embric-editor as |editor| }}
    \{{embric-fill-stroke-editor editor=editor }}
  \{{/embric-editor}}
  ```

  @element embric-fill-stroke-editor
  @public
*/
export default Ember.Component.extend({
  /**
    The name of the widget (rendered as a `<label>` in the default template)

    @attribute name
    @default "Fill & Stroke"
    @type String
    @public
  */
  name: 'Fill & Stroke',
  layout,
  classNames: ['embric-control', 'embric-control-fill-stroke']
});
