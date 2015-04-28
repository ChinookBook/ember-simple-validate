// import Ember from 'ember';
import Validator from '../validator';

export default Validator.extend({
  options: {},

  errorMessages: {
    main: 'Value must be a whole number.',

    min: 'Minimum value: %@.',
    max: 'Maximum value: %@.',
  },

  call: function(value) {
    this.clearErrors();

    if(!this.isSet(value)) {
      return true;
    }

    var isValid = true;

    /* jshint ignore:start */
    if(value != parseInt(value) || Ember.isArray(value)) {
      isValid = false;
      this.addError('main');
    }
    /* jshint ignore:end */

    if(isValid) {
      value = parseInt(value);

      if(this.hasOption('min')) {
        if(value < this.get('options.min')) {
          isValid = false;
          this.addError('min', this.get('options.min'));
        }
      }

      if(this.hasOption('max')) {
        if(value > this.get('options.max')) {
          isValid = false;
          this.addError('max', this.get('options.max'));
        }
      }
    }

    return isValid;
  }
});
