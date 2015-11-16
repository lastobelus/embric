import { moduleForComponent, test } from 'ember-qunit';
import Ember from 'ember';
import hbs from 'htmlbars-inline-precompile';

import { assertionInjector } from 'dummy/tests/assertions';

moduleForComponent('fabric-canvas', 'Integration | Component | fabric canvas', {
  integration: true,
  beforeEach() {
    assertionInjector(this);
  }
});

let MockEditor = Ember.Component.extend({
  registered: null,
  actions: {
    registerCanvas(fabricCanvas) {
      this.set('registered', fabricCanvas);
    }
  }
});

test('it renders', function(assert) {
  assert.expect(2);

  this.set('mockEditor', MockEditor.create());

  this.render(hbs`{{fabric-canvas editor=mockEditor}}`);

  assert.pageHasElement('canvas.lower-canvas');
  assert.pageHasElement('canvas.upper-canvas');
});

test('it registers itself with bound editor', function(assert) {
  assert.expect(4);

  this.set('mockEditor', MockEditor.create());

  this.render(hbs`{{fabric-canvas editor=mockEditor}}`);

  assert.pageHasElement('canvas.lower-canvas');
  assert.pageHasElement('canvas.upper-canvas');
  assert.ok(!!this.get('mockEditor.registered'), 'it should register itself with bound editor');
  assert.ok(this.get('mockEditor.registered.fabricCanvas') instanceof window.fabric.Canvas, 'the fabric canvas should be available to the editor');
});
