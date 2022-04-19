class Input {
  static last_mouse_pos_x = 0;
  static last_mouse_pos_y = 0;

  static mouse_pos_x = 0;
  static mouse_pos_y = 0;

  static mouse_direction_x = 0;
  static mouse_direction_y = 0;

  static update() {
    Input.mouse_direction_x = Input.mouse_pos_x - Input.last_mouse_pos_x;
    Input.mouse_direction_y = Input.mouse_pos_y - Input.last_mouse_pos_y;

    Input.last_mouse_pos_x = Input.mouse_pos_x;
    Input.last_mouse_pos_y = Input.mouse_pos_y;
  }
}
