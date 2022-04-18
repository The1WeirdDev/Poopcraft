class Shaders {
  static vertexShaderData_default = `
        precision mediump float;
        attribute vec2 position;
        attribute vec2 texture_coord;
        varying vec2 _texture_coord;
        
        uniform mat4 projectionMatrix;
        uniform mat4 viewMatrix;
        uniform mat4 transformationMatrix;

        void main() {
            _texture_coord = texture_coord;
            
            gl_Position = projectionMatrix * viewMatrix * transformationMatrix * vec4(position, 0, 1);
        }
    `;

  static fragmentShaderData_default = `
        precision mediump float;
        varying vec2 _texture_coord;
        uniform sampler2D textureID;
        void main() {
            //gl_FragColor = vec4(0.5, 0.5, 0.5, 1.0);
            gl_FragColor = texture2D(textureID, _texture_coord);
        }
    `;

  static default_shader = null;

  static defaultShader_projectionMatrixLocation = null;
  static defaultShader_viewMatrixLocation = null;
  static defaultShader_transformationMatrixLocation = null;

  static Init() {
    Shaders.projectionMatrix = mat4.create();

    Shaders.default_shader = new Shader(
      Shaders.vertexShaderData_default,
      Shaders.fragmentShaderData_default
    );

    Shaders.defaultShader_projectionMatrixLocation = gl.getUniformLocation(
      Shaders.default_shader.program,
      "projectionMatrix"
    );
    Shaders.defaultShader_viewMatrixLocation = gl.getUniformLocation(
      Shaders.default_shader.program,
      "viewMatrix"
    );
    Shaders.defaultShader_transformationMatrixLocation = gl.getUniformLocation(
      Shaders.default_shader.program,
      "transformationMatrix"
    );
  }

  static CleanUp() {
    Shaders.default_shader.cleanUp();
  }
}
