import { asInt } from '../../../helpers/as-int';
import { module, test } from 'qunit';

module('Unit | Helper | as int');

// Replace this with your real tests.
test('it works', function(assert) {
  let result = asInt('42.8');
  assert.equal(result, 42);
});
