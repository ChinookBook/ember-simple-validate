import { module, test } from 'qunit';

import ValidatorCollection from 'ember-simple-validate/lib/validator-collection';
import Validator from 'ember-simple-validate/lib/validator';

module('ValidatorCollection');

// Replace this with your real tests.
test('it has the correct validators', function(assert) {
  var subject = ValidatorCollection.create();

  assert.ok(subject.required().call instanceof Function);
  assert.equal(subject.regex('test').get('options.pattern'), 'test');

  var integer = subject.integer({min: 0, max: 1});
  assert.equal(integer.get('options.min'), 0);
  assert.equal(integer.get('options.max'), 1);
});
