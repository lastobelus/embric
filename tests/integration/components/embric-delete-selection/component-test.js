import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

import { assertionInjector } from 'dummy/tests/assertions';

moduleForComponent('/embric-delete-selection', 'Integration | Component | embric delete selection', {
  integration: true,
  beforeEach() {
    assertionInjector(this);
  }
});

let MockEditor = Ember.Component.extend({
  selection: Ember.Object.create({
    fill: '#111111',
    stroke: '#222222',
    strokeWidth: 1.5,
    'strokeWidth-asFloat': 1.5
  })
});
test('it renders', function(assert) {
  this.set('mockEditor', MockEditor.create());
  this.render(hbs`{{embric-delete-selection editor=mockEditor}}`);

  assert.pageHasText('Delete Selection');
});
