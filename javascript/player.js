import Character from './characters.js';

const DEFAULTS = {
  RADIUS: 16
}

class Player extends Character {
  constructor(options = {}) {
    debugger;
    options.radius = DEFAULTS.RADIUS;

    super(options);
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
