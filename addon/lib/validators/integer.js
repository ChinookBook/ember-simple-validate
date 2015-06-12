// import Ember from 'ember';
import NumericValidator from './numeric';

export default NumericValidator.extend({
  options: {},

  errorMessages: {
    main: 'Value must be a whole number.',

    min: 'Minimum value: %@.',
    max: 'Maximum value: %@.',
  },

  _parse: function(value) {
    return parseInt(value);
  }
});
