import Character from './characters.js';

const DEFAULTS = {
  RADIUS: 50,
  COLOR: "red"
}

class Enemy extends Character {
  constructor(options){
    options.radius = DEFAULTS.RADIUS;
    options.color = DEFAULTS.COLOR;
    
    super(options);
  }
}

export default Enemy;
