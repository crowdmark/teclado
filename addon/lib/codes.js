let Key = {
  backspace: 8,
  tab: 9,
  enter: 13,
  return: 13,
  shift: 16,
  ctrl: 17,
  control: 17,
  alt: 18,
  capslock: 20,
  esc: 27,
  escape: 27,
  space: 32,
  pageup: 33,
  pagedown: 34,
  end: 35,
  home: 36,
  left: 37,
  up: 38,
  right: 39,
  down: 40,
  del: 46,
  delete: 46,

  "0": 48,
  ")": 48,
  "1": 49,
  "!": 49,
  "2": 50,
  "@": 50,
  "3": 51,
  "#": 51,
  "4": 52,
  "$": 52,
  "5": 53,
  "%": 53,
  "6": 54,
  "^": 54,
  "7": 55,
  "&": 55,
  "8": 56,
  "*": 56,
  "9": 57,
  "(": 57,

  "a": 65,
  "b": 66,
  "c": 67,
  "d": 68,
  "e": 69,
  "f": 70,
  "g": 71,
  "h": 72,
  "i": 73,
  "j": 74,
  "k": 75,
  "l": 76,
  "m": 77,
  "n": 78,
  "o": 79,
  "p": 80,
  "q": 81,
  "r": 82,
  "s": 83,
  "t": 84,
  "u": 85,
  "v": 86,
  "w": 87,
  "x": 88,
  "y": 89,
  "z": 90,

  meta: 91,

  ";": 186,
  ":": 186,
  ",": 188,
  "<": 188,
  ".": 190,
  ">": 190,
  "/": 191,
  "?": 191,
  "`": 192,
  "~": 192,
  "[": 219,
  "{": 219,
  "\\": 220,
  "|": 220,
  "]": 221,
  "}": 221,
  "'": 222,
  "\"": 222,
};

export default Key;

let SHIFTED_KEYS = `~!@#$%^&*()_+QWERTYUIOP{}|ASDFGHJKL:"ZXCVBNM<>?`;

export function isShifted(key) {
  return key.length === 1 && SHIFTED_KEYS.indexOf(key) !== -1;
}

export function parseShortcut(text) {
  let modifiers = {
    alt: false,
    ctrl: false,
    meta: false,
    shift: false,
  };

  let parts = text.replace(/\s/g, '').split('+');

  parts.slice(0, -1).forEach(part => {
    let key = part.toLowerCase();
    if (key in modifiers) {
      modifiers[key] = true;
    }
  });

  let key = parts[parts.length - 1];
  if (isShifted(key)) {
    modifiers.shift = true;
  }

  let code = Key[key.toLowerCase()];

  return { code, modifiers };
}
