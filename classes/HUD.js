export default class Score {
    constructor(canvas, color = '#fff') {
        this.canvas = canvas;
        this.color = color;
        this.score = 0;
        this.lives = 3;
    }

    render(ctx) {
        ctx.font = '35px Teko';
        ctx.fillStyle = this.color;
        ctx.fillText(`LIVES: ${this.lives}`, this.canvas.width - 85, 35);
        ctx.fillText(`SCORE: ${this.score}`, 8, 35);
    }
}
