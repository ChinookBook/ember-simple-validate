import Ember from 'ember';

import _validate from 'ember-simple-validate/utils/validate';
import Validator from 'ember-simple-validate/lib/validator';

var get = Ember.get;
var set = Ember.set;

var validValidator = function(validator) {
  return validator instanceof Validator;
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
        Ember.makeArray(validators[key]).forEach(function(validator) {
          self.addErrors(key, get(validator, 'errors'));
        });


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
  },

  addErrors: function(key, errors) {
    var self = this;

    Ember.makeArray(errors).forEach(function(error) {
      self.addError(key, error);
    });
  },

  addError: function(key, error) {
    var self = this;

    var keyParts = key.split('.');
    var path = 'validationErrors';

    keyParts.forEach(function(key, i) {
      path += '.' + key;

      if(!get(self, path)) {
        var blank = i === keyParts.length - 1 ? Ember.A() : {};

        set(self, path, blank);
      }
    });

    get(this, 'validationErrors.' + key).pushObject(error);
  }
});
