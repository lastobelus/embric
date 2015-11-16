import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'canvas',
  classNameBindings: 'cssClass::fabric-canvas-container',
  fabricCanvas: null,
  attributeBindings: [ 'height', 'width' ],
  height: Ember.computed.oneWay('defaultHeight'),
  width: Ember.computed.oneWay('defaultWidth'),
  defaultHeight: 500,
  defaultWidth: 700,

  _setup: Ember.on('didInsertElement', function() {
    Ember.run.scheduleOnce('afterRender', () => {
      this._setupFabric();
    });
  }),

  _setupFabric() {
    if (Ember.isEmpty(this.get('fabricCanvas'))) {
      let canvas = new window.fabric.Canvas(this.get('elementId'));
      canvas.renderOnAddRemove = false;
      this.set('fabricCanvas', canvas);
    }
    this.get('editor').send('registerCanvas', this);
  }
});
