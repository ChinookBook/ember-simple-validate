import Ember from 'ember';
import SimpleValidationMixin from 'ember-simple-validate/mixins/simple-validation-mixin';
import { module, test } from 'qunit';

import ValidatorCollection from 'ember-simple-validate/services/validator-collection';

var UserClass = Ember.Object.extend(SimpleValidationMixin, {
  firstName: 'Mihai',
  lastName: 'Scurtu',
});

var user;
var Assert;
var validators;

module('SimpleValidationMixin', {
  beforeEach: function() {
    user = UserClass.create();

    Assert = ValidatorCollection.create();

    validators = {
      firstName: Assert.required(),
      lastName: Assert.required(),
    };
  }
});

test('it validates a simple object', function(assert) {
  user.set('validators', validators);

  user.validate();

  assert.equal(user.get('isValid'), true);
});

test('"validators" can be a computed property', function(assert) {
  var NewUser = Ember.Object.extend(SimpleValidationMixin, {
    firstName: 'Mihai',
    lastName: '',

    lastNameOptional: false,

    validators: Ember.computed('lastNameOptional', function() {
      var validators = {
        firstName: Assert.required(),
      };

      if(!this.get('lastNameOptional')) {
        validators.lastName = Assert.required();
      }

      return validators;
    }),
  });

  user = NewUser.create();

  user.set('lastNameOptional', false);
  user.validate();
  assert.equal(user.get('isValid'), false);

  user.set('lastNameOptional', true);
  user.validate();
  assert.equal(user.get('isValid'), true);

});

test('it catches errors', function(assert) {
  user.set('validators', validators);
  user.set('firstName', '');

  assert.equal(user.get('validationErrors.firstName'), undefined);

  user.validate();

  assert.equal(user.get('isValid'), false);
  assert.equal(user.get('validationErrors.firstName').length, 1);
});

test('it accepts multiple validators for a field', function(assert) {
  validators.lastLogin = [Assert.required(), Assert.date()];

  user.set('validators', validators);

  user.validate();
  assert.equal(user.get('isValid'), false);

  user.set('lastLogin', '2016-02-29');

  user.validate();
  assert.equal(user.get('isValid'), true);
});

test("doesn't validate without validators", function(assert) {
  assert.equal(user.canValidate(), false);
});

test('it correctly sets canValidate', function(assert) {
  user.set('validators', validators);
  assert.equal(user.canValidate(), true);
});
