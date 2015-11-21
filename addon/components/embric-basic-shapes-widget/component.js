import Ember from 'ember';
import layout from './template';
import  ShapesSupport from 'embric/mixins/shapes-support';

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
