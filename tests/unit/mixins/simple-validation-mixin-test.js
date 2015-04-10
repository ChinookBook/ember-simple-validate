import Ember from 'ember';
import SimpleValidationMixinMixin from 'ember-simple-validate/mixins/simple-validation-mixin';
import { module, test } from 'qunit';

module('SimpleValidationMixinMixin');

// Replace this with your real tests.
test('it works', function(assert) {
  var SimpleValidationMixinObject = Ember.Object.extend(SimpleValidationMixinMixin);
  var subject = SimpleValidationMixinObject.create();
  assert.ok(subject);
});
