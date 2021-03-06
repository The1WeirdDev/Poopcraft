class World {
  constructor() {
    this.init();
  }

  init() {
    this.texture_id = loadTexture(gl, "texture-packs/blocks.png");

    this.mesh = new Mesh();

    //Chunks
    this.chunks = [];
    this.chunks_to_receive = [];
    this.chunks_meshes_to_generate = [];
    this.chunks_to_render = [];

    let distance = 5;
    for (let x = (-distance - 1) / 2; x < distance / 2; x++) {
      for (let z = (-distance - 1) / 2; z < distance / 2; z++) {
        this.receiveChunk(Math.floor(x), Math.floor(z));
      }
    }
  }

  getChunk(x, z, sendReceivePacketIfGone = true) {
    let chunk = null;
    for (let i = 0; i < this.chunks.length; i++) {
      let _chunk = this.chunks[i];
      if (_chunk.chunk_x == x && _chunk.chunk_z == z) {
        chunk = _chunk;
        break;
      }
    }

    if (chunk == null && sendReceivePacketIfGone) {
      this.receiveChunk(x, z);
    }

    return chunk;
  }

  receiveChunk(_x, _z) {
    let shouldReceiveChunk = true;

    //Checking if chunk is already getting received
    for (let i = 0; i < this.chunks_to_receive.length; i++) {
      let _coordinates = this.chunks_to_receive[i];

      if (_coordinates.x == _x && _coordinates.z == _z) {
        shouldReceiveChunk = false;
        break;
      }
    }

    if (shouldReceiveChunk) {
      let data = { x: _x, z: _z };
      this.chunks_to_receive.push(data);

      Networking.sendPacket(PacketTypes.ReceiveChunk, data);
    }
  }

  createChunk(_x, _z, data) {
    //Just making sure chunks dont at any position that is a non integer
    let x = Math.floor(_x);
    let z = Math.floor(_z);

    for (let i = 0; i < this.chunks_to_receive.length; i++) {
      let _coordinates = this.chunks_to_receive[i];

      if (_coordinates.x == x && _coordinates.z == z) {
        this.chunks_to_receive.splice(i, 1);
        break;
      }
    }

    let should_create = true;

    for (let i = 0; i < this.chunks.length; i++) {
      let _coordinates = this.chunks[i];

      if (_coordinates.chunk_x == x && _coordinates.chunk_z == z) {
        should_create = false;
        break;
      }
    }

    if (should_create) {
      let chunk = new Chunk(this, x, z);
      chunk.block_data = data;

      //Current Chunk
      this.chunks_meshes_to_generate.push(chunk);

      this.chunks_meshes_to_generate.push(this.getChunk(x - 1, z, false));
      this.chunks_meshes_to_generate.push(this.getChunk(x + 1, z, false));
      this.chunks_meshes_to_generate.push(this.getChunk(x, z - 1, false));
      this.chunks_meshes_to_generate.push(this.getChunk(x, z + 1, false));

      this.chunks.push(chunk);
    }
  }
  update() {
    //Updating some meshes

    //console.log(this.chunks.length);
    if (this.chunks_meshes_to_generate.length > 0) {
      let chunk = this.chunks_meshes_to_generate[0];
      if (chunk != null) {
        chunk.cleanUp();
        chunk.clear();
        chunk.generateMeshData();
        chunk.generateMesh();
      }

      this.chunks_meshes_to_generate.splice(0, 1);
    }

    //Creating chunks and drawing the ones that are there

    this.chunks_to_render = [];
    let px = Math.floor(Statics.player.transform.x / Chunk.chunk_width);
    let pz = Math.floor(Statics.player.transform.z / Chunk.chunk_width);

    let distance = 2;
    for (let x = px - distance; x < px + distance; x++) {
      for (let z = pz - distance; z < pz + distance; z++) {
        let _x = Math.floor(x);
        let _z = Math.floor(z);

        let chunk = GameScreen.world.getChunk(_x, _z, true);

        //The reason we are checking if it is null is if the chunk is not found
        //It will request to get that chunk from the server
        //which will not immediatly return it
        if (chunk != null) {
          this.chunks_to_render.push(chunk);
        }
      }
    }
  }
  draw() {
    Shaders.default_shader.start();

    for (let i = 0; i < this.chunks_to_render.length; i++) {
      //Generating Transformation Matrix
      gl.uniformMatrix4fv(
        Shaders.defaultShader_transformationMatrixLocation,
        false,
        Maths.generateTransformationMatrix(
          this.chunks_to_render[i].global_chunk_x,
          0,
          this.chunks_to_render[i].global_chunk_z
        )
      );

      this.chunks_to_render[i].draw();
    }

    Shaders.default_shader.stop();
  }
  cleanUp() {
    for (let i = 0; i < this.chunks.length; i++) {
      this.chunks[i].cleanUp();
    }

    gl.bindTexture(gl.TEXTURE_2D, null);
    gl.deleteTexture(this.texture_id);
  }
}
