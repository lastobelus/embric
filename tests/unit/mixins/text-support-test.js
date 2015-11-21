import Ember from 'ember';
import TextSupportMixin from 'embric/mixins/text-support';
import { module, test } from 'qunit';

module('Unit | Mixin | text support');

// Replace this with your real tests.
test('it instantiates', function(assert) {
  let TextSupportObject = Ember.Object.extend(TextSupportMixin);
  let subject = TextSupportObject.create();
  assert.ok(subject);
});
