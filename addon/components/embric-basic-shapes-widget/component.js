import Ember from 'ember';
import layout from './template';
import  ShapesSupport from 'embric/mixins/shapes-support';

/**
  Widget that provides a `select` with a list of shapes. When the user clicks
  `Add`, the shape is added to the canvas.

  ### Follows Selection
  If there is an active selection, the shape will be drawn with attributes
  taken from it, and positioned on top of it. Otherwise the shape will be
  drawn in the center of the canvas with defaults of fill:black & sized to
  fit in a 50px square bounds.

  @element embric-basic-shapes-widget
  @uses ShapesSupport
*/

export default Ember.Component.extend(ShapesSupport, {
  layout,
  name: 'Add Shape',
  animate: true,
  selectedShape: Ember.computed.oneWay('shapesList.firstObject.fabricName'),
  shapesList: Ember.A([
    { fabricName: 'rect', displayName: 'Square' },
    { fabricName: 'circle', displayName: 'Circle' },
    { fabricName: 'triangle', displayName: 'Triangle' }
  ]),
  classNames: ['embric-control', 'embric-control-basic-shapes-widget']
});
