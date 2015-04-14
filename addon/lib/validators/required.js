import Validator from '../validator';

export default Validator.extend({
  errorMessages: {
    main: 'Value is required, cannot be %@.',
  },

  call: function(value) {
    this.clearErrors();

    if(!this.isSet(value)) {
      this.addError('main', this.stringify(value));

      return false;
    }

    return true;
  }
});
