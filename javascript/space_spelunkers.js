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
  let game;
  window.muted = false;
  let audio = new Audio();
  audio.src = "./sound/overworld.mp3";
  audio.loop = true;

  startButton.addEventListener("submit", (event) =>
    { 
      event.preventDefault();
      window.intervals.forEach ((interval) => {
        window.clearInterval(interval);
      })

      window.intervals = []
      let options = buildOptions(event);
      ctx.clearRect(0,0,700,700);
      if ( game !== undefined ) game.end();
      let newGame = new Game(ctx, audio, options);
      game = newGame;
      game.start();
      drawMap(game.map.grid);
      let startButton = document.getElementById("start-button");
      startButton.blur();
      window.game = game;
  })

  let stopButton = document.getElementById("stop-button")

  stopButton.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();
    location.reload(true);
  })

  let volumeUp = document.getElementById("mute-button");
  volumeUp.addEventListener("click", () => {
    if ( volumeUp.className === "fas fa-volume-off" ) {
      audio.play();
      volumeUp.className = "fas fa-volume-up";
    } else {
      audio.pause();
      volumeUp.className = "fas fa-volume-off";
    }
  })

  let survivalChance = document.getElementById("survival-chance");
  let deathRate = document.getElementById("death-rate");
  let birthRate = document.getElementById("birth-rate");
  let survivalChanceDiv = document.getElementsByClassName("survival-chance-info")[0];
  let deathRateDiv = document.getElementsByClassName("death-rate-info")[0];
  let birthRateDiv = document.getElementsByClassName("birth-rate-info")[0];

  survivalChance.addEventListener("mouseover", (event) => {
    event.preventDefault();

    survivalChanceDiv.classList.remove("hidden");
  })

  survivalChance.addEventListener("mouseout", (event) => {
    event.preventDefault();

    survivalChanceDiv.classList.add("hidden");
  })
  deathRate.addEventListener("mouseover", (event) => {
    event.preventDefault();

    deathRateDiv.classList.remove("hidden");
  })

  deathRate.addEventListener("mouseout", (event) => {
    event.preventDefault();

    deathRateDiv.classList.add("hidden");
  })

  birthRate.addEventListener("mouseover", (event) => {
    event.preventDefault();

    birthRateDiv.classList.remove("hidden");
  })

  birthRate.addEventListener("mouseout", (event) => {
    event.preventDefault();

    birthRateDiv.classList.add("hidden");
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
