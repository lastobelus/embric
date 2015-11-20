import Ember from 'ember';
import ZindexSupportMixin from '../../../mixins/zindex-support';
import { module, test } from 'qunit';

module('Unit | Mixin | zindex support');

// Replace this with your real tests.
test('it works', function(assert) {
  let ZindexSupportObject = Ember.Object.extend(ZindexSupportMixin);
  let subject = ZindexSupportObject.create();
  assert.ok(subject);
});
