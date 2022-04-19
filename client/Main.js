const canvas = document.querySelector("canvas");
const gl = canvas.getContext("webgl2", {
  premultipliedAlpha: true,
  antialias: false
});

canvas.oncontextmenu = function (e) {
  e.preventDefault();
};

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
    //console.log("The pointer lock status is now locked");
    document.addEventListener("mousemove", onMouseMove, false);
  } else {
    //console.log("The pointer lock status is now unlocked");
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
function Start() {
  document.addEventListener("mousemove", onMouseMove, false);
  Init();
  Draw();
}
function Init() {
  Statics.Init();
  Shaders.Init();

  Time.init();

  Networking.connectToServer(window.location.origin);

  mesh.createMesh(
    vertices,
    indices,
    texture_coords,
    "texture-packs/blocks.png"
  );

  setInterval(Update, 1000 / 144);
}
function Update() {
  Time.updateTime();

  Input.update();
  Statics.player.update();
}

let transform = new Transform(0, 0, -5);
function Draw() {
  Display.prepareDisplay();

  Shaders.default_shader.start();
  //Generating Projection Matrix
  gl.uniformMatrix4fv(
    Shaders.defaultShader_projectionMatrixLocation,
    false,
    Maths.generateProjectionMatrix(90, 0.01, 1000.0)
  );

  //Generating View Matrix
  gl.uniformMatrix4fv(
    Shaders.defaultShader_viewMatrixLocation,
    false,
    Maths.generateViewMatrix(Statics.player.transform)
  );

  //Generating Transformation Matrix
  //transform.yaw = 50;

  gl.uniformMatrix4fv(
    Shaders.defaultShader_transformationMatrixLocation,
    false,
    Maths.generateTransformationMatrix(transform)
  );

  //Drawing
  mesh.draw();
  Shaders.default_shader.stop();

  Display.postUpdateDisplay();
  window.requestAnimationFrame(Draw);
}
function CleanUp() {
  mesh.cleanUp();
}
