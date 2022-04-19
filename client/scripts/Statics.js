class Statics {
  static Init() {
    Statics.player = new Player();
  }

  static onKeyDown(e) {
    let keycode = e.keyCode;

    Input.onKeyDown(keycode);
  }

  static onKeyUp(e) {
    let keycode = e.keyCode;
    Input.onKeyUp(keycode);
  }

  static onMouseUp(e) {}
  static onMouseDown(e) {}

  static onMouseMove(x, y) {}
}
