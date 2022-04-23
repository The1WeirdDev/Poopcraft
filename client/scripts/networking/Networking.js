//Client Networking
class Networking {
  static server_address = null;
  static is_connected = false;
  static server_socket = null;

  static connectToServer(address) {
    this.server_address = address;

    Networking.server_socket = io(address, {
      transports: ["polling", "websockets"]
    });

    //Connections
    let socket = Networking.server_socket;

    socket.on(NetworkingTypes.Connected, Networking.onConnect);
    socket.on(NetworkingTypes.Disconnect, Networking.onDisconnect);

    socket.on(NetworkingTypes.AddPlayer, Networking.AddPlayer);
    socket.on(NetworkingTypes.RemovePlayer, Networking.RemovePlayer);
    socket.on(NetworkingTypes.SetPlayerPosition, Networking.SetPlayerPosition);
  }

  static AddPlayer(data) {
    console.log("adding player");
    console.log(data);
  }
  static RemovePlayer(data) {
    console.log("removing player");
    console.log(data);
  }
  static SetPlayerPosition(data) {}

  static onConnect() {
    console.log("Connected to server");
  }
  static onDisconnect() {
    console.log("Disconnected from server");
    window.location.reload();
  }
}
