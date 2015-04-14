import Ember from 'ember';

import _validate from 'ember-simple-validate/utils/validate';
import Validator from 'ember-simple-validate/lib/validator';

var get = Ember.get;
var set = Ember.set;

var validValidator = function(validator) {
  return validator instanceof Validator;
};

var appendErrors = function(obj, key, errors) {
  var keyParts = key.split('.');
  var path = 'validationErrors';

  if(errors && errors.length) {
    keyParts.forEach(function(key, i) {
      path += '.' + key;

      if(!get(obj, path)) {
        var blank = i === keyParts.length - 1 ? Ember.A() : {};

        set(obj, path, blank);
      }
    });

    errors.forEach(function(error) {
      get(obj, 'validationErrors.' + key).pushObject(error);
    });
  }
};

export default Ember.Mixin.create({
  init: function() {
    this._super();
    set(this, 'isValid', undefined);
  },

  validate: function() {
    set(this, 'validationErrors', {});

    if(!this.canValidate()) {
      set(this, 'isValid', true);
    } else {
      var self = this;

      var validators = get(this, 'validators');

      set(this, 'isValid', _validate(this, validators));

      Ember.keys(validators).forEach(function(key) {
        // set(self, 'validationErrors.' + key, get(validators[key], 'errors'));
        appendErrors(self, key, get(validators[key], 'errors'));
      });
    }

    return this.get('isValid');
  },

  canValidate: function() {
    var validators = get(this, 'validators') || {};
    var canValidate = true;

    var keys = Ember.keys(validators);

    if(keys && keys.length) {
      keys.forEach(function(key) {
        var validatorList = Ember.makeArray(validators[key]);

        validatorList.forEach(function(validator) {
          if(!validValidator(validator)) {
            canValidate = false;
            return false;
          }
        });
      });
    } else {
      canValidate = false;
    }

    return canValidate;
  }
});
