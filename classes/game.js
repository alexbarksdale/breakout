const gameHeader = document.getElementById('game-header');

export default class Game {
    constructor() {
        this.interval = setInterval(this.draw, 10);
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

    collisionDetection(ball, score, bricks) {
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
                            score.score += 200;
                        } else if (row === 1) {
                            score.score += 100;
                        } else {
                            score.score += 10;
                        }

                        if (this.gameOver(bricks)) {
                            gameHeader.innerHTML = `Game over, you won! <br /> Your Score - ${score.score}`;
                            setTimeout(() => {
                                document.location.reload();
                            }, 3000);
                            clearInterval(interval); // Needed for Chrome to end game
                        }
                    }
                }
            }
        }
    }
}
