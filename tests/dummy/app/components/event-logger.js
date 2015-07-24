import Ember from 'ember';

export default Ember.Component.extend({
  logger: Ember.inject.service('event-logger')
});
