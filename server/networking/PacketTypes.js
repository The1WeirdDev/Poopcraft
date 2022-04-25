module.exports = class PacketTypes {
  //Connections
  static Connected = "connect";
  static Disconnect = "disconnect";

  //Players
  static ReceivePlayers = "receive_players";
  static AddPlayer = "add_player";
  static RemovePlayer = "remove_player";

  //Player Changes
  static SetPlayerPosition = "set_player_position";
  static SetPlayerRotation = "set_player_rotation";

  //World
  static ReceiveChunk = "receive_chunk";
};
