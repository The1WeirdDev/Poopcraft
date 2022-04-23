//So i dont have to retype and can easily change stuff
let NetworkingTypes = require("./NetworkingTypes.js");

//Server Networking
module.exports = class Networking {
  static Players = [];
  static PlayersToRemember = [];

  static Init() {}

  static onSocketConnect(socket) {
    Networking.onConnected(socket);

    socket.on(NetworkingTypes.Disconnect, () => {
      Networking.onDisconnect(socket);
    });
  }

  static AddPlayer(socket) {
    //Creating Player Object
    Networking.Players[socket.id] = {
      id: Networking.generateUUID(),
      name: null,
      position: [0, 0, 0],
      mesh: null
    };

    //Making Sure we remember the player is in
    Networking.PlayersToRemember.push(Networking.Players[socket.id]);

    //Tell the other clients to add the player to their drawing list
    socket.broadcast.emit(
      NetworkingTypes.AddPlayer,
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
    socket.broadcast.emit(
      NetworkingTypes.RemovePlayer,
      Networking.Players[socket.id]
    );
  }

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

  static generateUUID() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (
      c
    ) {
      var r = (Math.random() * 16) | 0,
        v = c == "x" ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }
};
