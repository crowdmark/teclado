import Ember from 'ember';
import { module, test } from 'qunit';
import { blur, focus, keyDown } from '../helpers/keyboard';
import startApp from '../helpers/start-app';
import Key from 'teclado/lib/codes';

let application;
let eventLogger;

function getLog() {
  return eventLogger.get('messages');
}

module('Nesting scenarios', {
  beforeEach() {
    application = startApp();
    eventLogger = application.__container__.lookup('service:event-logger');
  },

  afterEach() {
    Ember.run(application, 'destroy');
    eventLogger = undefined;
  }
});

test('visiting /nesting-scenarios/global', assert => {
  visit('/nesting-scenarios/global');

  andThen(function() {
    blur();
    keyDown(Key.a);
    assert.deepEqual(getLog(), ['kc-1']);

    focus('#kc-1');
    keyDown(Key.a);
    assert.deepEqual(getLog(), ['kc-1', 'kc-1']);
  });
});

test('visiting /nesting-scenarios/global-in-local', assert => {
  visit('/nesting-scenarios/global-in-local');

  andThen(function() {
    blur();
    keyDown(Key.a);
    assert.deepEqual(getLog(), ['kc-2']);

    focus('#kc-1');
    keyDown(Key.a);
    assert.deepEqual(getLog(), ['kc-2', 'kc-1']);

    focus('#kc-2');
    keyDown(Key.a);
    assert.deepEqual(getLog(), ['kc-2', 'kc-1', 'kc-1']);
  });
});

test('visiting /nesting-scenarios/local', assert => {
  visit('/nesting-scenarios/local');

  andThen(function() {
    blur();
    keyDown(Key.a);
    assert.deepEqual(getLog(), []);

    focus('#kc-1');
    keyDown(Key.a);
    assert.deepEqual(getLog(), ['kc-1']);
  });
});

test('visiting /nesting-scenarios/local-in-global', assert => {
  visit('/nesting-scenarios/local-in-global');

  andThen(function() {
    blur();
    keyDown(Key.a);
    assert.deepEqual(getLog(), ['kc-1']);

    focus('#kc-1');
    keyDown(Key.a);
    assert.deepEqual(getLog(), ['kc-1', 'kc-1']);

    focus('#kc-2');
    keyDown(Key.a);
    assert.deepEqual(getLog(), ['kc-1', 'kc-1', 'kc-2']);
  });
});

test('visiting /nesting-scenarios/local-in-local', assert => {
  visit('/nesting-scenarios/local-in-local');

  andThen(function() {
    blur();
    keyDown(Key.a);
    assert.deepEqual(getLog(), []);

    focus('#kc-1');
    keyDown(Key.a);
    assert.deepEqual(getLog(), ['kc-1']);

    focus('#kc-2');
    keyDown(Key.a);
    assert.deepEqual(getLog(), ['kc-1', 'kc-2']);
  });
});
