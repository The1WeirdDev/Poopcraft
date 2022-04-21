module.exports = class Chunk {
  static chunk_width = 20;
  static chunk_height = 100;

  constructor(x, z) {
    this.global_chunk_x = x * Chunk.chunk_width;
    this.global_chunk_z = z * Chunk.chunk_width;

    this.chunk_data = new Array(
      Chunk.chunk_width * Chunk.chunk_width * Chunk.chunk_height
    );

    this.generateBlockData();
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

  setBlock(x, y, z, id) {
    this.chunk_data[y * Chunk.chunk_height + x * Chunk.chunk_width + z] = id;
  }
  getBlock(x, y, z) {
    let block = this.chunk_data[
      y * Chunk.chunk_height + x * Chunk.chunk_width + z
    ];
    return block;
  }

  generateBlockData() {
    for (let y = 0; y < Chunk.chunk_height; y++) {
      for (let x = 0; x < Chunk.chunk_width; x++) {
        for (let z = 0; z < Chunk.chunk_width; z++) {
          if (y <= 20) this.setBlock(x, y, z, 1);
          else this.setBlock(x, y, z, 0);
        }
      }
    }
  }
};
