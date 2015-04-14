import Ember from 'ember';
import RequiredValidator from 'ember-simple-validate/lib/validators/required';
import Validator from 'ember-simple-validate/lib/validator';
import { module, test } from 'qunit';

var get = Ember.get;
var set = Ember.set;

var subject;

module('Validators/Required', {
  beforeEach: function() {
    subject = RequiredValidator.create();
  }
});

test('it is an instance of a validator', function(assert) {
  assert.ok(subject instanceof Validator);
});

test('it fails on bad values', function(assert) {
  var values = [null, undefined, ''];

  values.forEach(function(value) {
    assert.equal(subject.call(value), false);
  });
});

test('it allows "falsey" values', function(assert) {
  var values = [false, 0, '0', [], {}];

  values.forEach(function(value) {
    assert.equal(subject.call(value), true);
  });
});

test('it formats error messages correctly', function(assert) {
  var values = [null, undefined, ''];
  var stringified = ['null', 'undefined', '""'];

  values.forEach(function(value, key) {
    subject.call(value);

    var error = subject.errors[0];

    assert.ok(new RegExp(stringified[key] + '.$').test(error));
  });
});
