const canvas = document.querySelector("canvas");
const gl = canvas.getContext("webgl2", {
  premultipliedAlpha: true,
  antialias: false
});

canvas.oncontextmenu = function (e) {
  e.preventDefault();
};

if (gl == null) {
  alert("Webgl is not supported. Cannot start game. Try a different browser?");
}

window.onload = Start;
window.onbeforeunload = CleanUp;

document.addEventListener("keydown", function (event) {
  Statics.onKeyDown(event);
});
document.addEventListener("keyup", function (event) {
  Statics.onKeyUp(event);
});

gl.canvas.addEventListener("mouseup", (e) => {
  Statics.onMouseUp(e);
});
gl.canvas.addEventListener("mousedown", (e) => {
  Statics.onMouseDown(e);
});

canvas.onclick = function () {
  canvas.requestPointerLock();
};

function lockChangeAlert() {
  if (document.pointerLockElement === canvas) {
    document.addEventListener("mousemove", onMouseMove, false);
  } else {
    document.removeEventListener("mousemove", onMouseMove, false);
  }
}

function onMouseMove(e) {
  var movementX = e.movementX || e.mozMovementX || e.webkitMovementX || 0;
  var movementY = e.movementY || e.mozMovementY || e.webkitMovementY || 0;

  Input.mouse_pos_x += movementX;
  Input.mouse_pos_y += movementY;

  Statics.onMouseMove(Input.mouse_pos_x, Input.mouse_pos_y);
}
/*
let spx = 0;
let spy = 0;
let sx = 16 / 256;
let sy = 16 / 256;

let d = 0;
let vertices = [0, 0, d, 0, 1, d, 1, 0, d, 1, 1, d];
let indices = [0, 1, 2, 2, 1, 3];
let texture_coords = [
  spx,
  spy + sy,

  spx,
  spy,

  spx + sx,
  spy + sy,

  spx + sx,
  spy
];

let mesh = new Mesh();
*/

function Start() {
  document.addEventListener("mousemove", onMouseMove, false);
  Init();
  Draw();
}
function Init() {
  Statics.Init();
  Shaders.Init();

  Time.init();

  Screens.Init();

  Networking.connectToServer(window.location.origin);
  /*
  mesh.createMesh(
    vertices,
    indices,
    texture_coords,
    "texture-packs/blocks.png"
  );
    */
  setInterval(Update, 1000 / 144);
}
function Update() {
  Time.updateTime();
  Input.update();
  Screens.Update();
}

function Draw() {
  //Clearing the screen
  Display.prepareDisplay();

  //Generating Projection Matrix
  Shaders.projectionMatrix = Maths.generateProjectionMatrix(75, 0.01, 1000.0);

  //Binding Default Shader
  Shaders.default_shader.start();
  //Binding Projection Matrix
  gl.uniformMatrix4fv(
    Shaders.defaultShader_projectionMatrixLocation,
    false,
    Shaders.projectionMatrix
  );
  //Generating View Matrix
  gl.uniformMatrix4fv(
    Shaders.defaultShader_viewMatrixLocation,
    false,
    Maths.generateViewMatrix(Statics.player.transform)
  );
  //Unbinding Default Shader
  Shaders.default_shader.stop();

  //Drawing
  Screens.Draw();

  //Clearing the display and requesting the screen to draw again
  Display.postUpdateDisplay();
  window.requestAnimationFrame(Draw);
}
function CleanUp() {
  Screens.CleanUp();

  //Cleaning Up Shaders
  Shaders.default_shader.cleanUp();
}
