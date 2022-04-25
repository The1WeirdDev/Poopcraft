module.exports = class Chunk {
  static chunk_width = 20;
  static chunk_height = 100;

  constructor(world, x, z) {
    this.world = world;
    this.init(x, z);
  }

  init(x, z) {
    this.chunk_x = x;
    this.chunk_z = z;

    this.global_chunk_x = x * Chunk.chunk_width;
    this.global_chunk_z = z * Chunk.chunk_width;

    this.chunk_data = new Array(
      Chunk.chunk_width * Chunk.chunk_width * Chunk.chunk_height
    );
  }

  isBlockInChunk(x, y, z) {
    if (
      x < 0 ||
      x >= Chunk.chunk_width ||
      z < 0 ||
      z >= Chunk.chunk_width ||
      y < 0 ||
      y >= Chunk.chunk_height
    )
      return false;
    else return true;
  }

  getIndex(x, y, z) {
    let index =
      y * Chunk.chunk_width * Chunk.chunk_width + z * Chunk.chunk_width + x;
    return index;
  }

  setBlock(x, y, z, id) {
    this.chunk_data[this.getIndex(x, y, z)] = id;
  }
  getBlock(x, y, z) {
    let block = this.chunk_data[this.getIndex(x, y, z)];
    return block;
  }

  generateBlockData() {
    for (let y = 0; y < Chunk.chunk_height; y++) {
      for (let x = 0; x < Chunk.chunk_width; x++) {
        for (let z = 0; z < Chunk.chunk_width; z++) {
          this.setBlock(
            x,
            y,
            z,
            this.world.getBlockId(
              x + this.global_chunk_x,
              y,
              z + this.global_chunk_z
            )
          );
        }
      }
    }
  }
};
