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

    //Connections
    socket.on(PacketTypes.Connected, Networking.onConnect);
    socket.on(PacketTypes.Disconnect, Networking.onDisconnect);

    //Players
    socket.on(PacketTypes.ReceivePlayers, NetworkingPlayers.ReceivePlayers);
    socket.on(PacketTypes.AddPlayer, NetworkingPlayers.AddPlayer);
    socket.on(PacketTypes.RemovePlayer, NetworkingPlayers.RemovePlayer);

    //Player Changes
    socket.on(
      PacketTypes.SetPlayerPosition,
      NetworkingPlayers.SetPlayerPosition
    );

    //World
    socket.on(PacketTypes.ReceiveChunk, WorldNetworking.onReceiveChunk);
  }

  static onConnect() {
    console.log("Connected to server");
    Networking.is_connected = true;

    Networking.sendPacket(PacketTypes.ReceivePlayers);
  }
  static onDisconnect() {
    console.log("Disconnected from server");
    Networking.is_connected = false;
    window.location.reload();
  }

  static sendPacket(type, data) {
    if (Networking.server_socket != null)
      Networking.server_socket.emit(type, data);
  }
}
