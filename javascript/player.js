import Character from './characters.js';

const DEFAULTS = {
  RADIUS: 50,
  COLOR: "green"
}

class Player extends Character {
  constructor(options = {}) {
    options.radius = DEFAULTS.RADIUS;
    options.color = DEFAULTS.COLOR;

    super(options);
  }

  draw(ctx) {
    let linkFront = document.getElementById("link-front");
    let linkBack = document.getElementById("link-back");
    let linkLeft = document.getElementById("link-left");
    let linkRight = document.getElementById("link-right");
    // ctx.beginPath();
    // ctx.fillStyle = this.color;
    // ctx.fillRect(312, 312, 75, 75);
    // ctx.fill();

    let [x,y] = this.pos;

    let tile = document.getElementsByClassName(`player`)[0];
    if ( tile !== undefined ) tile.classList.remove("player");
    let newTile = document.getElementsByClassName(`square-${x}-${y}`)[0];
    if ( newTile !== undefined ) newTile.classList.add("player");

    if ( this.game.viewport.toString() === "0,1" ) {
      ctx.drawImage(linkFront, 312, 312, 75, 75);
    } else if ( this.game.viewport.toString() === "1,0" ) {
      ctx.drawImage(linkRight, 312, 312, 75, 75);
    } else if ( this.game.viewport.toString() === "-1,0" ) {
      ctx.drawImage(linkLeft, 312, 312, 75, 75);
    } else {
      ctx.drawImage(linkBack, 312, 312, 75, 75);
    }

  }

  move(move) {
    let [x,y] = this.pos;
    let [newX, newY] = move;

    if ( this.map.grid[x + newX] && this.map.grid[x + newX][y + newY] ) {
      this.pos = [x + newX, y + newY];
      // let tile = document.getElementsByClassName(`player`)[0];
      // tile.classList.remove("player");
      // let newTile = document.getElementsByClassName(`square-${x+newX}-${y+newY}`)[0];
      // newTile.classList.add("player");
      
      return [x + newX, y + newY];
    }
  }

  collidedWith(otherObject) {
    // if (otherObject instanceof Enemy) {
    //   this.remove();
    //   return true;
    // } else if ( otherObject instance of Laser ) {
    //   this.remove();
    //   otherObject.remove();
    //   return true;
    // }
    //
    // return false;
  }
}

export default Player;
