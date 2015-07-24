import Ember from 'ember';

export default Ember.Mixin.create({

  __teclado__: Ember.inject.service('teclado'),

  __teclado_responder__: null,

  didInsertElement() {
    this._super();

    let config = Ember.merge({}, this.get('teclado'));
    if (!config.target) { config.target = this; }

    this.__teclado_responder__ = this.get('__teclado__').register(config);
  },

  willDestroyElement() {
    this._super();
    this.get('__teclado__').unregister(this.__teclado_responder__);
  }
});
