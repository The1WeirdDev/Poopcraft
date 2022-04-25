const Networking = require("./Networking.js");
const PacketTypes = require("./PacketTypes.js");
const World = require("./../world/World.js");
const Chunk = require("./../world/Chunk.js");

module.exports = class WorldNetworking {
  static world = null;

  static Init() {
    WorldNetworking.world = new World();
  }

  static onReceiveChunk(socket, data) {
    let _x = Math.floor(data.x);
    let _z = Math.floor(data.z);

    let chunk = WorldNetworking.world.getChunk(_x, _z);
    let _data = chunk.chunk_data;
    socket.emit(PacketTypes.ReceiveChunk, {
      x: _x,
      z: _z,
      block_data: _data
    });
  }
};
