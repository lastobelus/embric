import Ember from 'ember';
import layout from './template';

export default Ember.Component.extend({
  layout,
  name: 'Basic Text',
  animate: true,
  text: '',
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
