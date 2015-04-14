import Ember from 'ember';
import RegexValidator from 'ember-simple-validate/lib/validators/regex';
import Validator from 'ember-simple-validate/lib/validator';
import { module, test } from 'qunit';

var get = Ember.get;
var set = Ember.set;

var subject;

module('Validators/Regex', {
  beforeEach: function() {
    subject = RegexValidator.create();
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

test('it validates simple values', function(assert) {
  subject.set('options.pattern', /ab+a/);

  var result = subject.call('abbba');
  assert.equal(result, true);

  result = subject.call('abbcba');
  assert.equal(result, false);
});

test('it formats error messages', function(assert) {
  var pattern = 'abc';
  var value = 'foo';

  subject.set('options.pattern', pattern);

  subject.call(value);

  assert.equal(subject.get('errors').length, 1);

  var errorMessage = subject.get('errors')[0];
  var expected = new RegExp('"' + value + '".*/' + pattern + '/');
  assert.ok(expected.test(errorMessage));
});
