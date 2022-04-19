class Player extends Entity {
  constructor() {
    super(0, 0, 0, 4.3);
    this.init();
  }

  onMouseMove(mx, my) {
    Input.mouse_pos_x = mx;
    Input.mouse_pos_y = my;
  }

  init() {
    //Camera and models
    this.camera = new Camera(this.transform);

    //Movement
    this.shouldMoveForwards = false;
    this.shouldMoveBackwards = false;
    this.shouldMoveLeft = false;
    this.shouldMoveRight = false;
  }

  update() {
    Input.update();
    if (this.shouldMoveForwards) this.moveForwards();
    if (this.shouldMoveBackwards) this.moveBackwards();
    if (this.shouldMoveLeft) this.moveLeft();
    if (this.shouldMoveRight) this.moveRight();
    let rotate_speed = 5;
    this.transform.rotate(
      0,
      Input.mouse_direction_x * Time.deltaTime * rotate_speed,
      0
    );
    console.log(this.transform.pitch);
    //this.transform.pitch +=
    //  Input.mouse_direction_y * Time.deltaTime * rotate_speed;

    //console.log(this.transform.pitch);
    // this.transform.pitch = Maths.clamp(this.transform.pitch, -90, 90);
  }

  draw() {}

  cleanUp() {}
}
