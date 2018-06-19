import Player from './player.js';
import Enemy from './enemy.js';
import Map from './map.js';
import { generateMap, turmitesNTimes, drawMap } from './caverns.js';

class Game {
  constructor(ctx) {
    this.player = [];
    this.enemies = [];
    this.treasures = [];
    this.map = new Map;
    this.tiles = [];
    this.ctx = ctx;

    this.addPlayer();
    this.addEnemies();
  }

  start() {
    const that = this;
    this.bindKeyHandlers();

    window.setInterval(that.animate, 400);
  }

  animate() {
    let move = Object.values(Game.MOVES);
    let index = Math.floor(Math.random() * move.length);
    this.enemies.move(move)
    this.game.draw(this.ctx);
  }

  add(object) {
    if ( object instanceof Player ) {
      this.player.push(object);
    } else if ( object instanceof Enemy ) {
      this.enemies.push(object);
    }
  }

  bindKeyHandlers() {
    const player = this.player[0];
    const that = this;

    window.addEventListener("keydown", (event) => {
      if ( Object.keys(Game.MOVES).indexOf(event.key) !== -1 ) {
        let move = Game.MOVES[event.key]
        player.move(move);
      }
    })

  }

  addPlayer() {
    const player = new Player({
      pos: this.map.startPos,
      game: this,
      map: this.map
    })

    this.add(player)

    return player;
  }

  addEnemies() {
    for (let i = 0; i < Game.NUM_ENEMIES; i++) {
      this.add(new Enemy({ game: this, pos: this.map.randomPos() }))
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

    this.allObjects().forEach((object) => {
      object.draw(this.ctx);
    });
  }

  allObjects() {
    return [].concat(this.player, this.enemies)
  }

  drawTile(x,y) {
    let [ playerX, playerY ] = this.player[0].pos;
    if ( this.map.isOutofBounds(x,y) ) {
      this.ctx.beginPath();
      this.ctx.fillStyle = "black";
      this.ctx.fillRect((x - playerX) * 100 + 300, (y - playerY) * 100 + 300, 100, 100);
      this.ctx.fill();
    } else if ( this.map.grid[x][y] ) {
      this.ctx.beginPath();
      this.ctx.fillStyle = "white";
      this.ctx.fillRect((x - playerX) * 100 + 300, (y - playerY) * 100 + 300, 100, 100);
      this.ctx.fill();
    } else {
      this.ctx.beginPath();
      this.ctx.fillStyle = "black";
      this.ctx.fillRect((x - playerX) * 100 + 300, (y - playerY) * 100 + 300, 100, 100);
      this.ctx.fill();
    }
  }

  getTiles() {
    let [x,y] = this.player[0].pos;
    let tilesArray = [];

    for ( let i = -3 ; i <= 3; i++ ) {
      for ( let j = -3; j <= 3; j++ ) {
        if ( i === -3 && j === 3) {
          this.window = [x + i, y + j]
        }

        tilesArray.push([x + i, y + j]);
      }
    }

    return tilesArray;
  }

}

Game.NUM_ENEMIES = 30;
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
