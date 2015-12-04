import Ember from 'ember';
import layout from './template';

/**
  Widget that provides the ability to manually deserialize the current canvas to
  JSON, or to load fabric JSON to the current canvas.

  ### Example

  ```htmlbars
  \{{#embric-editor as |editor| }}
    \{{embric-json-loader editor=editor  }}
  \{{/embric-editor}}
  ```

  @element embric-json-loader
  @public
*/
export default Ember.Component.extend({
  layout,
  /**
    The name of the widget (rendered as a ```<label>``` in the default template)

    @attribute name
    @default "JSON Loader"
    @type String
    @public
  */
  name: 'JSON Loader',
  classNames: ['embric-control', 'embric-control-json-loader'],
  actions: {
    getJSON() {
      let json = this.get('editor').currentCanvasJSON();
      this.set('json', json);
    }
  }
});
