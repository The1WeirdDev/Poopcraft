class World {
  constructor() {
    this.init();
  }

  init() {
    this.texture_id = loadTexture(gl, "texture-packs/blocks.png");

    this.mesh = new Mesh();

    /*
    let vertices = [0, 0, 0, 0, 1, 0, 1, 0, 0, 1, 1, 0];
    let indices = [0, 1, 2, 2, 1, 3];
    let texture_coords = [
      0,
      0 + 0.0625,
      0,
      0,
      0 + 0.0625,
      0 + 0.0625,
      0 + 0.0625,
      0
    ];

    this.mesh.createMesh(vertices, indices, texture_coords, 0, false);
    this.mesh.texture_id = this.texture_id;*/

    this.chunk = new Chunk(this, 0, 0);
  }
  update() {}
  draw() {
    Shaders.default_shader.start();

    //Generating Transformation Matrix
    gl.uniformMatrix4fv(
      Shaders.defaultShader_transformationMatrixLocation,
      false,
      Maths.generateTransformationMatrix(
        this.chunk.global_chunk_x,
        0,
        this.chunk.global_chunk_z
      )
    );

    this.chunk.draw();

    Shaders.default_shader.stop();
  }
  cleanUp() {
    this.chunk.cleanUp();

    gl.bindTexture(gl.TEXTURE_2D, null);
    gl.deleteTexture(this.texture_id);
  }
}
