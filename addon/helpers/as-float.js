import Ember from 'ember';

export function asFloat(params) {
  return parseFloat(params);
}

export default Ember.Helper.helper(asFloat);
