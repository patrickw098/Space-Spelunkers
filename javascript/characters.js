class Character {
  constructor(options) {
    this.pos = options.pos;
    this.game = options.game;
    this.radius = options.radius;
  }

  isCollidedWith(otherObject) {
    return this.pos === otherObject.pos
  }

  remove() {
    this.game.remove(this);
  }
}

export default Character;
