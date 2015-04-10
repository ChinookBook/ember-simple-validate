import Ember from 'ember';
import Validator from '../validator';

var get = Ember.get;
// var set = Ember.set;

export default Validator.extend({
  badValues: Ember.A([null, undefined, '']),

  errorMessages: {
    main: 'Value is required, cannot be %@',
  },

  call: function(value) {
    this.clearErrors();

    if(get(this, 'badValues').contains(value)) {
      this.addError('main', value);

      return false;
    }

    return true;
  }
});
