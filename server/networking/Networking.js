//So i dont have to retype and can easily change stuff
const WorldNetworking = require("./WorldNetworking.js");
const NetworkingPlayers = require("./NetworkingPlayers.js");
const PacketTypes = require("./PacketTypes.js");

//Server Networking
module.exports = class Networking {
  static Init() {}

  static onSocketConnect(socket) {
    //Connections
    Networking.onConnected(socket);

    socket.on(PacketTypes.Disconnect, () => {
      Networking.onDisconnect(socket);
    });

    //Players
    socket.on(PacketTypes.ReceivePlayers, () => {
      NetworkingPlayers.onReceivePlayers(socket);
    });

    socket.on(PacketTypes.SetPlayerPosition, (data) => {
      NetworkingPlayers.SetPlayerPosition(socket, data);
    });

    //World
    socket.on(PacketTypes.ReceiveChunk, (data) => {
      WorldNetworking.onReceiveChunk(socket, data);
    });
  }

  static sendPacket(socket, type, data) {
    socket.emit(type, data);
  }

  static onConnected(socket) {
    //Happens when the user first connects
    console.log("User Connected : " + socket.id);

    NetworkingPlayers.AddPlayer(socket);
  }
  static onDisconnect(socket) {
    //Happens when the user disconnects
    console.log("User Disconnected : " + socket.id);

    NetworkingPlayers.RemovePlayer(socket);
  }
};
