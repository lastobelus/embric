import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember';

import { assertionInjector } from 'dummy/tests/assertions';

moduleForComponent('embric-duplicate-selection', 'Integration | Component | embric duplicate selection', {
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
      duplicateSelection() {
        assert.ok(true, 'duplicateSelection action should be called');
      }
    }
  });
  return mock.create();
}

test('it renders', function(assert) {
  this.set('mockEditor', mockEditor(assert));
  this.render(hbs`{{embric-duplicate-selection editor=mockEditor}}`);

  assert.pageHasText('Duplicate Selection');
});
