import Ember from 'ember';
import KeyboardShortcuts from 'teclado/mixins/component';

export default Ember.Component.extend(KeyboardShortcuts, {
  logger: Ember.inject.service('event-logger'),

  attributeBindings: ['style', 'tabindex'],

  style: new Ember.Handlebars.SafeString(`
    padding: 50px;
    background-color: rgba(0,255,0,0.25);
  `),

  tabindex: '0',

  teclado: Ember.computed(function() {
    let sourceId = this.get('sourceId');
    let shortcut = this.get('shortcut') || 'a';

    let config = {
      shortcuts: {
        [shortcut]: 'log'
      }
    };

    if (sourceId) {
      config.source = document.getElementById(sourceId);
    }

    return config;
  }),

  actions: {
    log() {
      this.get('logger').push(this.get('elementId'));
    }
  }
});
