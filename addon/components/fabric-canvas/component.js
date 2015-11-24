import Ember from 'ember';

/**
  Creates a Fabric canvas element and registers it

 Use as a block level component with any number of {{#crossLink "Components.EmbricEditor"}}{{/crossLink}} components as children:

  ### Example

  ```htmlbars
  \{{#embric-editor as |editor| }}
      \{{fabric-canvas width=800 height=300 editor=editor}}
  \{{/embric-editor}}
</div>
  ```
  @class FabricCanvas
  @namespace Components
  @extends Ember.Component
  @public

*/
export default Ember.Component.extend({
  tagName: 'canvas',
  classNameBindings: 'cssClass::fabric-canvas-container',
  fabricCanvas: null,
  /**
    Because of the way Fabric works, the `height` and `width`
    of the canvas must be set as `HTML` attributes. `CSS`-defined
    `height` and `width` will be ignored.

    @property attributeBindings
    @type Array
    @public
  */
  attributeBindings: [ 'height', 'width' ],
  /**
    The `HTML` `height` of the fabric canvas.

    @property height
    @type Integer
    @public
  */
  height: Ember.computed.oneWay('defaultHeight'),
  /**
    The `HTML` `height` of the fabric canvas.

    @property width
    @type Integer
    @public
  */
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
    let editor = this.get('editor');
    editor.send('registerCanvas', this);
  }
});
