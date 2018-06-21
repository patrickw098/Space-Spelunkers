import Character from './characters.js';
import Player from './player.js';
// import Pickaxe from './pickaxe.js';
import FlameThrower from './flame_thrower.js';



class Boss extends Character {
    constructor(options) {
        super(options);

        this.lives = 10;
        let interval = window.setInterval(this.getMove.bind(this), 700)

        window.intervals.push(interval);    
    }

    isCollidedWith(otherObject) {
        let boolean = false; 

        Boss.SIZE.forEach( (size) => {
            if ( ( size[0] + this.pos[0] ) === otherObject.pos[0] && ( size[1] + this.pos[1] ) === otherObject.pos[1] ) {
                boolean = true;
            }
        })

        return boolean;
    }

    move(move) {
        let [x, y] = this.pos;
        let [newX, newY] = move;

        if (this.checkSize(move)) {
            this.pos = [x + newX, y + newY];
            return [x + newX, y + newY];
        }
    }

    checkSize(move) {
        let boolean = true;
        let [x, y] = this.pos;
        let [newX, newY] = move; 

        for (let i = -1; i < 1; i++) {
            for (let j = 0; j <= 1; j++) {
                if ( !this.map.grid[i + x + newX][j + y + newY]) {
                    boolean = false;
                }
            }
        }

        return boolean;
    }

    collidedWith(otherObject) {
        const that = this;

        if (otherObject instanceof Player) {
            this.game.points.points -= 100;
            that.game.remove(that);
            that.game.remove(otherObject);
        } else if ( otherObject instanceof FlameThrower ) {
            this.game.remove(otherObject);
            this.game.remove(that);
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

            let img = document.getElementById("boss");
            ctx.drawImage(img, (this.pos[0] - this.game.player[0].pos[0]) * 100 + 200, (this.pos[1] - this.game.player[0].pos[1]) * 100 + 250, 200, 200)
        }
    }
}

Boss.SIZE = [
    [0, 1], [0, 0],
    [-1, 1], [-1, 0]
]

export default Boss;