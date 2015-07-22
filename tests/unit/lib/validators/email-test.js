import Ember from 'ember';
import EmailValidator from 'ember-simple-validate/lib/validators/email';
import Validator from 'ember-simple-validate/lib/validator';
import { module, test } from 'qunit';

var get = Ember.get;
var set = Ember.set;

var subject;

module('Validators/Email', {
  beforeEach: function() {
    subject = EmailValidator.create();
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

test('it validates emails', function(assert) {
  var emails = [
    'foo.bar@baz.com',
    'foo+bar@gmail.com',
    'foo-bar@yahoo.cc',
  ];

  assert.expect(emails.length);

  emails.forEach(function(email) {
    assert.ok(subject.call(email));
  });
});

test('it fails on non-emails', function(assert) {
  var nonEmails = [
    'foo',
    'foo.bar@',
    '@@@',
    '@.',
    'foo@bar.'
  ];

  assert.expect(nonEmails.length);

  nonEmails.forEach(function(email) {
    assert.equal(subject.call(email), false);
  });
});
