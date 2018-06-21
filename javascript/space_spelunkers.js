import { generateMap, drawMap, turmitesNTimes } from './caverns.js'
import Game from './game.js';
import GameView from './game_view.js';


document.addEventListener('DOMContentLoaded', () => {
  const canvasEl = document.getElementById("canvas");
  canvasEl.width = Game.DIM_X;
  canvasEl.height = Game.DIM_Y;

  const ctx = canvasEl.getContext("2d");
  // new GameView(game, ctx).start();

  
  let startButton = document.getElementById("form");
  window.intervals = [];
  let game = new Game(ctx);

  startButton.addEventListener("submit", (event) =>
    { 
      event.preventDefault();
      window.intervals.forEach ((interval) => {
        window.clearInterval(interval);
      })
      window.intervals = []
      let options = buildOptions(event);
      ctx.clearRect(0,0,700,700);
      game.end();
      let newGame = new Game(ctx, options);
      game = newGame;
      game.start();
      drawMap(game.map.grid);
      let startButton = document.getElementById("start-button");
      startButton.blur();
      window.game = game;
  })

})

const buildOptions = (event) => {
  let array = event.target.elements
  let options = {}

  for (let i = 0; i < array.length - 1; i++) {
    const element = array[i];
    for (let j = 0; j < element.length; j++) {
      const isSelected = element[j];

      if ( isSelected.selected ) {
        options[element.id] = isSelected.value
      }
    }
  }

  options.minCount = 0;
  return options;
}
