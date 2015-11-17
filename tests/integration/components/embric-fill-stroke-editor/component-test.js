import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember';

import { assertionInjector } from 'dummy/tests/assertions';

moduleForComponent('embric-fill-stroke-editor', 'Integration | Component | embric fill stroke editor', {
  integration: true,
  beforeEach() {
    assertionInjector(this);
  }
});

let MockEditor = Ember.Component.extend({
  didSetProperty: null,
  didGetProperty: {},
  defaults: {
    fill:  '#111111',
    stroke:  '#222222',
    strokeWidth: '1'
  },
  getActiveProperty(propName) {
    this.get('didGetProperty')[propName] = true;
    return this.defaults[propName];
  },
  actions: {
    setActiveProperty(nameAndParser, value) {
      let [propName, parser] = nameAndParser.split('|');
      parser = parser || 'string';
      this.set('didSetProperty', { propName, value, parser });
    }
  }
});

test('it renders', function(assert) {
  this.set('mockEditor', MockEditor.create());
  this.render(hbs`{{embric-fill-stroke-editor editor=mockEditor}}`);

  assert.pageHasText('Fill & Stroke');
});

test('it gets fill property from selection', function(assert) {
  this.set('mockEditor', MockEditor.create());
  this.render(hbs`{{embric-fill-stroke-editor editor=mockEditor id="fill-editor"}}`);

  assert.equal(this.$('#fill-editor-fill-color').val(), '#111111');
  assert.ok(this.get('mockEditor.didGetProperty').fill);
});

test('it sets fill property on selection', function(assert) {
  this.set('mockEditor', MockEditor.create());
  this.render(hbs`{{embric-fill-stroke-editor editor=mockEditor id="fill-editor"}}`);

  this.$('#fill-editor-fill-color').val('#333333').trigger('input');

  assert.deepEqual(this.get('mockEditor.didSetProperty'),
    { propName: 'fill', value: '#333333', parser: 'string' });
});

test('it gets stroke property from selection', function(assert) {
  this.set('mockEditor', MockEditor.create());
  this.render(hbs`{{embric-fill-stroke-editor editor=mockEditor id="fill-editor"}}`);

  assert.equal(this.$('#fill-editor-stroke-color').val(), '#222222');
  assert.ok(this.get('mockEditor.didGetProperty').stroke);
});

test('it sets stroke property on selection', function(assert) {
  this.set('mockEditor', MockEditor.create());
  this.render(hbs`{{embric-fill-stroke-editor editor=mockEditor id="fill-editor"}}`);

  this.$('#fill-editor-stroke-color').val('#444444').trigger('input');

  assert.deepEqual(this.get('mockEditor.didSetProperty'),
    { propName: 'stroke', value: '#444444', parser: 'string' });
});

test('it gets strokeWidth property from selection', function(assert) {
  this.set('mockEditor', MockEditor.create());
  this.render(hbs`{{embric-fill-stroke-editor editor=mockEditor id="fill-editor"}}`);

  assert.equal(this.$('#fill-editor-stroke-width').val(), '1');
  assert.ok(this.get('mockEditor.didGetProperty').stroke);
});

test('it sets strokeWidth property on selection', function(assert) {
  this.set('mockEditor', MockEditor.create());
  this.render(hbs`{{embric-fill-stroke-editor editor=mockEditor id="fill-editor"}}`);

  this.$('#fill-editor-stroke-width').val('4.8').trigger('input');

  assert.deepEqual(this.get('mockEditor.didSetProperty'),
    { propName: 'strokeWidth', value: '4.8', parser: 'float' });
});