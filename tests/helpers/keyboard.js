const KeyboardEvent = window.KeyboardEvent;

export let Key = {
  A: 97
};

export function focus(selector) {
  let element;
  if (typeof selector === 'string') {
    element = document.querySelector(selector);
  } else {
    element = selector;
  }
  element.focus();
}

export function blur() {
  document.activeElement.blur();
}

export function keyDown(code, modifiers) {
  dispatchKeyboardEvent('keydown', code, modifiers);
}

export function keyUp(code, modifiers) {
  dispatchKeyboardEvent('keyup', code, modifiers);
}

function dispatchKeyboardEvent(name, code, modifiers) {
  let codeGetter = {
    get() { return code; }
  };

  let event = new KeyboardEvent(name, { bubbles: true, cancelable: true });

  Object.defineProperty(event, 'keyCode', codeGetter);
  Object.defineProperty(event, 'which', codeGetter);

  for (let key in modifiers) {
    event[key + 'Key'] = modifiers[key];
  }

  document.activeElement.dispatchEvent(event);
}
