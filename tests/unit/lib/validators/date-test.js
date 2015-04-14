import Ember from 'ember';
import DateValidator from 'ember-simple-validate/lib/validators/date';
import Validator from 'ember-simple-validate/lib/validator';
import { module, test } from 'qunit';

var get = Ember.get;
var set = Ember.set;

var subject;

module('Validators/Date', {
  beforeEach: function() {
    subject = DateValidator.create();
  }
});

test('it is an instance of a validator', function(assert) {
  assert.ok(subject instanceof Validator);
});

test('it validates dates', function(assert) {
  assert.equal(subject.call('2015-01-01'), true);
});

test('it validates dates + times', function(assert) {
  assert.equal(subject.call('2015-01-01 20:15:00'), true);
});
