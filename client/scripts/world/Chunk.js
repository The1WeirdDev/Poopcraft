class Chunk {
  //Chunk Size
  static chunk_width = 20;
  static chunk_height = 100;

  //Data for calculating texture coordinates
  static TextureAtlasSizeInBlocks = 16;
  static NormalizedBlockTextureSize = 1.0 / Chunk.TextureAtlasSizeInBlocks;

  constructor(world, x, z) {
    this.world = world;
    this.init(x, z);
  }

  init(x, z) {
    //Non global for example 1,1 = 1*chunk_width,1*chunk_height
    this.chunk_x = x;
    this.chunk_z = z;

    //Global position for transformation matrixes
    this.global_chunk_x = x * Chunk.chunk_width;
    this.global_chunk_z = z * Chunk.chunk_width;

    //Mesh
    this.mesh = new Mesh();
    this.clear();

    //To make sure the chunk isnt attempted to draw if the mesh isnt made
    this.is_generated_mesh = false;
  }

  clear() {
    //Clearing Data
    this.vertices = [];
    this.indices = [];
    this.texture_coords = [];

    //Setting vertex index back to 0
    this.vertex_index = 0;
    this.rotation = 0;

    this.is_generated_mesh = false;
  }

  isBlockInChunk(x, y, z) {
    if (
      x < 0 ||
      y < 0 ||
      z < 0 ||
      x >= Chunk.chunk_width ||
      y >= Chunk.chunk_height ||
      z >= Chunk.chunk_width
    )
      return false;
    else return true;
  }

  getIndex(x, y, z) {
    let index =
      y * Chunk.chunk_width * Chunk.chunk_width + z * Chunk.chunk_width + x;
    return index;
  }

  getBlockId(x, y, z) {
    if (this.isBlockInChunk(x, y, z)) {
      return this.block_data[this.getIndex(x, y, z)];
    } else {
      return 0;
    }
  }

  getBlock(x, y, z) {
    if (this.isBlockInChunk(x, y, z)) {
      return Block.getBlockById(this.block_data[this.getIndex(x, y, z)]);
    } else {
      let chunk_pos = { px: this.chunk_x, pz: this.chunk_z };
      let bx = x;
      let by = y;
      let bz = z;

      if (x < 0) {
        chunk_pos.px--;
        bx += Chunk.chunk_width;
      } else if (x >= Chunk.chunk_width) {
        chunk_pos.px++;
        bx -= Chunk.chunk_width;
      }
      if (z < 0) {
        chunk_pos.pz--;
        bz += Chunk.chunk_width;
      } else if (z >= Chunk.chunk_width) {
        chunk_pos.pz++;
        bz -= Chunk.chunk_width;
      }

      if (by >= 0 && by < Chunk.chunk_height) {
        let chunk = this.world.getChunk(chunk_pos.px, chunk_pos.pz, false);

        if (chunk != null) {
          return chunk.getBlock(bx, by, bz);
        } else {
          return Block.Air;
        }
      } else {
        return Block.Air;
      }
    }
  }

  setBlock(x, y, z, id) {
    if (this.isBlockInChunk(x, y, z))
      this.block_data[this.getIndex(x, y, z)] = id;
  }

  generateMeshData() {
    for (let y = 0; y < Chunk.chunk_height; y++) {
      for (let x = 0; x < Chunk.chunk_width; x++) {
        for (let z = 0; z < Chunk.chunk_width; z++) {
          let block = this.getBlock(x, y, z);

          if (block.is_renderable) {
            // East / West
            if (!this.getBlock(x - 1, y, z).is_renderable)
              this.addFace(block, BlockDirections.East, x, y, z);
            if (!this.getBlock(x + 1, y, z).is_renderable)
              this.addFace(block, BlockDirections.West, x, y, z);

            // North / South
            if (!this.getBlock(x, y, z - 1).is_renderable)
              this.addFace(block, BlockDirections.South, x, y, z);
            if (!this.getBlock(x, y, z + 1).is_renderable)
              this.addFace(block, BlockDirections.North, x, y, z);

            // Up / Down
            if (!this.getBlock(x, y + 1, z).is_renderable)
              this.addFace(block, BlockDirections.Up, x, y, z);
            if (!this.getBlock(x, y - 1, z).is_renderable)
              this.addFace(block, BlockDirections.Down, x, y, z);
          }
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
    this.is_generated_mesh = true;
  }

  //Adding Mesh Data
  addFace(block, direction, x, y, z) {
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
    let texture = block.getTexture(direction);
    this.addUvs(texture);
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

  addUvs(textureID) {
    let y = Math.floor(textureID / Chunk.TextureAtlasSizeInBlocks);
    let x = textureID - y * Chunk.TextureAtlasSizeInBlocks;

    y *= Chunk.NormalizedBlockTextureSize;
    x *= Chunk.NormalizedBlockTextureSize;

    let v = 1;

    this.texture_coords.push(x);
    this.texture_coords.push(y + Chunk.NormalizedBlockTextureSize * v);
    this.texture_coords.push(x);
    this.texture_coords.push(y);
    this.texture_coords.push(x + Chunk.NormalizedBlockTextureSize * v);
    this.texture_coords.push(y + Chunk.NormalizedBlockTextureSize * v);
    this.texture_coords.push(x + Chunk.NormalizedBlockTextureSize * v);
    this.texture_coords.push(y);
  }

  draw() {
    this.mesh.draw();
  }

  cleanUp() {
    this.mesh.cleanUp();
  }
}
