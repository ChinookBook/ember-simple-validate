import validate from '../../../utils/validate';
import { module, test } from 'qunit';

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
