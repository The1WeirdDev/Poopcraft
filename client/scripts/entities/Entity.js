class Entity {
  constructor(x, y, z, speed) {
    this.transform = new Transform(x, y, z);

    this.speed = speed;
    this.has_moved = false;
  }

  moveForwards() {
    let yaw = Maths.toRadians(this.transform.yaw);
    this.transform.x += Math.sin(yaw) * this.speed * Time.deltaTime;
    this.transform.z -= Math.cos(yaw) * this.speed * Time.deltaTime;
    this.has_moved = true;
  }

  moveBackwards() {
    let yaw = Maths.toRadians(this.transform.yaw);
    this.transform.x -= Math.sin(yaw) * this.speed * Time.deltaTime;
    this.transform.z += Math.cos(yaw) * this.speed * Time.deltaTime;
    this.has_moved = true;
  }

  moveLeft() {
    let yaw = Maths.toRadians(this.transform.yaw + 90);
    this.transform.x -= Math.sin(yaw) * this.speed * Time.deltaTime;
    this.transform.z += Math.cos(yaw) * this.speed * Time.deltaTime;
    this.has_moved = true;
  }

  moveRight() {
    let yaw = Maths.toRadians(this.transform.yaw - 90);
    this.transform.x -= Math.sin(yaw) * this.speed * Time.deltaTime;
    this.transform.z += Math.cos(yaw) * this.speed * Time.deltaTime;
    this.has_moved = true;
  }

  moveUp() {
    this.transform.y += this.speed * Time.deltaTime;
    this.has_moved = true;
  }

  moveDown() {
    this.transform.y -= this.speed * Time.deltaTime;
    this.has_moved = true;
  }
}
