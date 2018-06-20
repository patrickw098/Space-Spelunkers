class Text {
    constructor(options) {
        this.points = options.points;
    }

    draw(ctx) {
        ctx.font = '48px serif';
        ctx.fillStyle = "gold";
        ctx.fillText(`${this.points}`, 75, 50);
    }

    isCollidedWith() {

    }

    collidedWith() {

    }
}

export default Text;