class GameScreen {
  static world = null;

  static Init() {
    Block.Init();

    Networking.connectToServer(window.location.origin);

    GameScreen.world = new World();
  }
  static Update() {
    GameScreen.world.update();
    Statics.player.update();
  }
  static Draw() {
    GameScreen.world.draw();
    Statics.player.draw();
  }
  static CleanUp() {
    GameScreen.world.cleanUp();
    Statics.player.cleanUp();
  }
}
