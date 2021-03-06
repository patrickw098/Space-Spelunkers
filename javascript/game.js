import Player from './player.js';
import Enemy from './enemy.js';
import Map from './map.js';
import Rock from './rock.js';
import FlameThrower from './flame_thrower.js';
import Pickaxe from './pickaxe.js';
import Text from './text.js';
import Treasure from './treasure.js';
import Boss from './boss.js';

class Game {
  constructor(ctx, audio, options = {} ) {
    this.player = [];
    this.enemies = [];
    this.treasures = [];
    this.map = new Map(options);
    this.tiles = [];
    this.ctx = ctx;
    this.viewport = [1,0];
    this.weapons = [];
    this.rocks = [];
    this.pickaxe = [];
    this.treasures = [];
    this.enemiesNum = options.enemies;
    this.points = new Text({ points: 0 })

    this.audio = audio;
    this.audio.play();


    this.addPlayer();
    this.addEnemies();
  }

  start() {
    const that = this;
    this.bindKeyHandlers();

    // let players = document.getElementsByClassName("player");
    // for (let i = 0; i < players.length; i ++) {
    //   let player = players[i];

    //   player.classList.remove("player");
    // }
    this.animate();
  }

  end() {
    this.player.pop();
  }

  animate() {
    requestAnimationFrame(this.animate.bind(this));

    this.draw(this.ctx);
    this.checkCollisions();
  }

  add(object) {
    if ( object instanceof Player ) {
      this.player.push(object);
    } else if ( object instanceof Enemy ) {
      this.enemies.push(object);
    } else if ( object instanceof Array ) {
      this.weapons = this.weapons.concat(object);
    } else if ( object instanceof Rock ) {
      this.rocks.push(object);
    } else if ( object instanceof Pickaxe ) {
      this.pickaxe.push(object);
    } else if ( object instanceof Treasure ) {
      this.treasures.push(object);
    } else if ( object instanceof Boss ) {
      this.enemies.push(object);
    }
  }

  bindKeyHandlers() {
    const player = this.player;
    const that = this;

    window.addEventListener("keydown", (event) => {
      if ( player[0] === undefined ) {
        return;
      } else if ( Object.keys(Game.MOVES).indexOf(event.key) !== -1 ) {
        let move = Game.MOVES[event.key]
        this.viewport = move;
        if ( player[0] !== undefined ) {
          player[0].move(move);
        }
      } else if ( event.key === "f" ) {
        this.add(that.calculateFlamethrower())
      } else if ( event.key === "t" ) {
        this.add(new Pickaxe( { pos: [this.player[0].pos[0] + this.viewport[0], this.player[0].pos[1] + this.viewport[1]],
                                player: this.player,
                                game: this
                               }))
      }
    })
  }

  calculateFlamethrower() {
    let center = [this.player[0].pos[0] + this.viewport[0], this.player[0].pos[1] + this.viewport[1]];
    let left;
    let right;

    if ( this.viewport.toString() === "1,0" ) {
      left = [this.player[0].pos[0] + 1, this.player[0].pos[1] + 1];
      right = [this.player[0].pos[0] + 1, this.player[0].pos[1] - 1];
    } else if ( this.viewport.toString() === "0,1" ) {
      left = [this.player[0].pos[0] + 1, this.player[0].pos[1] + 1];
      right = [this.player[0].pos[0] - 1, this.player[0].pos[1] + 1];
    } else if ( this.viewport.toString() === "-1,0" ) {
      left = [this.player[0].pos[0] - 1, this.player[0].pos[1] + 1];
      right = [this.player[0].pos[0] - 1, this.player[0].pos[1] - 1];
    } else if ( this.viewport.toString() === "0,-1" ) {
      left = [this.player[0].pos[0] + 1, this.player[0].pos[1] - 1];
      right = [this.player[0].pos[0] - 1, this.player[0].pos[1] - 1];
    }

    return [ new FlameThrower({ pos: center, player: this.player, game: this }),
              new FlameThrower({ pos: left, player: this.player, game: this }),
               new FlameThrower({ pos: right, player: this.player, game: this })]
  }

  addPlayer() {
    const player = new Player({
      pos: this.map.startPos,
      game: this,
      map: this.map
    })

    this.add(player);

    return player;
  }

  addEnemies() {
    for (let i = 0; i < this.enemiesNum; i++) {
      this.add(new Enemy({ game: this, pos: this.map.randomPos(), map: this.map }))
    }

    this.add(new Boss({ game: this, pos: this.map.randomPos(), map: this.map }))

    for (let i = 0; i < 200; i++) {
      this.add(new Rock({ game: this, pos: this.map.randomPos(), map: this.map }))
    }

    for (let i = 0; i < 20; i++) {
      this.add(new Treasure({ game: this, pos: this.map.randomPos(), map: this.map }))
    }
  }

  draw() {
    this.ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
    this.ctx.fillStyle = Game.BG_COLOR;
    this.ctx.fillRect(0, 0, Game.DIM_X, Game.DIM_Y);

    this.tiles = this.getTiles();
    
    this.tiles.forEach((tile) => {
      let [x,y] = tile;
      this.drawTile(x, y);
    })

    this.rocks.forEach ((rock) => {
      rock.draw(this.ctx);
    })
    
    this.allObjects().forEach((object) => {
      object.draw(this.ctx);
    });
    
    this.points.draw(this.ctx);
  }

  allObjects() {
    return [].concat(this.treasures, this.player, this.weapons, this.enemies, this.pickaxe)
  }

  checkCollisions() {
    const allObjects = this.allObjects();

    for ( let i = 0; i < allObjects.length; i++ ) {
      for ( let j = 0; j < allObjects.length; j++ ) {
        if ( i === j ) continue;
        let obj1 = allObjects[i];
        let obj2 = allObjects[j];

        if ( obj1.isCollidedWith(obj2) ) {
          const collision = obj1.collidedWith(obj2);
        }
      }
    }
  }

  drawTile(x,y) {
    let playerX, playerY
    if ( this.player[0] == undefined ) {
      return;
    }
    [playerX, playerY] = this.player[0].pos;
    let wall = document.getElementById("wall");
    let floor = document.getElementById("floor");
    let obsidian = document.getElementById("obsidian");

    if ( this.map.isOutofBounds(x,y) ) {
      // this.ctx.beginPath();
      // this.ctx.fillStyle = "black";
      // this.ctx.fillRect((x - playerX) * 100 + 300, (y - playerY) * 100 + 300, 100, 100);
      // this.ctx.fill();
      this.ctx.drawImage(obsidian, (x - playerX) * 100 + 300, (y - playerY) * 100 + 300, 100, 100);
    } else if ( this.map.grid[x][y] && this.inViewPort(x,y)) {
      this.ctx.drawImage(floor, (x - playerX) * 100 + 300, (y - playerY) * 100 + 300, 100, 100);
    } else if ( this.map.grid[x][y] ) {
      this.ctx.drawImage(floor, (x - playerX) * 100 + 300, (y - playerY) * 100 + 300, 100, 100);
    } else {
      this.ctx.drawImage(wall, (x - playerX) * 100 + 300, (y - playerY) * 100 + 300, 100, 100);
    }

  }


  inViewPort(x,y) {
    x = x - this.player[0].pos[0];
    y = y - this.player[0].pos[1];

    if (x <= 1 && y <= 1 && x >= -1 && y >= -1 ) {
      return true;
    } else if ( this.viewport.toString() === [1,0].toString() ) {
      return x >= 1;
    } else if (this.viewport.toString() === [-1, 0].toString() ) {
      return x <= -1;
    } else if ( this.viewport.toString() === [0, 1].toString() ) {
      return y >= 1;
    } else if ( this.viewport.toString() === [0, -1].toString() ) {
      return y <= -1
    }
  }

  getTiles() {
    let x,y
    if ( this.player[0] !== undefined ) {
      [x,y] = this.player[0].pos;
    }
    let tilesArray = [];

    for ( let i = -3 ; i <= 3; i++ ) {
      for ( let j = -3; j <= 3; j++ ) {
        if ( i === -3 && j === -3 ) {
          this.windowMin = [x + i, y + j];
        } else if ( i === 3 && j === 3 ) {
          this.windowMax = [x + i, y + j];
        }

        tilesArray.push([x + i, y + j]);
      }
    }

    return tilesArray;
  }

  remove(object) {
    if (object instanceof Enemy) {
      this.points.points += 100;
      this.enemies.splice(this.enemies.indexOf(object), 1);
    } else if ( object instanceof FlameThrower ) {
      this.weapons.splice(this.weapons.indexOf(object), 1);
    } else if ( object instanceof Player ) {
      this.points.points -= 100;
      if (this.points.points < 0) {
        this.points.points = 0;
      }

      let tile = document.getElementsByClassName(`player`)[0];
      if ( tile !== undefined ) {
        tile.classList.remove("player");
      }
      
      this.player.splice(this.player.indexOf(object), 1);
      this.addPlayer()
    } else if ( object instanceof Pickaxe ) {
      this.pickaxe.splice(this.pickaxe.indexOf(object), 1);
    } else if ( object instanceof Treasure ) {
      this.points.points += 500;
      this.treasures.splice(this.treasures.indexOf(object), 1); 
    } else if ( object instanceof Boss ) {
      if ( object.lives !== 0 ) {
        object.lives -= 1;
      } else {
        this.points.points += 3000;
        this.enemies.splice(this.enemies.indexOf(object), 1);
      }
    }
  }

}

Game.NUM_ENEMIES = 75;
Game.DIM_X = 700;
Game.DIM_Y = 700;
Game.BG_COLOR = "purple";
Game.MOVES = {
  w: [0, -1],
  a: [-1, 0],
  s: [0, 1],
  d: [1, 0]
}

export default Game;
