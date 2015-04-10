import Ember from 'ember';

var get = Ember.get;

export default function validate(object, validators) {
  var objectIsValid = true;

  Ember.keys(validators).forEach(function(field) {
    var value = get(object, field);

    var validatorsForCurrentField = Ember.makeArray(get(validators, field));

    validatorsForCurrentField.forEach(function(validator) {
      if(validator.call(value) === false) {
        objectIsValid = false;
      }
    });
  });

  return objectIsValid;
}
