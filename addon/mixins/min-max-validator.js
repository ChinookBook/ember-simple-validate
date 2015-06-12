import Ember from 'ember';

export default Ember.Mixin.create({
  checkMinMax: function(value) {
    var isValid = true;

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

    return isValid;
  }
});
