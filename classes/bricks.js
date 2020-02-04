export default class Bricks {
    constructor() {
        this.bricks = [];
        this.brickRowCount = 3;
        this.brickColumnCount = 5;
        this.brickWidth = 75;
        this.brickHeight = 20;
        this.brickPadding = 10;
        this.brickOffSetTop = 95;
        this.brickOffSetLeft = 30;

        // Loops through the rows and columns and creates a 2d array of bricks
        for (let column = 0; column < this.brickColumnCount; column += 1) {
            this.bricks[column] = [];
            for (let row = 0; row < this.brickRowCount; row += 1) {
                this.bricks[column][row] = { x: 0, y: 0, status: 1 };
            }
        }
    }

    render(ctx) {
        for (let column = 0; column < this.brickColumnCount; column += 1) {
            for (let row = 0; row < this.brickRowCount; row += 1) {
                if (this.bricks[column][row].status === 1) {
                    const BRICK_X =
                        column * (this.brickWidth + this.brickPadding) +
                        this.brickOffSetLeft;
                    const BRICK_Y =
                        row * (this.brickWidth + this.brickPadding) + this.brickOffSetTop;
                    this.bricks[column][row].x = BRICK_X;
                    this.bricks[column][row].y = BRICK_Y;
                    ctx.beginPath();
                    ctx.rect(BRICK_X, BRICK_Y, this.brickWidth, this.brickHeight);
                    switch (row) {
                        case 0:
                            ctx.fillStyle = '#F7705E';
                            break;
                        case 1:
                            ctx.fillStyle = '#ffab61';
                            break;
                        case 2:
                            ctx.fillStyle = '#7aff83';
                            break;
                        default:
                            ctx.fillStyle = '#a6a6a6';
                    }
                    ctx.fill();
                }
            }
        }
    }
}
