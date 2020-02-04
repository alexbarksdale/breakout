export default class Score {
    constructor(color = '#fff') {
        this.color = color;
        this.score = 0;
    }

    render(ctx) {
        ctx.font = '35px Teko';
        ctx.fillStyle = this.color;
        ctx.fillText(`SCORE: ${this.score}`, 8, 35);
    }
}
