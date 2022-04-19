class Entity {
  constructor(x, y, z, speed) {
    this.transform = new Transform(0, 0, 0);

    this.speed = speed;
  }

  moveForwards() {
    let angle = Maths.toRadians(this.transform.yaw);
    this.transform.x += Math.sin(angle) * this.speed * Time.deltaTime;
    this.transform.z -= Math.cos(angle) * this.speed * Time.deltaTime;
  }

  moveBackwards() {
    let angle = Maths.toRadians(this.transform.yaw);
    this.transform.x -= Math.sin(angle) * this.speed * Time.deltaTime;
    this.transform.z += Math.cos(angle) * this.speed * Time.deltaTime;
  }

  moveLeft() {
    let angle = Maths.toRadians(this.transform.yaw + 90);
    this.transform.x -= Math.sin(angle) * this.speed * Time.deltaTime;
    this.transform.z += Math.cos(angle) * this.speed * Time.deltaTime;
  }

  moveRight() {
    let angle = Maths.toRadians(this.transform.yaw - 90);
    this.transform.x -= Math.sin(angle) * this.speed * Time.deltaTime;
    this.transform.z += Math.cos(angle) * this.speed * Time.deltaTime;
  }
}
