import Ember from 'ember';
import ShapesSupportMixin from 'embric/mixins/shapes-support';
import { module, test } from 'qunit';

module('Unit | Mixin | shapes support');

// Replace this with your real tests.
test('it instantiates', function(assert) {
  let ShapesSupportObject = Ember.Object.extend(ShapesSupportMixin);
  let subject = ShapesSupportObject.create();
  assert.ok(subject);
});
