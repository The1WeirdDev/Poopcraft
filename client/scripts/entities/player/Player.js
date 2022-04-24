class Player extends Entity {
  constructor() {
    super(15, 50, 15, 4.3);
    this.init();
  }

  init() {
    //Camera and models
    this.camera = new Camera(this.transform);

    //Mouse
    this.mouse_speed = 10;
    this.mouse_yaw = 2;

    this.transform.yaw = 180;
  }

  update() {
    this.checkInput();

    let px = Math.floor(this.transform.x / Chunk.chunk_width);
    let pz = Math.floor(this.transform.z / Chunk.chunk_width);

    GameScreen.world.getChunk(px, pz, true);
  }

  checkInput() {
    if (!document.hasFocus()) return;

    if (Input.keys[87] == 1) this.moveForwards();
    else if (Input.keys[83] == 1) this.moveBackwards();
    if (Input.keys[65] == 1) this.moveLeft();
    else if (Input.keys[68] == 1) this.moveRight();
    if (Input.keys[16] == 1) this.moveDown();
    else if (Input.keys[32] == 1) this.moveUp();

    this.transform.rotate(
      0,
      Input.mouse_direction_x *
        Time.deltaTime *
        this.mouse_speed *
        this.mouse_yaw,
      0
    );
    //console.log(this.transform.pitch);
    this.transform.pitch +=
      Input.mouse_direction_y *
      Time.deltaTime *
      this.mouse_speed *
      this.mouse_yaw;

    this.transform.pitch = Maths.clamp(this.transform.pitch, -90, 90);
  }

  draw() {}

  cleanUp() {}
}
