class Maths {
  static pi = 3.14159265359;
  static radian = Maths.pi / 180;

  static toRadians(degrees) {
    return degrees * Maths.radian;
  }

  static clamp(val, min, max) {
    if (val < min) return min;
    else if (val > max) return max;
    else return val;
  }

  /*
    Matrixes
  */

  static generateProjectionMatrix(FOV, NEAR_PLANE, FAR_PLANE) {
    let aspectRatio = Display.getAspectRatio();
    let y_scale = (1.0 / Math.tan(Maths.toRadians(FOV / 2.0))) * aspectRatio;
    let x_scale = y_scale / aspectRatio;
    let frustum_length = FAR_PLANE - NEAR_PLANE;

    let projectionMatrix = mat4.create();

    projectionMatrix[0] = x_scale;
    projectionMatrix[1 * 4 + 1] = y_scale;
    projectionMatrix[2 * 4 + 2] = -((FAR_PLANE + NEAR_PLANE) / frustum_length);
    projectionMatrix[2 * 4 + 3] = -1;
    projectionMatrix[3 * 4 + 2] = -(
      (2 * NEAR_PLANE * FAR_PLANE) /
      frustum_length
    );
    projectionMatrix[3 * 4 + 3] = 0;

    return projectionMatrix;
  }

  static generateViewMatrix(transform) {
    let matrix = mat4.create();

    mat4.rotate(matrix, matrix, Maths.toRadians(transform.pitch), [1, 0, 0]);
    mat4.rotate(matrix, matrix, Maths.toRadians(transform.yaw), [0, 1, 0]);
    mat4.rotate(matrix, matrix, Maths.toRadians(transform.roll), [0, 0, 1]);
    mat4.translate(matrix, matrix, [-transform.x, -transform.y, -transform.z]);

    return matrix;
  }

  static generateTransformationMatrix(transform) {
    let matrix = mat4.create();
    mat4.translate(matrix, matrix, [transform.x, transform.y, transform.z]);
    mat4.rotate(matrix, matrix, Maths.toRadians(transform.roll), [1, 0, 0]);
    mat4.rotate(matrix, matrix, Maths.toRadians(transform.yaw), [0, 1, 0]);
    mat4.rotate(matrix, matrix, Maths.toRadians(transform.pitch), [0, 0, 1]);

    return matrix;
  }

  static generateTransformationMatrix(x, y, z) {
    let matrix = mat4.create();
    mat4.translate(matrix, matrix, [x, y, z]);

    return matrix;
  }
}
