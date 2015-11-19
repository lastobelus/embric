import animDissolveAway from 'embric/utils/anim-dissolve-away';
import { module, test } from 'qunit';

module('Unit | Utility | anim dissolve away');

// Replace this with your real tests.
test('it works', function(assert) {
  let rect = new window.fabric.Rect({
    left: 100,
    top: 100,
    fill: 'red',
    width: 20,
    height: 20
  });
  rect.canvas = {
    renderAll() { },
    remove() { }
  };
  let result = animDissolveAway(rect);
  assert.ok(result);
});
