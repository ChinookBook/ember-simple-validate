import validate from '../../../utils/validate';
import { module, test } from 'qunit';

import Ember from 'ember';
import Required from 'ember-simple-validate/lib/validators/required';

var validators;
var user;

module('validate', {
  beforeEach: function() {
    validators = {
      firstName: Required.create(),
      lastName: Required.create(),
    };

    user = {
      firstName: 'Mihai',
      lastName: 'Scurtu',
    };
  }
});

test('it validates a simple object', function(assert) {
  var result = validate(user, validators);

  assert.equal(result, true);
});

test('it fails on error', function(assert) {
  delete user.lastName;

  var result = validate(user, validators);

  assert.equal(result, false);
});

test('errors are retrievable', function(assert) {
  delete user.lastName;

  var result = validate(user, validators);

  assert.ok(validators.lastName.errors[0]);
});

test('it works with ember objects', function(assert) {
  var userObject = Ember.Object.create(user);

  var result = validate(userObject, validators);

  assert.equal(result, true);
});

test('it works with computed properties', function(assert) {
  var UserClass = Ember.Object.extend({
    firstName: 'Mihai',
    lastName: 'Scurtu',

    fullName: Ember.computed('firstName', 'lastName', function(key, value) {
      return Ember.get(this, 'firstName') + ' ' + Ember.get(this, 'lastName');
    }),
  });

  var userObject = UserClass.create();

  validators = {
    fullName: Required.create(),
  };

  var result = validate(userObject, validators);
  assert.equal(result, true);
});

test('it works with nested properties', function(assert) {
  var user = Ember.Object.create();

  validators = {
    'address.city': Required.create(),
  };

  var result = validate(user, validators);
  assert.equal(result, false);

  user.set('address', {
    city: 'foo',
  });

  result = validate(user, validators);
  assert.equal(result, true);
});
