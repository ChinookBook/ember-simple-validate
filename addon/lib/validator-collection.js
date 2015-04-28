import Ember from 'ember';

import RequiredValidator from 'ember-simple-validate/lib/validators/required';
import RegexValidator from 'ember-simple-validate/lib/validators/regex';
import DateValidator from 'ember-simple-validate/lib/validators/date';
import IntegerValidator from 'ember-simple-validate/lib/validators/integer';

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

  integer: function(options) {
    return IntegerValidator.create().with(options);
  }
});
