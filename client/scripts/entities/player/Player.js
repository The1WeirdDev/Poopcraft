class Player {
  constructor() {
    this.init();
  }

  init() {
    //Camera and models
    this.transform = new Transform(0, 0, 0);
    this.camera = new Camera(this.transform);
  }

  update() {
    //this.transform.x += 0.05 * Time.deltaTime;
  }

  draw() {}

  cleanUp() {}
}
