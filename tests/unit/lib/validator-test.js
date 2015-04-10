import Ember from 'ember';
import Validator from 'ember-simple-validate/lib/validator';
import { module, test } from 'qunit';

var get = Ember.get;
var set = Ember.set;

var subject;

module('Validator', {
  beforeEach: function() {
    subject = Validator.create();
  }
});

test('it fails', function(assert) {
  assert.equal(subject.call(), false);
});

test('it adds an error message and flushes on every call', function(assert) {
  subject.call();

  assert.equal(get(subject, 'errors').length, 1);
  assert.equal(get(subject, 'errors')[0], get(subject, 'errorMessages.main'));

  subject.call();

  assert.equal(get(subject, 'errors').length, 1);
  assert.equal(get(subject, 'errors')[0], get(subject, 'errorMessages.main'));
});

test('it formats error messages', function(assert) {
  set(subject, 'errorMessages.fmt', '%@, error!');

  subject.clearErrors();
  subject.addError('fmt', 'warning');

  assert.equal(get(subject, 'errors')[0], 'warning, error!');
});

test('it stringifies weird values', function(assert) {
  assert.equal(subject.stringify(null), 'null');
  assert.equal(subject.stringify(undefined), 'undefined');
  assert.equal(subject.stringify(''), '""');
  assert.equal(subject.stringify('string'), '"string"');
});
