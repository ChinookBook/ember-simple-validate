import Ember from 'ember';
import IntegerValidator from 'ember-simple-validate/lib/validators/integer';
import Validator from 'ember-simple-validate/lib/validator';
import { module, test } from 'qunit';

var get = Ember.get;
var set = Ember.set;

var subject;

module('Validators/Integer', {
  beforeEach: function() {
    subject = IntegerValidator.create().with({});
  },
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
  assert.equal(subject.call(1), true);
  assert.equal(subject.call(0), true);
  assert.equal(subject.call(-1), true);
  assert.equal(subject.call('512'), true);
  assert.equal(subject.call('-512'), true);
});

test('it rejects bad values', function(assert) {
  var badValues = [3.14, 'a1', '1a', '.1', [1], {a: 1}, true, false];

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
