enum KeyCodes {
  LEFT = "ArrowLeft",
  RIGHT = "ArrowRight",
  UP = "ArrowUp",
  DOWN = "ArrowDown",
}

enum Key {
  RIGHT = "right",
  LEFT = "left",
  UP = "up",
}

class Keyboard {
  static lastKey: { key: Key | null } = { key: null };
  static keys: { [key in Key]: { pressed: boolean } } = {
    right: {
      pressed: false,
    },
    left: {
      pressed: false,
    },
    up: {
      pressed: false,
    },
  };
  constructor() {}
  static setKeyPressed(key: Key, isPressed: boolean) {
    Keyboard.keys[key].pressed = isPressed;
  }

  static setLastKeyPressed(key: Key) {
    Keyboard.lastKey.key = key;
  }

  static handleKeyDown(e: KeyboardEvent) {
    if (e.code === KeyCodes.RIGHT) {
      const key = Key.RIGHT;
      Keyboard.setKeyPressed(key, true);
      Keyboard.setLastKeyPressed(key);
    } else if (e.code === KeyCodes.UP) {
      const key = Key.UP;
      Keyboard.setKeyPressed(key, true);
      Keyboard.setLastKeyPressed(key);
    } else if (e.code === KeyCodes.LEFT) {
      const key = Key.LEFT;
      Keyboard.setKeyPressed(key, true);
      Keyboard.setLastKeyPressed(key);
    }
  }

  static handleKeyUp = (e: KeyboardEvent) => {
    if (e.code === KeyCodes.RIGHT) {
      const key = Key.RIGHT;
      Keyboard.setKeyPressed(key, false);
      Keyboard.setLastKeyPressed(key);
    } else if (e.code === KeyCodes.UP) {
      const key = Key.UP;
      Keyboard.setKeyPressed(key, false);
      Keyboard.setLastKeyPressed(key);
    } else if (e.code === KeyCodes.LEFT) {
      const key = Key.LEFT;
      Keyboard.setKeyPressed(key, false);
      Keyboard.setLastKeyPressed(key);
    }
  };
}

export { Keyboard, KeyCodes, Key };
