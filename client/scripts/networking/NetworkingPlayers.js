class NetworkingPlayers {
  static Players = [];

  static ReceivePlayers(data) {
    for (let i = 0; i < data.length; i++) {
      let p = data[i];

      if (p != null) {
        NetworkingPlayers.AddPlayer(p);
      }
    }
  }
  static AddPlayer(data) {
    if (data.id == Networking.server_socket.id) return;

    console.log("adding player");
    console.log(data);

    let vertices = [
      //Front
      0,
      0,
      0,

      0,
      1,
      0,

      1,
      0,
      0,

      1,
      1,
      0,
      //Back
      0,
      0,
      -1,

      1,
      0,
      -1,

      0,
      1,
      -1,

      1,
      1,
      -1,

      //Top
      0,
      1,
      0,

      0,
      1,
      -1,

      1,
      1,
      0,

      1,
      1,
      -1,

      //Bottom
      0,
      0,
      0,

      1,
      0,
      0,

      0,
      0,
      -1,

      1,
      0,
      -1,

      //Left
      0,
      0,
      0,

      0,
      0,
      -1,

      0,
      1,
      0,

      0,
      1,
      -1,

      //Right
      1,
      0,
      0,

      1,
      1,
      0,

      1,
      0,
      -1,

      1,
      1,
      -1

      /*
      0,0,0,
      0,0,0,
      0,0,0,
      0,0,0,
      */
    ];
    let indices = [
      0,
      1,
      2,
      2,
      1,
      3,
      4,
      5,
      6,
      6,
      5,
      7,
      8,
      9,
      10,
      10,
      9,
      11,
      12,
      13,
      14,
      14,
      13,
      15,
      16,
      17,
      18,
      18,
      17,
      19,
      20,
      21,
      22,
      22,
      21,
      23
    ];

    let texture_coords = [
      0,
      0,
      1,
      0,
      0,
      1,
      1,
      1,
      0,
      0,
      1,
      0,
      0,
      1,
      1,
      1,
      0,
      0,
      1,
      0,
      0,
      1,
      1,
      1,
      0,
      0,
      1,
      0,
      0,
      1,
      1,
      1,
      0,
      0,
      1,
      0,
      0,
      1,
      1,
      1,
      0,
      0,
      1,
      0,
      0,
      1,
      1,
      1
    ];

    NetworkingPlayers.Players.push(data);
    let player = NetworkingPlayers.Players.length - 1;
    NetworkingPlayers.Players[player].mesh = new Mesh();
    NetworkingPlayers.Players[player].mesh.createMesh(
      vertices,
      indices,
      texture_coords,
      "FSDF",
      true
    );
  }
  static RemovePlayer(data) {
    console.log("removing player");
    console.log(data);

    for (let i = 0; i < NetworkingPlayers.Players.length; i++) {
      let player = NetworkingPlayers.Players[i];

      if (player.id == data.id) NetworkingPlayers.Players.splice(i);
    }
  }
  static SetPlayerPosition(data) {
    for (let i = 0; i < NetworkingPlayers.Players.length; i++) {
      let player = NetworkingPlayers.Players[i];

      if (player.id == data.id) {
        player.position = data.position;
      }
    }
  }
  static SetPlayerRotation(data) {
    for (let i = 0; i < NetworkingPlayers.Players.length; i++) {
      let player = NetworkingPlayers.Players[i];

      if (player.id == data.id) {
        player.rotation = data;
      }
    }
  }

  static Init() {}
  static Update() {}
  static Draw() {
    Shaders.default_shader.start();
    for (let i = 0; i < NetworkingPlayers.Players.length; i++) {
      let player = NetworkingPlayers.Players[i];

      gl.uniformMatrix4fv(
        Shaders.defaultShader_transformationMatrixLocation,
        false,
        Maths.generateTransformationMatrix(
          player.position[0],
          player.position[1],
          player.position[2],
          player.rotation[0],
          player.rotation[1],
          player.rotation[2]
        )
      );
      player.mesh.draw();
    }
    Shaders.default_shader.stop();
  }
  static CleanUp() {
    for (let i = 0; i < NetworkingPlayers.Players.length; i++) {
      let player = NetworkingPlayers.Players[i];

      player.mesh.cleanUp();
    }
  }
}
