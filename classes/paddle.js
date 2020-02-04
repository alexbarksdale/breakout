export default class Paddle {
    constructor(canvas, height = 10, width = 75) {
        this.canvas = canvas;
        this.height = height;
        this.width = width;
        this.x = (canvas.width - this.width) / 2;
        this.rightClick = false;
        this.leftClick = false;

        document.addEventListener('keydown', (ev) => this.keyDownHandler(ev), false);
        document.addEventListener('keyup', (ev) => this.keyUpHandler(ev), false);
        document.addEventListener('mousemove', (ev) => this.mouseMoveHandler(ev), false);
    }

    keyDownHandler(e) {
        if (e.key === 'Right' || e.key === 'ArrowRight') {
            this.rightClick = true;
        } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
            this.leftClick = true;
        }
    }

    keyUpHandler(e) {
        if (e.key === 'Right' || e.key === 'ArrowRight') {
            this.rightClick = false;
        } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
            this.leftClick = false;
        }
    }

    mouseMoveHandler(e) {
        const relativeX = e.clientX - this.canvas.offsetLeft;
        if (relativeX > 0 && relativeX < this.canvas.width) {
            this.x = relativeX - this.width / 2;
        }
    }

    render(ctx) {
        ctx.beginPath();
        ctx.rect(this.x, this.canvas.height - this.height, this.width, this.height);
        ctx.fillStyle = '#89BCC8';
        ctx.fill();
    }
}
