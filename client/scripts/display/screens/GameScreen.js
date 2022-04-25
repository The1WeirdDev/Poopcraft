class GameScreen {
  static world = null;

  static Init() {
    Block.Init();

    Networking.Init();
    Networking.connectToServer(window.location.origin);

    GameScreen.world = new World();
  }
  static Update() {
    GameScreen.world.update();
    Networking.Update();
    Statics.player.update();
  }
  static Draw() {
    GameScreen.world.draw();
    Networking.Draw();
    Statics.player.draw();
  }
  static CleanUp() {
    GameScreen.world.cleanUp();
    Networking.CleanUp();
    Statics.player.cleanUp();
  }
}
