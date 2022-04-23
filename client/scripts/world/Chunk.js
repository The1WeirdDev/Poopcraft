class Chunk {
  static chunk_width = 20;
  static chunk_height = 20;

  constructor(world, x, z) {
    this.world = world;
    this.init(x, z);
  }

  init(x, z) {
    this.global_chunk_x = x * Chunk.chunk_width;
    this.global_chunk_z = z * Chunk.chunk_width;

    this.mesh = new Mesh();

    this.clear();

    this.generateMeshData();
    this.generateMesh();
  }

  clear() {
    //Clearing Data
    this.vertices = [];
    this.indices = [];
    this.texture_coords = [];

    //Setting vertex index back to 0
    this.vertex_index = 0;
  }

  generateMeshData() {
    for (let y = 0; y < Chunk.chunk_height; y++) {
      for (let x = 0; x < Chunk.chunk_width; x++) {
        for (let z = 0; z < Chunk.chunk_width; z++) {
          // East / West
          if (x == 0) this.addFace(x, y, z, BlockDirections.East);
          else if (x == Chunk.chunk_width - 1)
            this.addFace(x, y, z, BlockDirections.West);

          // North / South
          if (z == 0) this.addFace(x, y, z, BlockDirections.South);
          else if (z == Chunk.chunk_width - 1)
            this.addFace(x, y, z, BlockDirections.North);

          // Up / Down
          if (y == 0) this.addFace(x, y, z, BlockDirections.Down);
          else if (y == Chunk.chunk_height - 1)
            this.addFace(x, y, z, BlockDirections.Up);
        }
      }
    }
  }

  generateMesh() {
    this.mesh.createMesh(
      this.vertices,
      this.indices,
      this.texture_coords,
      0,
      false
    );
    this.mesh.texture_id = this.world.texture_id;
  }

  //Adding Mesh Data
  addFace(x, y, z, direction) {
    //Adding Vertices
    if (direction === BlockDirections.Up) {
      this.addVertex(x + 1, y + 1, z);

      this.addVertex(x + 1, y + 1, z + 1);
      this.addVertex(x, y + 1, z);

      this.addVertex(x, y + 1, z + 1);
    } else if (direction === BlockDirections.Down) {
      this.addVertex(x, y, z);

      this.addVertex(x, y, z + 1);
      this.addVertex(x + 1, y, z);

      this.addVertex(x + 1, y, z + 1);
    } else if (direction === BlockDirections.East) {
      this.addVertex(x, y, z);

      this.addVertex(x, y + 1, z);
      this.addVertex(x, y, z + 1);

      this.addVertex(x, y + 1, z + 1);
    } else if (direction === BlockDirections.West) {
      this.addVertex(x + 1, y, z + 1);

      this.addVertex(x + 1, y + 1, z + 1);
      this.addVertex(x + 1, y, z);

      this.addVertex(x + 1, y + 1, z);
    } else if (direction === BlockDirections.North) {
      this.addVertex(x, y, z + 1);
      this.addVertex(x, y + 1, z + 1);
      this.addVertex(x + 1, y, z + 1);
      this.addVertex(x + 1, y + 1, z + 1);
    } else if (direction === BlockDirections.South) {
      this.addVertex(x + 1, y, z);

      this.addVertex(x + 1, y + 1, z);
      this.addVertex(x, y, z);

      this.addVertex(x, y + 1, z);
    }

    //Adding Indices
    this.addTriangle();

    //Adding Texture Coordinates
    this.addUvs();
  }

  addVertex(x, y, z) {
    //Adding the position to the vertex array
    this.vertices.push(x);
    this.vertices.push(y);
    this.vertices.push(z);
  }

  addTriangle() {
    //Adding Triangle using vertex index
    this.indices.push(this.vertex_index + 0);
    this.indices.push(this.vertex_index + 1);
    this.indices.push(this.vertex_index + 2);
    this.indices.push(this.vertex_index + 2);
    this.indices.push(this.vertex_index + 1);
    this.indices.push(this.vertex_index + 3);

    //Increasing vertex index
    this.vertex_index += 4;
  }

  addUvs() {
    this.texture_coords.push(0);
    this.texture_coords.push(0 + 0.0625);
    this.texture_coords.push(0);
    this.texture_coords.push(0);
    this.texture_coords.push(0 + 0.0625);
    this.texture_coords.push(0 + 0.0625);
    this.texture_coords.push(0 + 0.0625);
    this.texture_coords.push(0);
  }

  draw() {
    this.mesh.draw();
  }

  cleanUp() {
    this.mesh.cleanUp();
  }
}
