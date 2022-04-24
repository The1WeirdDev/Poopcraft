const BlockDirections = {
  Up: "up",
  Down: "down",

  North: "north",
  South: "south",

  East: "east",
  West: "west"
};

class Block {
  static blocks = [];
  static amount_of_blocks = 0;
  //Could use blocks.length but i dont feel like it

  static getBlockById(i) {
    if (i < 0 || i >= Block.amount_of_blocks) return Block.Air;
    else return Block.blocks[i];
  }

  constructor(
    name,

    texture_top,
    texture_bottom,
    texture_left,
    texture_right,
    texture_front,
    texture_back,

    is_collidable,
    is_renderable
  ) {
    this.name = name;

    this.is_collidable = is_collidable;
    this.is_renderable = is_renderable;

    this.texture_top = texture_top;
    this.texture_bottom = texture_bottom;
    this.texture_left = texture_left;
    this.texture_right = texture_right;
    this.texture_front = texture_front;
    this.texture_back = texture_back;

    this.block_id = Block.amount_of_blocks;
    Block.amount_of_blocks++;

    Block.blocks.push(this);
  }

  static Init() {
    Block.Air = new Block("air", 0, 0, 0, 0, 0, 0, false, false);
    Block.Grass = new Block("grass", 13, 1, 0, 0, 0, 0, true, true);
  }

  getTexture(direction) {
    if (direction == BlockDirections.Up) return this.texture_top;
    else if (direction == BlockDirections.Down) return this.texture_bottom;
    else if (direction == BlockDirections.East) return this.texture_left;
    else if (direction == BlockDirections.West) return this.texture_right;
    else if (direction == BlockDirections.North) return this.texture_front;
    else if (direction == BlockDirections.South) return this.texture_back;
    else return 0;
  }
}
