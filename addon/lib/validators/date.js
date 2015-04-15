// import Ember from 'ember';
import Validator from '../validator';

/* global moment */

export default Validator.extend({
  options: {
    dateFormat: 'YYYY-MM-DD',
    timeFormat: 'HH:mm:ss',
  },

  errorMessages: {
    main: 'Invalid date format.',
  },

  call: function(value) {
    this.clearErrors();

    if(this.isSet(value)) {
      var formats = [
        this.get('options.dateFormat'),
        this.get('options.dateFormat') + ' ' + this.get('options.timeFormat'),
      ];

      if(moment(value, formats, true).isValid()) {
        return true;
      } else {
        this.addError();
        return false;
      }
    }

    return true;
  }
});
