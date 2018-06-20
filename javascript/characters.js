import Game from './game.js';

class Character {
  constructor(options) {
    this.pos = options.pos;
    this.game = options.game;
    this.radius = options.radius;
    this.color = options.color;
    this.map = options.map;
  }

  isCollidedWith(otherObject) {
    return ( this.pos.toString() === otherObject.pos.toString() )
  }

  collidedWith(otherObject) {

  }

  remove() {
    this.game.remove(this);
  }

  move(move) {
    let [x,y] = this.pos;
    let [newX, newY] = move;

    if ( this.map.grid[x + newX] && this.map.grid[x + newX][y + newY] ) {
      this.pos = [x + newX, y + newY];
      return [x + newX, y + newY];
    }
  }

  draw(ctx) {
    // if ( this.pos[0] >= this.game.windowMin[0]-1 && this.pos[0] <= this.game.windowMax[0]+1
    //   && this.pos[1] <= this.game.windowMax[1]+1 && this.pos[1] >= this.game.windowMin[1]-1 ) {
    //     this.getMove();
    // }

    if ( this.pos[0] >= this.game.windowMin[0] && this.pos[0] <= this.game.windowMax[0]
      && this.pos[1] <= this.game.windowMax[1] && this.pos[1] >= this.game.windowMin[1] ) {
      // ctx.beginPath();
      // ctx.fillStyle = this.color;
      // ctx.fillRect((this.pos[0] - this.game.player[0].pos[0]) * 100 + 300, (this.pos[1] - this.game.player[0].pos[1]) * 100 + 300, 75, 75);
      // ctx.fill();
      
      let img = document.getElementById("rock");
      ctx.drawImage(img, (this.pos[0] - this.game.player[0].pos[0]) * 100 + 300, (this.pos[1] - this.game.player[0].pos[1]) * 100 + 300, 75, 75)
    }    
  }

  getMove() {
    let moves = Object.keys(Game.MOVES);
    let index = Math.floor(Math.random() * moves.length);
    let move = Game.MOVES[moves[index]];

    this.move(move)
  }
}

export default Character;
