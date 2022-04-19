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

//gl.canvas.addEventListener("mousemove", (e) => {
// Statics.onMouseMove(e);
//});

canvas.onclick = function () {
  canvas.requestPointerLock();
};

document.addEventListener("pointerlockchange", lockChangeAlert, false);

function lockChangeAlert() {
  if (document.pointerLockElement === canvas) {
    console.log("The pointer lock status is now locked");
    document.addEventListener("mousemove", onMouseMove, false);
  } else {
    console.log("The pointer lock status is now unlocked");
    document.removeEventListener("mousemove", onMouseMove, false);
  }
}
let x = 0;
let y = 0;
function onMouseMove(e) {
  var movementX = e.movementX || e.mozMovementX || e.webkitMovementX || 0;

  var movementY = e.movementY || e.mozMovementY || e.webkitMovementY || 0;

  x += movementX;
  y += movementY;

  console.log(x + " " + y);
  Statics.onMouseMove(x, y);
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
  Init();
  Draw();
}
function Init() {
  Statics.Init();
  Shaders.Init();

  Time.init();
  setInterval(Update, 1000 / 60);

  mesh.createMesh(
    vertices,
    indices,
    texture_coords,
    "texture-packs/blocks.png"
  );
}
function Update() {
  Time.updateTime();
  Statics.player.update();
}
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
  let transform = new Transform(0, 0, -5);
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
