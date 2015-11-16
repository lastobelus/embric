import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember';

import { assertionInjector } from 'dummy/tests/assertions';

moduleForComponent('/embric-json-loader', 'Integration | Component | embric json loader', {
  integration: true,
  beforeEach() {
    assertionInjector(this);
  }
});

let MockEditor = Ember.Component.extend({
  currentCanvasJSON() {
    return 'mock json';
  },
  actions: {
    setJSON(json) {
      this.set('json', json);
    }
  }
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });" + EOL + EOL +

  this.render(hbs`{{embric-json-loader}}`);

  assert.pageHasText('JSON Loader');

});

test('it sets label for correctly', function(assert) {
  this.render(hbs`{{embric-json-loader id="my-loader"}}`);

  assert.pageHasElement('textarea#my-loader-textarea');
  assert.pageHasElement('label[for=my-loader-textarea]');

});

test('it gets json', function(assert) {
  this.set('mockEditor', MockEditor.create());

  this.render(hbs`{{embric-json-loader editor=mockEditor id="my-loader"}}`);
  this.$('#my-loader button.get-json-button').click();
  assert.equal(this.$('#my-loader-textarea').val(), 'mock json', 'clicking get button should put editor.currentCanvasJSON in the textarea');
});

test('it sets json', function(assert) {
  this.set('mockEditor', MockEditor.create());

  this.render(hbs`{{embric-json-loader editor=mockEditor id="my-loader"}}`);
  this.$('#my-loader-textarea').text('bobs cool json').change();
  assert.equal(this.$('#my-loader-textarea').val(), 'bobs cool json');
  this.$('#my-loader button.set-json-button').click();
  assert.equal(this.get('mockEditor.json'), 'bobs cool json', 'clicking set button should put json in the textarea in editor.json');
});
