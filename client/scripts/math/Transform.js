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
}
