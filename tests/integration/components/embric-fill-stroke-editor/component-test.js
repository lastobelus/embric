import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

import { assertionInjector } from 'dummy/tests/assertions';

moduleForComponent('embric-fill-stroke-editor', 'Integration | Component | embric fill stroke editor', {
  integration: true,
  beforeEach() {
    assertionInjector(this);
  }
});

test('it renders', function(assert) {
  this.render(hbs`{{embric-fill-stroke-editor}}`);

  assert.pageHasText('Fill & Stroke');
});
