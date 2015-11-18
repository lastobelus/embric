import Ember from 'ember';

export function asInt(params) {
  return parseInt(params, 10);
}

export default Ember.Helper.helper(asInt);
