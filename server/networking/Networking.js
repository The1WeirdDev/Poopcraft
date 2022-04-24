//So i dont have to retype and can easily change stuff
let WorldNetworking = require("./WorldNetworking.js");
let PacketTypes = require("./PacketTypes.js");
let Utils = require("./../utils/utils.js");

//Server Networking
module.exports = class Networking {
  static Players = [];
  static PlayersToRemember = [];

  static Init() {}

  static onSocketConnect(socket) {
    Networking.onConnected(socket);

    socket.on(PacketTypes.Disconnect, () => {
      Networking.onDisconnect(socket);
    });

    socket.on(PacketTypes.ReceivePlayers, () => {
      Networking.onReceivePlayers(socket);
    });

    socket.on(PacketTypes.ReceiveChunk, (data) => {
      WorldNetworking.onReceiveChunk(socket, data);
    });
  }

  static AddPlayer(socket) {
    //Creating Player Object
    Networking.Players[socket.id] = {
      id: Utils.generateUUID(),
      name: null,
      position: [0, 0, 0],
      mesh: null
    };

    //Making Sure we remember the player is in
    Networking.PlayersToRemember.push(Networking.Players[socket.id]);

    //Tell the other clients to add the player to their drawing list
    Networking.sendPacket(
      socket.broadcast,
      PacketTypes.AddPlayer,
      Networking.Players[socket.id]
    );
  }

  static RemovePlayer(socket) {
    //Removing the player from the list to remember
    for (let i = 0; i < Networking.PlayersToRemember.length; i++) {
      if (
        Networking.PlayersToRemember[i].id === Networking.Players[socket.id].id
      ) {
        Networking.PlayersToRemember.splice(i, 1);
      }
    }

    //Telling the other clients to stop doing stuff and to remove the player
    Networking.sendPacket(
      socket.broadcast,
      PacketTypes.RemovePlayer,
      Networking.Players[socket.id]
    );
  }

  static sendPacket(socket, type, data) {
    socket.emit(type, data);
  }

  static onReceivePlayers(socket) {}

  static onConnected(socket) {
    //Happens when the user first connects
    console.log("User Connected : " + socket.id);

    Networking.AddPlayer(socket);
  }
  static onDisconnect(socket) {
    //Happens when the user disconnects
    console.log("User Disconnected : " + socket.id);

    Networking.RemovePlayer(socket);
  }
};
