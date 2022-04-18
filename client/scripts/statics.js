class Statics {
  static Init() {
    Statics.canvas = document.querySelector("canvas");
    Statics.gl = Statics.canvas.getContext("webgl2", {
      premultipliedAlpha: true,
      antialias: false
    });
  }
}
