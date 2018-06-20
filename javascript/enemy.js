import Character from './characters.js';
import Player from './player.js';

const DEFAULTS = {
  RADIUS: 50,
  COLOR: "red"
}

class Enemy extends Character {
  constructor(options){
    options.radius = DEFAULTS.RADIUS;
    options.color = DEFAULTS.COLOR;

    super(options);

    window.setInterval( this.getMove.bind(this), 500 )
  }

  collidedWith(otherObject) {
    const that = this;

    if ( otherObject instanceof Player) {
      that.game.remove(otherObject);
      that.game.remove(that);
    }
  }
}

export default Enemy;
