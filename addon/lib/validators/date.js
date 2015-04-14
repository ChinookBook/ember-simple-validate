// import Ember from 'ember';
import Validator from '../validator';

/* global moment */

export default Validator.extend({
  options: {
    dateFormat: 'YYYY-MM-DD',
    timeFormat: 'HH:mm:ss',
  },

  call: function(value) {
    this.clearErrors();

    var formats = [
      this.get('options.dateFormat'),
      this.get('options.dateFormat') + ' ' + this.get('options.timeFormat'),
    ];

    return moment(value, formats, true).isValid();
  }
});
