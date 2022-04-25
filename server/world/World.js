//World Generation
let SimplexNoise = require("simplex-noise");
let Chunk = require("./Chunk.js");

module.exports = class World {
  constructor() {
    this.init();
  }

  init() {
    this.chunks = [];

    this.seed = Math.random();
    this.simplex = new SimplexNoise(this.seed);
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

  getNoise(x, y) {
    let perlin = this.simplex.noise2D(x, y);
    return perlin;
  }

  getHeight(x, z) {
    let smoothness = 30;
    let perlin = this.getNoise((x + 0.1) / smoothness, (z + 0.1) / smoothness);

    let height = Math.floor(perlin * 5) + 10;
    return height;
  }

  getBlockId(x, y, z) {
    let id = 0;
    if (y < this.getHeight(x, z)) id = 1;

    return id;
  }
};
