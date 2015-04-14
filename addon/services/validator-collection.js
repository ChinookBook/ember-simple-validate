import Ember from 'ember';

import RequiredValidator from 'ember-simple-validate/lib/validators/required';
import RegexValidator from 'ember-simple-validate/lib/validators/regex';

export default Ember.Service.extend({
  required: function() {
    return RequiredValidator.create();
  },

  regex: function(pattern) {
    return RegexValidator.create().with({
      pattern: pattern
    });
  },
});
