class Transform {
  constructor(x, y, z) {
    //Position
    this.x = x;
    this.y = y;
    this.z = z;

    //Rotation
    this.roll = 0;
    this.yaw = 0;
    this.pitch = 0;

    //Scale
    this.scale_x = 1;
    this.scale_y = 1;
    this.scale_z = 1;
  }

  rotate(x, y, z) {
    this.roll += x;
    this.yaw += y;
    this.pitch += z;

    //if (this.roll < 0) this.roll += 360;
    //if (this.roll > 360) this.roll -= 360;

    //if (this.yaw < 0) this.yaw += 360;
    //if (this.yaw > 360) this.yaw -= 360;

    //if (this.pitch < 0) this.pitch += 360;
    //if (this.pitch > 360) this.pitch -= 360;
  }
}
