import Ember from 'ember';

var get = Ember.get;
var set = Ember.set;
var fmt = Ember.String.fmt;

export default Ember.Object.extend({
  options: null,
  errors: null,

  errorMessages: {
    main: 'Base validator cannot be used.'
  },

  call: function() {
    this.clearErrors();

    this.addError();

    return false;
  },

  addError: function(/* messageKey, [...parameters] */) {
    var messageKey = Array.prototype.shift.apply(arguments) || 'main';

    var message = get(this, 'errorMessages.' + messageKey);
    var formattedMessage = fmt(message, arguments);

    get(this, 'errors').pushObject(formattedMessage);
  },

  clearErrors: function() {
    set(this, 'errors', Ember.A());
  },

  with: function(options) {
    set(this, 'options', options);

    return this;
  },

  stringify: function(value) {
    if(value && typeof value !== 'string' && value.toString instanceof Function) {
      return value.toString();
    } else {
      var stringified = JSON.stringify(value);

      return stringified === undefined ? 'undefined' : stringified;
    }

  }
});
