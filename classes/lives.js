export default class Lives {
    constructor(canvas, color = '#fff') {
        this.canvas = canvas;
        this.color = color;
        this.lives = 3;
    }

    render(ctx) {
        ctx.font = '35px Teko';
        ctx.fillStyle = this.color;
        ctx.fillText(`LIVES: ${this.lives}`, this.canvas.width - 85, 35);
    }
}
