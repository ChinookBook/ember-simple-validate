// import Ember from 'ember';
import Validator from '../validator';

export default Validator.extend({
  regex: /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i,

  errorMessages: {
    main: 'Invalid e-mail address.',
  },

  call: function(value) {
    this.clearErrors();

    if(!this.isSet(value)) {
      return true;
    }

    if(!this.regex.test(value)) {
      this.addError('main');
      return false;
    }

    return true;
  }
});
