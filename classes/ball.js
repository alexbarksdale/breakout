export default class Ball {
    constructor(canvas, radius = 10) {
        this.radius = radius;
        this.x = canvas.width / 2;
        this.y = canvas.height - 10;
        this.dx = 3;
        this.dy = -5;
    }

    move() {
        this.x += this.dx;
        this.y += this.dy;
    }

    render(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2); // x,y,width,height
        ctx.fillStyle = '#ffffff';
        ctx.fill(); // automatcally closes
    }
}
