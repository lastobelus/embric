import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember';

import { assertionInjector } from 'dummy/tests/assertions';

moduleForComponent('embric-basic-shapes-widget', 'Integration | Component | embric basic shapes widget', {
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
    }
  });
  return mock.create();
}

test('it renders', function(assert) {
  this.set('mockEditor', mockEditor(assert));
  this.render(hbs`{{embric-basic-shapes-widget editor=mockEditor}}`);

  assert.pageHasText('Add Shape');
});
