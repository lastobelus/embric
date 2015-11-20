import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember';
import  ZindexSupport from 'embric/mixins/zindex-support';

import { assertionInjector } from 'dummy/tests/assertions';

moduleForComponent('embric-zindex-editor', 'Integration | Component | embric zindex editor', {
  integration: true,
  beforeEach() {
    assertionInjector(this);
  }
});

function mockEditor(assert) {
  let mock = Ember.Component.extend(ZindexSupport, {
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
  this.render(hbs`{{embric-zindex-editor editor=mockEditor}}`);

  assert.pageHasText('Arrange Objects');
});
