import Ember from 'ember';
import layout from './template';
import  TextSupport from 'embric/mixins/text-support';

/**
  Widget that provides a `textarea` for entering/editing text, and a `select`
  for choosing a font.

  It expects fonts to be bound to `fontList` in the following form:

  ```javascript
  Ember.A([
    { cssName: 'Arial Black', displayName: 'Arial Black' },
    { cssName: 'Helvetica', displayName: 'Helvetica' }
  ])
  ```

  @element embric-static-text-editor
  @uses ShapesSupport
  @public
*/

export default Ember.Component.extend(TextSupport, {
  layout,
  /**
    The name of the widget (rendered as a ```<label>``` in the default template)

    @attribute name
    @default "Basic Text"
    @type String
    @public
  */
  name: 'Basic Text',
  text: '',
  /**
    The list of available fonts.

    @attribute fontList
    @public
  */
  fontList: Ember.A([
    { cssName: 'Arial Black', displayName: 'Arial Black' },
    { cssName: 'Helvetica', displayName: 'Helvetica' },
    { cssName: 'Lucida Sans Unicode', displayName: 'Lucida Sans' },
    { cssName: 'Tahoma', displayName: 'Tahoma' },
    { cssName: 'Trebuchet', displayName: 'Trebuchet' },
    { cssName: 'Verdana', displayName: 'Verdana' },
    { cssName: 'Georgia', displayName: 'Georgia' },
    { cssName: 'Palatino Linotype', displayName: 'Palatino Linotype' },
    { cssName: 'Times New Roman', displayName: 'Times New Roman' },
    { cssName: 'Courier New', displayName: 'Courier' },
    { cssName: 'Lucida Console', displayName: 'Lucida Console' }
  ]),
  classNames: ['embric-control', 'embric-static-text-editor']
});
