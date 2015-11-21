import Ember from 'ember';
import layout from './template';

export default Ember.Component.extend({
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
