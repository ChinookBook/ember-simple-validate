import Ember from 'ember';
import <%= classifiedModuleName %>Validator from 'ember-simple-validate/lib/validators/<%= dasherizedModuleName %>';
import Validator from 'ember-simple-validate/lib/validator';
import { module, test } from 'qunit';

var get = Ember.get;
var set = Ember.set;

var subject;

module('Validators/<%= classifiedModuleName %>', {
  beforeEach: function() {
    subject = <%= classifiedModuleName %>Validator.create();
  }
});

test('it is an instance of a validator', function(assert) {
  assert.ok(subject instanceof Validator);
});

test('it allows empty values (unless paired with required)', function(assert) {
  assert.ok(subject.call(''));
  assert.ok(subject.call(null));
  assert.ok(subject.call(undefined));
});
