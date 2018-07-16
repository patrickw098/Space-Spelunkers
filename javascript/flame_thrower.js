import Weapon from './weapons.js';

class FlameThrower extends Weapon {
  constructor(options) {

    super(options);

    this.removeSelf();
  }

  draw(ctx) {
    let img = document.getElementById("flame");

    if ( this.game.map.grid[this.pos[0]] && this.game.map.grid[this.pos[0]][this.pos[1]] ) {
      ctx.drawImage(img, (this.pos[0] - this.game.player[0].pos[0]) * 100 + 300, (this.pos[1] - this.game.player[0].pos[1]) * 100 + 300, 75, 75)
    }
  }

  removeSelf() {
    const that = this;

    window.setTimeout(() => {
      that.game.remove(that);
    }, 1000 )
  }
}

export default FlameThrower;
