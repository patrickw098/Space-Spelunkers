import Weapon from "./weapons.js";
import Enemy from './enemy.js';
import Player from './player.js';

class Pickaxe extends Weapon {
    constructor(options) {
        super(options);


        this.removeSelf();
        this.destroyRock(options.pos);
    }

    draw(ctx) {
        let img = document.getElementById("pickaxe");

    
        ctx.drawImage(img, (this.pos[0] - this.game.player[0].pos[0]) * 100 + 312, (this.pos[1] - this.game.player[0].pos[1]) * 100 + 312, 75, 75);
    }

    destroyRock(pos) {
        if (!this.game.map.grid[pos[0]][pos[1]]) {
            this.game.map.grid[pos[0]][pos[1]] = true;
        }
    }

    collidedWith(otherObject) {
        if (otherObject instanceof Enemy) {
            this.game.remove(otherObject);
            this.game.remove(this);
        } else if (otherObject instanceof Player) {
            this.game.remove(this);
        }
    }

    removeSelf() {
        const that = this;

        window.setTimeout(() => {
            that.game.remove(that);
        }, 100)
    }
}

export default Pickaxe;