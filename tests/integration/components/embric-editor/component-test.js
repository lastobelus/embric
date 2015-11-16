import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

import { assertionInjector } from 'dummy/tests/assertions';

moduleForComponent('embric-editor', 'Integration | Component | embric editor', {
  integration: true,
  beforeEach() {
    assertionInjector(this);
  }
});

test('it renders', function(assert) {
  assert.expect(3);
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });"

  this.render(hbs`{{embric-editor}}`);

  assert.pageHasElement('.embric-editor', 'should render');

  this.render(hbs`
    {{#embric-editor checkAttr="visibleInBlock" as |editor|}}
      {{editor.checkAttr}}
    {{/embric-editor}}
  `);

  assert.pageHasElement('.embric-editor', 'should render');
  assert.pageHasText('visibleInBlock', 'it should yield itself to block');
});
