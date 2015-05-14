import Ember from 'ember';
import Validator from '../validator';

export default Validator.extend({
  errorMessages: {
    main: 'Value must not be longer than %@ characters.'
  },

  options: {
    max: undefined,
  },

  call: function(value) {
    this.clearErrors();

    if(!this.isSet(value)) {
      return true;
    }

    var max = this.get('options.max');

    if(value.toString().length > max) {
      this.addError('main', max);

      return false;
    }

    return true;
  }
});
