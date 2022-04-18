window.onload = Start;
window.onbeforeunload = CleanUp;

function Start() {
  Init();
}
function Init() {
  document.querySelector("h1").innerHTML = "BALLS";
  setInterval(Update, 1000 / 60);
}
function Update() {}
function Draw() {}
function CleanUp() {}
