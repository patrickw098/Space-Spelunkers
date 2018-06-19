import Enemy from './enemy.js';
import Player from './player.js';

class Weapon {
  constructor(options) {
    this.spread = options.spread;
    this.player = options.player;
    this.pos = options.pos;
    this.image = options.image;
    this.game = options.game;
  }

  isCollidedWith(otherObject) {
    return ( this.pos.toString() === otherObject.pos.toString() )
  }

  draw(ctx) {

  }

  collidedWith(otherObject) {
    if ( otherObject instanceof Enemy ) {
      this.game.remove(otherObject);
      this.game.remove(this);
    } else if ( otherObject instanceof Player ) {
      this.game.remove(otherObject);
    }
  }
}

export default Weapon;
