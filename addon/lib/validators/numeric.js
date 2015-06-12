// import Ember from 'ember';
import Validator from '../validator';
import MinMaxValidator from '../../mixins/min-max-validator';

export default Validator.extend(MinMaxValidator, {
  options: {},

  errorMessages: {
    main: 'Value must be numeric.',

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
    if(value != this._parse(value) || Ember.isArray(value)) {
      isValid = false;
      this.addError('main');
    }
    /* jshint ignore:end */

    if(isValid) {
      value = parseInt(value);

      isValid = this.checkMinMax(value);
    }

    return isValid;
  },

  _parse: function(value) {
    return parseFloat(value);
  }
});
