import Ember from 'ember';
import Validator from '../validator';

export default Validator.extend({

  call: function(value) {
    this.clearErrors();

    return false;
  }
});
