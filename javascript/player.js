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
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.fillRect(312, 312, 75, 75);
    ctx.fill();
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
