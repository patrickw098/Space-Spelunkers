import Character from './characters.js';
import Player from './player.js';

class Treasure extends Character {
    constructor(options) {
        super(options);
    }

    collidedWith(otherObject) {
        if (otherObject instanceof Player) {
            this.game.remove(this);
        }
    }

    move() {

    }

    draw(ctx) {
        if (this.pos[0] >= this.game.windowMin[0] && this.pos[0] <= this.game.windowMax[0]
            && this.pos[1] <= this.game.windowMax[1] && this.pos[1] >= this.game.windowMin[1]) {
     
            let img = document.getElementById("treasure");
            ctx.drawImage(img, (this.pos[0] - this.game.player[0].pos[0]) * 100 + 312, (this.pos[1] - this.game.player[0].pos[1]) * 100 + 312, 75, 75)
        }
    }
}

export default Treasure;