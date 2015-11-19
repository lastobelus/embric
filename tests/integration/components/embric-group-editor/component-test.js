import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember';

import { assertionInjector } from 'dummy/tests/assertions';

moduleForComponent('embric-group-editor', 'Integration | Component | embric group editor', {
  integration: true,
  beforeEach() {
    assertionInjector(this);
  }
});

function mockEditor() {
  let mock = Ember.Component.extend({
    selection: Ember.Object.create({
      fill: '#111111',
      stroke: '#222222',
      strokeWidth: 1.5,
      'strokeWidth-asFloat': 1.5,
      didGroup: false,
      didUngroup: false
    }),
    actions: {
      makeGroup() {
        this.set('didGroup', true);
      },
      unMakeGroup() {
        this.set('didUngroup', true);
      }
    }
  });
  return mock.create();
}

test('it renders', function(assert) {
  this.set('mockEditor', mockEditor(assert));
  this.render(hbs`{{embric-group-editor editor=mockEditor}}`);

  assert.pageHasText('Group Editor');
});
