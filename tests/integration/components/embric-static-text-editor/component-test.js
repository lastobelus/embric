import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember';

import { assertionInjector } from 'dummy/tests/assertions';

moduleForComponent('embric-static-text-editor', 'Integration | Component | embric static text editor', {
  integration: true,
  beforeEach() {
    assertionInjector(this);
  }
});

function mockEditor(assert) {
  let mock = Ember.Component.extend({
    selection: Ember.Object.create({
      fill: '#111111',
      stroke: '#222222',
      strokeWidth: 1.5,
      'strokeWidth-asFloat': 1.5
    }),
    actions: {
      addStaticText() {
        assert.ok(true, 'addStaticText action should be called');
      }
    }
  });
  return mock.create();
}

test('it renders', function(assert) {
  this.set('mockEditor', mockEditor(assert));
  this.render(hbs`{{embric-static-text-editor editor=mockEditor}}`);

  assert.pageHasText('Basic Text');
});
