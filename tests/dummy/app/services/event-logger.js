import Ember from 'ember';

export default Ember.Service.extend({
  init() {
    this.messages = Ember.A();
  },

  push(message) {
    this.get('messages').pushObject(message);
  },

  clear() {
    this.get('messages').clear();
  },

  text: Ember.computed('messages.[]', function() {
    return this.get('messages').join('\n');
  })
});
