import { generateMap, drawMap, turmitesNTimes } from './caverns.js'
import Game from './game.js';
import GameView from './game_view.js';


document.addEventListener('DOMContentLoaded', () => {
  const canvasEl = document.getElementById("canvas");
  console.log(canvasEl);
  canvasEl.width = Game.DIM_X;
  canvasEl.height = Game.DIM_Y;

  const ctx = canvasEl.getContext("2d");
  const game = new Game();
  window.game = game;
  // new GameView(game, ctx).start();

  game.draw(ctx);

  // drawMap(game.map.grid);

})
