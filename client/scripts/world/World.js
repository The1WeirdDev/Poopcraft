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
      }
    }

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
  update() {
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
  }
  draw() {
    Shaders.default_shader.start();

    for (let i = 0; i < this.chunks.length; i++) {
      //Generating Transformation Matrix
      gl.uniformMatrix4fv(
        Shaders.defaultShader_transformationMatrixLocation,
        false,
        Maths.generateTransformationMatrix(
          this.chunks[i].global_chunk_x,
          0,
          this.chunks[i].global_chunk_z
        )
      );

      this.chunks[i].draw();
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
