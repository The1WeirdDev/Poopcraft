const Networking = require("./Networking.js");
const PacketTypes = require("./PacketTypes.js");
const Utils = require("./../utils/utils.js");

module.exports = class NetworkingPlayers {
  static Players = [];
  static PlayersToRemember = [];

  //OnReceivePlayers
  static onReceivePlayers(socket) {
    socket.emit(
      PacketTypes.ReceivePlayers,
      NetworkingPlayers.PlayersToRemember
    );
  }

  //Adding Player
  static AddPlayer(socket) {
    //Creating Player Object
    NetworkingPlayers.Players[socket.id] = {
      id: socket.id,
      name: null,
      position: [15, 50, 15],
      rotation: [0, 90, 0],
      mesh: null
    };

    //Making Sure we remember the player is in
    NetworkingPlayers.PlayersToRemember.push(
      NetworkingPlayers.Players[socket.id]
    );

    //Tell the other clients to add the player to their drawing list
    socket.broadcast.emit(
      PacketTypes.AddPlayer,
      NetworkingPlayers.Players[socket.id]
    );
  }

  //Removing Player
  static RemovePlayer(socket) {
    //Removing the player from the list to remember
    for (let i = 0; i < NetworkingPlayers.PlayersToRemember.length; i++) {
      if (
        NetworkingPlayers.PlayersToRemember[i].id ===
        NetworkingPlayers.Players[socket.id].id
      ) {
        NetworkingPlayers.PlayersToRemember.splice(i, 1);
      }
    }

    //Telling the other clients to stop doing stuff and to remove the player
    socket.broadcast.emit(
      PacketTypes.RemovePlayer,
      NetworkingPlayers.Players[socket.id]
    );
  }

  //Setting Player Position and Rotation
  static SetPlayerPosition(socket, data) {
    for (let i = 0; i < NetworkingPlayers.PlayersToRemember.length; i++) {
      if (
        NetworkingPlayers.PlayersToRemember[i].id ===
        NetworkingPlayers.Players[socket.id].id
      ) {
        NetworkingPlayers.Players[socket.id].position = data;
        socket.broadcast.emit(PacketTypes.SetPlayerPosition, {
          id: socket.id,
          position: NetworkingPlayers.Players[socket.id].position
        });
      }
    }
  }
};
