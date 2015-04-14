import {
  moduleFor,
  test
} from 'ember-qunit';

import Validator from 'ember-simple-validate/lib/validator';

moduleFor('service:validator-collection', {
  // Specify the other units that are required for this test.
  // needs: ['service:foo']
});

// Replace this with your real tests.
test('it has the correct validators', function(assert) {
  var service = this.subject();

  assert.ok(service.required().call instanceof Function);
  assert.equal(service.regex('test').get('options.pattern'), 'test');
});
