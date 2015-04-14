import Ember from 'ember';

import RequiredValidator from 'ember-simple-validate/lib/validators/required';

export default Ember.Service.extend({
  required: function() {
    return RequiredValidator.create();
  }
});
