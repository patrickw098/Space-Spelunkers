class GameView {
  constructor(game, ctx) {
    this.ctx = ctx;
    this.game = game;
  }

  start() {
    this.bindKeyHandlers();
    this.lastTime = 0;

    window.setTimeOut(this.animate, 200);
  }

  animate() {
    this.game.draw(this.ctx);
  }
}
