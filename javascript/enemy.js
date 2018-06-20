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

    window.setInterval( this.getMove.bind(this), 400 )
  }

  collidedWith(otherObject) {
    const that = this;

    if ( otherObject instanceof Player) {
      that.game.remove(otherObject);
      that.game.remove(that);
    }
  }

  draw(ctx) {
    // if ( this.pos[0] >= this.game.windowMin[0]-1 && this.pos[0] <= this.game.windowMax[0]+1
    //   && this.pos[1] <= this.game.windowMax[1]+1 && this.pos[1] >= this.game.windowMin[1]-1 ) {
    //     this.getMove();
    // }

    if (this.pos[0] >= this.game.windowMin[0] && this.pos[0] <= this.game.windowMax[0]
      && this.pos[1] <= this.game.windowMax[1] && this.pos[1] >= this.game.windowMin[1]) {
      // ctx.beginPath();
      // ctx.fillStyle = this.color;
      // ctx.fillRect((this.pos[0] - this.game.player[0].pos[0]) * 100 + 300, (this.pos[1] - this.game.player[0].pos[1]) * 100 + 300, 75, 75);
      // ctx.fill();

      let img = document.getElementById("monster");
      ctx.drawImage(img, (this.pos[0] - this.game.player[0].pos[0]) * 100 + 300, (this.pos[1] - this.game.player[0].pos[1]) * 100 + 300, 75, 75)
    }
  }
}

export default Enemy;
