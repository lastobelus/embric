import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember';

import { assertionInjector } from 'dummy/tests/assertions';

moduleForComponent('embric-fill-stroke-editor', 'Integration | Component | embric fill stroke editor', {
  integration: true,
  beforeEach() {
    assertionInjector(this);
  }
});

let MockEditor = Ember.Component.extend({
  didSetProperty: null,
  didGetProperty: null,
  getActiveProperty(name) {
    this.set('didGetProperty', name);
    return '#335588';
  },
  actions: {
    setActiveProperty(name, value) {
      this.set('didSetProperty', { name, value });
    }
  }
});

test('it renders', function(assert) {
  this.set('mockEditor', MockEditor.create());
  this.render(hbs`{{embric-fill-stroke-editor editor=mockEditor}}`);

  assert.pageHasText('Fill & Stroke');
});

test('it gets fill property from selection', function(assert) {
  this.set('mockEditor', MockEditor.create());
  this.render(hbs`{{embric-fill-stroke-editor editor=mockEditor id="fill-editor"}}`);

  assert.equal(this.$().find('#fill-editor-fill-color').val(), '#335588');
  assert.equal(this.get('mockEditor.didGetProperty'), 'fill');
});