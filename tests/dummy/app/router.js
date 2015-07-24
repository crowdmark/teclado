import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('shortcut-dsl');

  this.route('nesting-scenarios', function() {
    this.route('global');
    this.route('global-in-global');
    this.route('global-in-local');
    this.route('local');
    this.route('local-in-global');
    this.route('local-in-local');
    this.route('parent-in-local');
  });
});

export default Router;
