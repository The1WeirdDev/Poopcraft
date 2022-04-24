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

  Statics.interval = setInterval(Update, 1000 / 144);
}
function Update() {
  Time.updateTime();
  Input.update();
  Screens.Update();
}

function Draw() {
  //Clearing the screen
  Display.prepareDisplay();

  //Binding Default Shader
  Shaders.default_shader.start();

  //Generating Projection Matrix

  if (Shaders.should_generate_projection_matrix) {
    //Creating Matrix
    Shaders.projectionMatrix = Maths.generateProjectionMatrix(90, 0.01, 1000.0);

    //Binding Projection Matrix
    gl.uniformMatrix4fv(
      Shaders.defaultShader_projectionMatrixLocation,
      false,
      Shaders.projectionMatrix
    );

    Shaders.should_generate_projection_matrix = false;
  }

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
