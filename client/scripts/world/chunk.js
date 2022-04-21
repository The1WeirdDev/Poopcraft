class Chunk {
  constructor(x, z) {
    this.global_chunk_x = x * Chunk.chunk_width;
    this.global_chunk_z = z * Chunk.chunk_width;

    this.mesh = new Mesh();

    this.clear();
  }

  clear() {
    //Clearing Data
    this.vertices = [];
    this.indices = [];
    this.texture_coords = [];

    //Setting vertex index back to 0
    this.vertex_index = 0;
  }

  generateMeshData() {}
}
