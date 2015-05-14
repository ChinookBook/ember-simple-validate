import Ember from 'ember';
import MaxLengthValidator from 'ember-simple-validate/lib/validators/max-length';
import Validator from 'ember-simple-validate/lib/validator';
import { module, test } from 'qunit';

var get = Ember.get;
var set = Ember.set;

var subject;
var max = 3;

module('Validators/MaxLength', {
  beforeEach: function() {
    subject = MaxLengthValidator.create().with({max: 3});
  }
});

test('it validates strings', function(assert) {
  assert.ok(subject.call('as'));
  assert.ok(subject.call('asd'));
  assert.equal(subject.call('asdf'), false);
});

test('it validates numbers', function(assert) {
  assert.ok(subject.call(10));
  assert.ok(subject.call(-10));
  assert.ok(subject.call(1.1));

  assert.equal(subject.call(1000), false);
  assert.equal(subject.call(-101), false);
  assert.equal(subject.call(1.11), false);
});

test('it accepts arrays', function(assert) {
  assert.equal(subject.call([]), true);
  assert.equal(subject.call([1, 'asd']), false);
});

test('it allows empty values (unless paired with required)', function(assert) {
  assert.ok(subject.call(''));
  assert.ok(subject.call(null));
  assert.ok(subject.call(undefined));
});
