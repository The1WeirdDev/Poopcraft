let Chunk = require("./Chunk.js");

module.exports = class World {
  constructor() {
    this.init();
  }

  init() {
    this.chunks = [];
  }

  getChunk(x, z, createIfNot = true) {
    let chunk = null;

    for (let i = 0; i < this.chunks.length; i++) {
      let _chunk = this.chunks[i];

      if (_chunk.chunk_x == x && _chunk.chunk_z == z) chunk = _chunk;
    }

    if (chunk != null) {
      return chunk;
    } else if (createIfNot) {
      return this.createChunk(x, z);
    } else {
      return null;
    }
  }

  createChunk(x, z) {
    let chunk = new Chunk(this, x, z);

    chunk.generateBlockData();

    this.chunks.push(chunk);
    return chunk;
  }
  update() {}
};
