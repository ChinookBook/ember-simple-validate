import Ember from 'ember';

import _validate from 'ember-simple-validate/utils/validate';
import Validator from 'ember-simple-validate/lib/validator';

var get = Ember.get;
var set = Ember.set;

export default Ember.Mixin.create({
  init: function() {
    set(this, 'validators', {});
    set(this, 'validationErrors', {});
    set(this, 'isValid', undefined);
  },

  validate: function() {
    if(!this.canValidate()) {
      set(this, 'isValid', true);
    } else {
      var self = this;

      var validators = get(this, 'validators');

      set(this, 'isValid', _validate(this, validators));

      Ember.keys(validators).forEach(function(key) {
        set(self, 'validationErrors.' + key, get(validators[key], 'errors'));
      });
    }

    return this.get('isValid');
  },

  canValidate: function() {
    var validators = get(this, 'validators');
    var canValidate = true;

    var keys = Ember.keys(validators);

    if(keys && keys.length) {
      keys.forEach(function(key) {
          if(!validators[key] instanceof Validator) {
            canValidate = false;
            return false;
          }
      });
    } else {
      canValidate = false;
    }

    return canValidate;
  }
});
