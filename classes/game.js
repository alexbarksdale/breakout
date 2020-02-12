/* eslint-disable */
import Ball from '../classes/ball.js';
import Bricks from '../classes/bricks.js';
import Paddle from '../classes/paddle.js';
import HUD from '../classes/HUD.js';
/* eslint-enable */

// const gameHeader = document.getElementById('game-header');

export default class Game {
    constructor(canvas, gameHeader) {
        this.gameHeader = gameHeader;
        this.HUD = new HUD(canvas);
        this.bricks = new Bricks();
        this.ball = new Ball(canvas);
        this.paddle = new Paddle(canvas);
    }

    gameOver(bricks) {
        for (let column = 0; column < bricks.brickColumnCount; column += 1) {
            for (let row = 0; row < bricks.brickRowCount; row += 1) {
                if (bricks.bricks[column][row].status === 1) {
                    return false;
                }
            }
        }
        return true;
    }

    collisionDetection() {
        const { ball, bricks, HUD, gameHeader } = this;
        for (let column = 0; column < bricks.brickColumnCount; column += 1) {
            for (let row = 0; row < bricks.brickRowCount; row += 1) {
                const brick = bricks.bricks[column][row];
                if (brick.status === 1) {
                    if (
                        ball.x > brick.x &&
                        ball.x < brick.x + bricks.brickWidth &&
                        ball.y > brick.y &&
                        ball.y < brick.y + bricks.brickHeight
                    ) {
                        ball.dy = -ball.dy;
                        brick.status = 0;

                        // Points based off the row
                        if (row === 0) {
                            HUD.score += 200;
                        } else if (row === 1) {
                            HUD.score += 100;
                        } else {
                            HUD.score += 10;
                        }

                        if (this.gameOver(bricks)) {
                            gameHeader.innerHTML = `Game over, you won! <br /> Your Score - ${HUD.score}`;
                            setTimeout(() => {
                                document.location.reload();
                            }, 3000);
                            ball.dx = 0;
                            ball.dy = 0;
                        }
                    }
                }
            }
        }
    }

    move(canvas) {
        const { ball, paddle, HUD, gameHeader } = this;
        ball.move();

        // Bounce off the left and right
        if (
            ball.x + ball.dx > canvas.width - ball.radius ||
            ball.x + ball.dx < ball.radius
        ) {
            ball.dx = -ball.dx;
        }

        // Bounce off the top and bottom
        if (ball.y + ball.dy < ball.radius) {
            ball.dy = -ball.dy;
        } else if (ball.y + ball.dy > canvas.height - ball.radius) {
            if (ball.x > paddle.x && ball.x < paddle.x + paddle.width) {
                ball.dy = -ball.dy;
            } else {
                HUD.lives -= 1;
                if (!HUD.lives) {
                    gameHeader.innerHTML = `Game over you lost! <br /> Your Score - ${HUD.score}`;
                    setTimeout(() => {
                        document.location.reload();
                    }, 3000);
                    ball.dx = 0;
                    ball.dy = 0;
                } else {
                    ball.x = canvas.width / 2;
                    ball.y = canvas.height - 30;
                    ball.dx = 3;
                    ball.dy = -5;
                    paddle.x = (canvas.width - paddle.width) / 2;
                }
            }
        }

        if (paddle.rightClick && paddle.x < canvas.width - paddle.width) {
            paddle.x += 7;
        } else if (paddle.leftClick && paddle.x > 0) {
            paddle.x -= 7;
        }
    }

    render(ctx) {
        this.bricks.render(ctx);
        this.paddle.render(ctx);
        this.HUD.render(ctx);
        this.ball.render(ctx);
    }
}
