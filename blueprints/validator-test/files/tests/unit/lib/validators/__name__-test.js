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
