import Player from './player.js';
import Enemy from './enemy.js';
import Map from './map.js';
import { generateMap, turmitesNTimes, drawMap } from './caverns.js';

class Game {
  constructor(options) {
    this.player = [];
    this.enemies = [];
    this.treasures = [];
    this.map = new Map;

    this.addPlayer();
    this.addEnemies();
    this.tiles = this.getTiles();
  }

  add(object) {
    if ( object instanceof Player ) {
      this.player.push(object);
    } else if ( object instanceof Enemy ) {
      this.enemies.push(object);
    }
  }

  addPlayer() {
    const player = new Player({
      pos: this.map.startPos,
      game: this
    })

    this.add(player)

    return player;
  }

  addEnemies() {
    for (let i = 0; i < Game.NUM_ENEMIES; i++) {
      this.add(new Enemy({ game: this, pos: this.map.randomPos() }))
    }
  }

  draw(ctx) {
    ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
    ctx.fillStyle = Game.BG_COLOR;
    ctx.fillRect(0, 0, Game.DIM_X, Game.DIM_Y);

    this.tiles.forEach((tile) => {
      let [x,y] = tile;
      this.drawTile(ctx, x, y);
    })

    this.allObjects().forEach((object) => {
      object.draw(ctx);
    });
  }

  allObjects() {
    return [].concat(this.player, this.enemies)
  }

  drawTile(ctx, x,y) {
    let [ playerX, playerY ] = this.player[0].pos;
    console.log("drawing",x - playerX ,y - playerY)
    if ( this.map.isOutofBounds(x,y) ) {
      ctx.beginPath();
      ctx.fillStyle = "black";
      ctx.fillRect((x - playerX) * 100 + 300, (y - playerY) * 100 + 300, 100, 100);
      ctx.fill();
    } else if ( this.map.grid[x][y] ) {
      ctx.beginPath();
      ctx.fillStyle = "white";
      ctx.fillRect((x - playerX) *100 + 300, (y - playerY) * 100 + 300, 100, 100);
      ctx.fill();
    } else {
      ctx.beginPath();
      ctx.fillStyle = "black";
      ctx.fillRect((x - playerX) * 100 + 300, (y - playerY) * 100 + 300, 100, 100);
      ctx.fill();
    }
  }

  getTiles() {
    debugger
    let [x,y] = this.player[0].pos;
    let tilesArray = [];

    for ( let i = -3 ; i <= 3; i++ ) {
      for ( let j = -3; j <= 3; j++ ) {
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

export default Game;
