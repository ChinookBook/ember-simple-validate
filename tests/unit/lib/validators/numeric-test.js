import Ember from 'ember';
import NumericValidator from 'ember-simple-validate/lib/validators/numeric';
import Validator from 'ember-simple-validate/lib/validator';
import { module, test } from 'qunit';

var get = Ember.get;
var set = Ember.set;

var subject;

module('Validators/Numeric', {
  beforeEach: function() {
    subject = NumericValidator.create();
  },
  afterEach: function() {
    subject = null;
  }
});

test('it is an instance of a validator', function(assert) {
  assert.ok(subject instanceof Validator);
});

test('it allows empty values (unless paired with required)', function(assert) {
  assert.ok(subject.call(''));
  assert.ok(subject.call(null));
  assert.ok(subject.call(undefined));
});

test('it validates numbers', function(assert) {
  var values = [1, -1, 123, -123, 1.0, -1.0, 0, 0.0, '1', '-1', '123', '-123', '1.0', '-1.0', '0', '0.0', '.33'];

  assert.expect(values.length);

  values.forEach(function(value) {
    assert.ok(subject.call(value));
  });
});

test('it rejects bad values', function(assert) {
  var badValues = ['a1', '1a', [1], {a: 1}, true, false];

  assert.expect(badValues.length + 1);

  badValues.forEach(function(value) {
    assert.equal(subject.call(value), false);
  });

  assert.equal(subject.get('errors').length, 1);
});

test('it respects min', function(assert) {
  subject.set('options.min', 0);

  assert.equal(subject.call(1), true);
  assert.equal(subject.call(0), true);
  assert.equal(subject.call(-1), false);

  assert.equal(subject.get('errors').length, 1);
  assert.equal(subject.get('errors')[0].match(/\-1.$/));
});

test('it respects max', function(assert) {
  subject.set('options.max', 0);

  assert.equal(subject.call(-1), true);
  assert.equal(subject.call(0), true);
  assert.equal(subject.call(1), false);

  assert.equal(subject.get('errors').length, 1);
  assert.equal(subject.get('errors')[0].match(/\-1.$/));
});
