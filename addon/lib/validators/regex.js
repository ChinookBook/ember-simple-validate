// import Ember from 'ember';
import Validator from '../validator';

export default Validator.extend({
  errorMessages: {
    main: 'Value %@ does not match pattern %@.',
  },

  init: function() {
    this._super();

    this.set('options', {
      pattern: '',
    });
  },

  call: function(value) {
    this.clearErrors();

    if(this.isSet(value)) {
      var pattern = this.get('options.pattern');
      var regex = new RegExp(pattern);

      if(!regex.test(value)) {
        this.addError('main', this.stringify(value), this.stringify(regex));

        return false;
      }
    }

    return true;
  }
});
