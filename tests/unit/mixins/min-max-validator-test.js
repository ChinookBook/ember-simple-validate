import Ember from 'ember';
import MinMaxValidatorMixin from 'ember-simple-validate/mixins/min-max-validator';
import { module, test } from 'qunit';

module('MinMaxValidatorMixin');

// Replace this with your real tests.
test('it works', function(assert) {
  var MinMaxValidatorObject = Ember.Object.extend(MinMaxValidatorMixin);
  var subject = MinMaxValidatorObject.create();
  assert.ok(subject);
});
