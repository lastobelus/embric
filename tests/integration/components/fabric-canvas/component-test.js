import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

import { assertionInjector } from 'dummy/tests/assertions';

moduleForComponent('fabric-canvas', 'Integration | Component | fabric canvas', {
  integration: true,
  beforeEach() {
    assertionInjector(this);
  }
});

test('it renders', function(assert) {
  assert.expect(2);

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{fabric-canvas}}`);

  assert.pageHasElement('canvas.lower-canvas');
  assert.pageHasElement('canvas.upper-canvas');

});
