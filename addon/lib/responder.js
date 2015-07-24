import { parseShortcut } from './codes';

function normalizeShortcuts(shortcuts) {
  let normalized = [];

  for (let key in shortcuts) {
    let result = parseShortcut(key);

    normalized.push({
      code: result.code,
      modifiers: result.modifiers,
      action: shortcuts[key]
    });
  }

  return normalized;
}

function matches(shortcut, event) {
  return (
    shortcut.code === event.keyCode &&
    shortcut.modifiers.alt === event.altKey &&
    shortcut.modifiers.ctrl === event.ctrlKey &&
    shortcut.modifiers.meta === event.metaKey &&
    shortcut.modifiers.shift === event.shiftKey
  );
}

function findShortcut(shortcuts, event) {
  for (let i = 0; i < shortcuts.length; i++) {
    let shortcut = shortcuts[i];
    if (matches(shortcut, event)) {
      return shortcut;
    }
  }
}

export default class Responder {
  constructor(config={}, handler=undefined) {
    this.handler = handler;
    this.source = config.source || document;
    this.target = config.target;
    this.shortcuts = normalizeShortcuts(config.shortcuts);

    this.prev = null;
    this.next = null;
  }

  respond(event) {
    if (event.currentTarget !== this.source) {
      return false;
    }

    let shortcut = findShortcut(this.shortcuts, event);
    if (shortcut) {
      this.target.send(shortcut.action, event);
      return true;
    } else {
      return false;
    }
  }

  init() {
    this.source.addEventListener('keydown', this.handler);
  }

  destroy() {
    if (this.prev) {
      this.prev.next = this.next;
      this.prev = null;
    }
    if (this.next) {
      this.next.prev = this.prev;
      this.next = null;
    }

    this.source.removeEventListener('keydown', this.handler);
    this.source = null;
    this.handler = null;
  }
}
