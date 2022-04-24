class WorldNetworking {
  static Init() {}

  static onReceiveChunk(data) {
    let x = data.x;
    let z = data.z;
    let block_data = data.block_data;

    GameScreen.world.createChunk(x, z, block_data);
  }
}
