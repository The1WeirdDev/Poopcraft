class Statics {
  static Init() {
    Statics.player = new Player();
  }

  static onKeyDown(e) {
    let keycode = e.keyCode;
    if (keycode == 87) {
      Statics.player.shouldMoveForwards = true;
      Statics.player.shouldMoveBackwards = false;
    } else if (keycode == 83) {
      Statics.player.shouldMoveForwards = false;
      Statics.player.shouldMoveBackwards = true;
    } else if (keycode == 65) {
      Statics.player.shouldMoveLeft = true;
      Statics.player.shouldMoveRight = false;
    } else if (keycode == 68) {
      Statics.player.shouldMoveLeft = false;
      Statics.player.shouldMoveRight = true;
    } else if (keycode == 81) {
      Statics.player.r_value = -1;
    } else if (keycode == 69) {
      Statics.player.r_value = 1;
    }
  }

  static onKeyUp(e) {
    let keycode = e.keyCode;
    if (keycode == 87) {
      Statics.player.shouldMoveForwards = false;
      Statics.player.shouldMoveBackwards = false;
    } else if (keycode == 83) {
      Statics.player.shouldMoveForwards = false;
      Statics.player.shouldMoveBackwards = false;
    } else if (keycode == 65) {
      Statics.player.shouldMoveLeft = false;
      Statics.player.shouldMoveRight = false;
    } else if (keycode == 68) {
      Statics.player.shouldMoveLeft = false;
      Statics.player.shouldMoveRight = false;
    } else if (keycode == 81) {
      Statics.player.r_value = 0;
    } else if (keycode == 69) {
      Statics.player.r_value = 0;
    }
  }

  static onMouseUp(e) {}
  static onMouseDown(e) {}

  static onMouseMove(x,y) {
    Statics.player.onMouseMove(x,y);
  }
}
