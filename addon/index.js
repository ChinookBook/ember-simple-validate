import SimpleValidationMixin from 'ember-simple-validate/mixins/simple-validation-mixin';
import validate from 'ember-simple-validate/utils/validate';
import ValidatorCollection from 'ember-simple-validate/lib/validator-collection';

export default {
  Mixin: SimpleValidationMixin,
  Validators: ValidatorCollection.create(),
  validate: validate,
};
