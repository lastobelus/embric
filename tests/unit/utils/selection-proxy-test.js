import SelectionProxy from 'embric/utils/selection-proxy';
import { module, test } from 'qunit';

module('Unit | Utility | selection proxy');

function singleSelection() {
  return {
    type: 'triangle',
    fill: 'red',
    strokeWidth: 1.3
  };
}

function groupSelection() {
  return {
    type: 'group',
    objects: [
      {
        type: 'triangle',
        same: 'red',
        notSame: 'blue'
      },
      {
        type: 'square',
        same: 'red',
        notSame: 'purple'
      }
    ]
  };
}

// Replace this with your real tests.
test('it instantiates', function(assert) {
  let selection = SelectionProxy.create();
  assert.ok(selection);
});

test('it proxies to a POJSO', function(assert) {
  let obj = singleSelection();
  let selectionProxy = SelectionProxy.create({
    selection: obj
  });
  assert.equal(selectionProxy.get('fill'), 'red');
  selectionProxy.set('fill', 'blue');
  assert.equal(selectionProxy.get('fill'), 'blue');
  assert.equal(obj.fill, 'blue');
});

test('it proxies to a group selection', function(assert) {
  let group = groupSelection();
  let selectionProxy = SelectionProxy.create({
    selection: group
  });
  assert.equal(selectionProxy.get('same'), 'red', 'should get properties that are same on all objects in group');
  assert.equal(selectionProxy.get('notSame'), '', 'should return "" for properties that not unique among objects in group');

  let returnFromSet = selectionProxy.set('same', 'orange');
  assert.equal(returnFromSet, 'orange', 'should return value from set');
  assert.equal(selectionProxy.get('same'), 'orange', 'should set property on all objects in group');
  assert.equal(group.objects[0].same, 'orange');
  assert.equal(group.objects[1].same, 'orange');

  returnFromSet = selectionProxy.set('notSame', 'yellow');
  assert.equal(returnFromSet, 'yellow', 'should return value from set');
  assert.equal(selectionProxy.get('notSame'), 'yellow', 'should set property on all objects in group');
  assert.equal(group.objects[0].notSame, 'yellow');
  assert.equal(group.objects[1].notSame, 'yellow');
});

test('it should call changeHandler on change', function(assert) {
  assert.expect(2);
  let handler = () => {
    assert.ok(true, 'handler called');
  };
  let singleProxy = SelectionProxy.create({
    changeHandler: handler,
    selection: singleSelection()
  });
  singleProxy.set('fill', 'purple');

  let groupProxy = SelectionProxy.create({
    changeHandler: handler,
    selection: groupSelection()
  });
  groupProxy.set('same', 'purple');
});

test('it should parse floats', function(assert) {
  let obj = singleSelection();
  let singleProxy = SelectionProxy.create({
    selection: obj
  });
  singleProxy.set('strokeWidth-asFloat', '74.7x');
  // assert.equal(returnFromSet, 74.7, 'value actually set should be a float' ); // I don't know how to make this happen, although I return correct value from setUnknownProperty, Ember.get discards it.
  assert.equal(obj.strokeWidth, 74.7, 'value actually set should be a float');
});