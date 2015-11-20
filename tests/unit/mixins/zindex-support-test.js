import Ember from 'ember';
import  ZindexSupport from 'embric/mixins/zindex-support';
import { module, test } from 'qunit';

module('Unit | Mixin | zindex support');

// Replace this with your real tests.
test('it works', function(assert) {
  let ZindexSupportObject = Ember.Object.extend(ZindexSupport);
  let subject = ZindexSupportObject.create();
  assert.ok(subject);
});
