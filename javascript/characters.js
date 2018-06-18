class Character {
  constructor(options) {
    this.pos = options.pos;
    this.game = options.game;
    this.radius = options.radius;
    this.color = options.color;
  }

  isCollidedWith(otherObject) {
    return this.pos === otherObject.pos
  }

  remove() {
    this.game.remove(this);
  }

  draw(ctx) {
    ctx.beginPath();
    // ctx.rect(
    //   this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, true
    // );
    ctx.fillStyle = this.color;
    ctx.fillRect(this.pos[0], this.pos[1], 75, 75);
    ctx.fill();
  }
}

export default Character;
