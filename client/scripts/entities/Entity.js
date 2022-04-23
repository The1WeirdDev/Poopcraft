class Entity {
  constructor(x, y, z, speed) {
    this.transform = new Transform(x, y, z);

    this.speed = speed;
  }

  moveForwards() {
    let yaw = Maths.toRadians(this.transform.yaw);
    this.transform.x += Math.sin(yaw) * this.speed * Time.deltaTime;
    this.transform.z -= Math.cos(yaw) * this.speed * Time.deltaTime;
  }

  moveBackwards() {
    let yaw = Maths.toRadians(this.transform.yaw);
    this.transform.x -= Math.sin(yaw) * this.speed * Time.deltaTime;
    this.transform.z += Math.cos(yaw) * this.speed * Time.deltaTime;
  }

  moveLeft() {
    let yaw = Maths.toRadians(this.transform.yaw + 90);
    this.transform.x -= Math.sin(yaw) * this.speed * Time.deltaTime;
    this.transform.z += Math.cos(yaw) * this.speed * Time.deltaTime;
  }

  moveRight() {
    let yaw = Maths.toRadians(this.transform.yaw - 90);
    this.transform.x -= Math.sin(yaw) * this.speed * Time.deltaTime;
    this.transform.z += Math.cos(yaw) * this.speed * Time.deltaTime;
  }

  moveUp() {
    this.transform.y += this.speed * Time.deltaTime;
  }

  moveDown() {
    this.transform.y -= this.speed * Time.deltaTime;
  }
}
