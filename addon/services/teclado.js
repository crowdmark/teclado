import Ember from 'ember';
import Responder from '../lib/responder';

export default Ember.Service.extend({
  init() {
    this.firstResponder = null;
  },

  register(config) {
    let responder = new Responder(config, event => {
      this.handleEvent(event);
    });

    if (this.firstResponder) {
      responder.next = this.firstResponder;
      this.firstResponder.prev = responder;
    }
    this.firstResponder = responder;

    responder.init();
    return responder;
  },

  unregister(responder) {
    responder.destroy();
  },

  handleEvent(event) {
    if (event.__teclado_handled__) { return; }
    event.__teclado_handled__ = true;

    let responder = this.firstResponder;
    while (responder) {
      if (responder.respond(event)) { break; }
      responder = responder.next;
    }
  }
});
