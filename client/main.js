window.onload = Start;
window.onbeforeunload = CleanUp;

let vertices = [0, 0, 0, 1, 1, 0, 1, 1];
let indices = [0, 1, 2, 2, 1, 3];
let texture_coords = [1, 1, 1, 0, 0, 1, 0, 0];

let mesh = new Mesh();
mesh.createMesh(vertices, indices, texture_coords, "texture-packs/blocks.png");

function Start() {
  Init();
  Draw();
}
function Init() {
  Statics.Init();
  setInterval(Update, 1000 / 60);
}
function Update() {}
function Draw() {
  Display.prepareDisplay();

  mesh.draw();

  Display.postUpdateDisplay();
  window.requestAnimationFrame(Draw);
}
function CleanUp() {
  mesh.cleanUp();
}
