import Ember from 'ember';

import RequiredValidator from 'ember-simple-validate/lib/validators/required';
import RegexValidator from 'ember-simple-validate/lib/validators/regex';
import DateValidator from 'ember-simple-validate/lib/validators/date';
import NumericValidator from 'ember-simple-validate/lib/validators/numeric';
import IntegerValidator from 'ember-simple-validate/lib/validators/integer';
import MaxLengthValidator from 'ember-simple-validate/lib/validators/max-length';
import EmailValidator from 'ember-simple-validate/lib/validators/email';

export default Ember.Object.extend({
  required: function() {
    return RequiredValidator.create();
  },

  regex: function(pattern) {
    return RegexValidator.create().with({
      pattern: pattern
    });
  },

  date: function() {
    return DateValidator.create();
  },

  numeric: function(options) {
    return NumericValidator.create().with(options);
  },

  integer: function(options) {
    return IntegerValidator.create().with(options);
  },

  maxLength: function(max) {
    return MaxLengthValidator.create().with({
      max: max
    });
  },

  email: function() {
    return EmailValidator.create();
  },
});
