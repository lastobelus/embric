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
  selection: Ember.Object.create({
    fill: '#111111',
    stroke: '#222222',
    strokeWidth: 1.5,
    'strokeWidth-asFloat': 1.5
  })
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
});

test('it sets fill property on selection', function(assert) {
  this.set('mockEditor', MockEditor.create());
  this.render(hbs`{{embric-fill-stroke-editor editor=mockEditor id="fill-editor"}}`);

  Ember.run(this, function() {
    this.$('#fill-editor-fill-color').val('#333333').trigger('input');

    assert.equal(this.get('mockEditor.selection.fill'), '#333333');
  });
});

test('it gets stroke property from selection', function(assert) {
  this.set('mockEditor', MockEditor.create());
  this.render(hbs`{{embric-fill-stroke-editor editor=mockEditor id="fill-editor"}}`);

  assert.equal(this.$('#fill-editor-stroke-color').val(), '#222222');
});

test('it sets stroke property on selection', function(assert) {
  this.set('mockEditor', MockEditor.create());
  this.render(hbs`{{embric-fill-stroke-editor editor=mockEditor id="fill-editor"}}`);

  Ember.run(this, function() {
    this.$('#fill-editor-stroke-color').val('#444444').trigger('input');

    assert.equal(this.get('mockEditor.selection.stroke'), '#444444');
  });
});

test('it gets strokeWidth property from selection', function(assert) {
  this.set('mockEditor', MockEditor.create());
  this.render(hbs`{{embric-fill-stroke-editor editor=mockEditor id="fill-editor"}}`);

  assert.equal(this.$('#fill-editor-stroke-width').val(), '1.5');
});

test('it sets strokeWidth property on selection', function(assert) {
  this.set('mockEditor', MockEditor.create());
  this.render(hbs`{{embric-fill-stroke-editor editor=mockEditor id="fill-editor"}}`);

  Ember.run(this, function() {
    this.$('#fill-editor-stroke-width').val('4.8').trigger('input');
    assert.equal(this.get('mockEditor.selection.strokeWidth-asFloat'), '4.8');
  });
});