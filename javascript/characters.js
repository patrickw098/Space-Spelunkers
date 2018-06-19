class Character {
  constructor(options) {
    this.pos = options.pos;
    this.game = options.game;
    this.radius = options.radius;
    this.color = options.color;
    this.map = options.map;
  }

  isCollidedWith(otherObject) {
    return this.pos === otherObject.pos
  }

  remove() {
    this.game.remove(this);
  }

  move(move) {
    let [x,y] = this.pos;
    let [newX, newY] = move;

    if ( this.map.grid[x + newX][y + newY] ) {
      this.pos = [x + newX, y + newY];
      console.log(this.pos);
      return [x + newX, y + newY];
    } else {
      console.log("invalid move");
    }
  }

  draw(ctx) {
    if ( this.pos[0] >= this.game.window[0] && this.pos[0] < this.game.window[1] && this.pos[1] <= this.game.window[1] && this.pos[1] > this.game.window[0] ) {
      console.log("enemy", this.pos, this.game.window)
      ctx.beginPath();
      ctx.fillStyle = this.color;
      ctx.fillRect((this.pos[0] - this.game.player[0].pos[0]) * 100 + 300, (this.pos[1] - this.game.player[0].pos[1]) * 100 + 300, 75, 75);
      ctx.fill();
    }
  }
}

export default Character;
