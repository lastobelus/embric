import Ember from 'ember';
import layout from './template';
import  ShapesSupport from 'embric/mixins/shapes-support';

/**
  Widget that provides a `select` with a list of shapes. When the user clicks
  `Add`, the shape is added to the canvas.

  #### Follows Selection
  If there is an active selection, the shape will be drawn with attributes
  taken from it, and positioned on top of it. Otherwise the shape will be
  drawn in the center of the canvas with defaults of fill:black & sized to
  fit in a 50px square bounds.

  ### Example

  ```htmlbars
  \{{#embric-editor as |editor| }}
      \{{embric-basic-shapes-widget editor=editor animated=false }}
  \{{/embric-editor}}
  ```

  @element embric-basic-shapes-widget
  @uses ShapesSupport
  @public
*/

export default Ember.Component.extend(ShapesSupport, {
  layout,
  /**
    The name of the widget (rendered as a `<label>` in the default template)

    @attribute name
    @default "Add Shape"
    @type String
    @public
  */
  name: 'Add Shape',
  /**
    Whether the shape is animated on to the screen.

    @attribute animate
    @default false
    @type boolean
    @public
  */
  animate: false,
  selectedShape: Ember.computed.oneWay('shapesList.firstObject.fabricName'),
  /**
    List of available shapes to be drawn. This needs to be in the form of an
    array of objects with two properties: `fabricName`, and `displayName`:

    ```javascript
    Ember.A([
      { fabricName: 'rect', displayName: 'Square' },
      { fabricName: 'circle', displayName: 'Circle' },
      { fabricName: 'triangle', displayName: 'Triangle' }
    ]
    ```

    @attribute shapesList
    @default  [{ fabricName: 'rect', displayName: 'Square' }, { fabricName: 'circle', displayName: 'Circle' }, { fabricName: 'triangle', displayName: 'Triangle' }]
    @type boolean
    @public
  */
  shapesList: Ember.A([
    { fabricName: 'rect', displayName: 'Square' },
    { fabricName: 'circle', displayName: 'Circle' },
    { fabricName: 'triangle', displayName: 'Triangle' }
  ]),
  classNames: ['embric-control', 'embric-control-basic-shapes-widget']
});
