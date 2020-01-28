const gameHeader = document.getElementById('game-header');
const canvas = document.getElementById('my-canvas');
const ctx = canvas.getContext('2d');

let lives = 3;

const drawLives = () => {
    ctx.font = '35px Teko';
    ctx.fillStyle = '#fff';
    ctx.fillText(`LIVES: ${lives}`, canvas.width - 85, 35);
};

// Object that contains all brick properties
const brickObj = {
    bricks: [],
    brickRowCount: 3,
    brickColumnCount: 5,
    brickWidth: 75,
    brickHeight: 20,
    brickPadding: 10,
    brickOffSetTop: 95,
    brickOffSetLeft: 30
};

// Loops through the rows and columns and creates the bricks
for (let column = 0; column < brickObj.brickColumnCount; column += 1) {
    brickObj.bricks[column] = [];
    for (let row = 0; row < brickObj.brickRowCount; row += 1) {
        brickObj.bricks[column][row] = { x: 0, y: 0, status: 1 };
    }
}
const drawBricks = () => {
    for (let column = 0; column < brickObj.brickColumnCount; column += 1) {
        for (let row = 0; row < brickObj.brickRowCount; row += 1) {
            if (brickObj.bricks[column][row].status === 1) {
                const BRICK_X =
                    column * (brickObj.brickWidth + brickObj.brickPadding) +
                    brickObj.brickOffSetLeft;
                const BRICK_Y =
                    row * (brickObj.brickWidth + brickObj.brickPadding) +
                    brickObj.brickOffSetTop;
                brickObj.bricks[column][row].x = BRICK_X;
                brickObj.bricks[column][row].y = BRICK_Y;
                ctx.beginPath();
                ctx.rect(BRICK_X, BRICK_Y, brickObj.brickWidth, brickObj.brickHeight);
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
};

// Object that contains all ball properties
const ball = {
    x: canvas.width / 2,
    dx: 2,
    y: canvas.height - 30,
    dy: -5,
    ballRadius: 10,
    move() {
        this.x += this.dx;
        this.y += this.dy;
    }
};

// ==============================
// BALL PROPERTIES
const drawBall = () => {
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.ballRadius, 0, Math.PI * 2); // x,y,width,height
    ctx.fillStyle = '#ffffff';
    ctx.fill(); // automatcally closes
};

// ==============================
// PADDLE CONTROLS
let rightClick = false;
let leftClick = false;

const keyDownHandler = (e) => {
    if (e.key === 'Right' || e.key === 'ArrowRight') {
        rightClick = true;
    } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
        leftClick = true;
    }
};

const keyUpHandler = (e) => {
    if (e.key === 'Right' || e.key === 'ArrowRight') {
        rightClick = false;
    } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
        leftClick = false;
    }
};

document.addEventListener('keydown', keyDownHandler, false);
document.addEventListener('keyup', keyUpHandler, false);

// PADDLE PROPERTIES
const PADDLE_HEIGHT = 10;
const PADDLE_WIDTH = 75;
let paddleX = (canvas.width - PADDLE_WIDTH) / 2;

const drawPaddle = () => {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height - PADDLE_HEIGHT, PADDLE_WIDTH, PADDLE_HEIGHT);
    ctx.fillStyle = '#89BCC8';
    ctx.fill();
};

// ==============================
// MOUSE CONTROLS
const mouseMoveHandler = (e) => {
    const relativeX = e.clientX - canvas.offsetLeft;
    if (relativeX > 0 && relativeX < canvas.width) {
        paddleX = relativeX - PADDLE_WIDTH / 2;
    }
};

document.addEventListener('mousemove', mouseMoveHandler, false);

// ==============================
// SCORE PROPERTIES
let score = 0;

const drawScore = () => {
    ctx.font = '35px Teko';
    ctx.fillStyle = '#fff';
    ctx.fillText(`SCORE: ${score}`, 8, 35);
};

const gameOver = () => {
    for (let column = 0; column < brickObj.brickColumnCount; column += 1) {
        for (let row = 0; row < brickObj.brickRowCount; row += 1) {
            if (brickObj.bricks[column][row].status === 1) {
                return false;
            }
        }
    }

    return true;
};

// ==============================
// COLLISION PROPERTIES
const collisionDetection = () => {
    for (let column = 0; column < brickObj.brickColumnCount; column += 1) {
        for (let row = 0; row < brickObj.brickRowCount; row += 1) {
            const brick = brickObj.bricks[column][row];
            if (brick.status === 1) {
                if (
                    ball.x > brick.x &&
                    ball.x < brick.x + brickObj.brickWidth &&
                    ball.y > brick.y &&
                    ball.y < brick.y + brickObj.brickHeight
                ) {
                    ball.dy = -ball.dy;
                    brick.status = 0;

                    // Points based off the row
                    if (row === 0) {
                        score += 200;
                    } else if (row === 1) {
                        score += 100;
                    } else {
                        score += 10;
                    }

                    if (gameOver()) {
                        gameHeader.innerHTML = `Game over, you won! <br /> Your Score - ${score}`;
                        setTimeout(() => {
                            document.location.reload();
                        }, 3000);
                        clearInterval(interval); // Needed for Chrome to end game
                    }
                }
            }
        }
    }
};

const draw = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // clears canvas content
    drawBricks();
    drawBall();
    drawPaddle();
    drawScore();
    drawLives();
    collisionDetection();

    // Bounce off the left and right
    if (
        ball.x + ball.dx > canvas.width - ball.ballRadius ||
        ball.x + ball.dx < ball.ballRadius
    ) {
        ball.dx = -ball.dx;
    }

    // Bounce off the top and bottom
    if (ball.y + ball.dy < ball.ballRadius) {
        ball.dy = -ball.dy;
    } else if (ball.y + ball.dy > canvas.height - ball.ballRadius) {
        if (ball.x > paddleX && ball.x < paddleX + PADDLE_WIDTH) {
            ball.dy = -ball.dy;
        } else {
            lives -= 1;
            if (!lives) {
                gameHeader.innerHTML = `Game over you lost! <br /> Your Score - ${score}`;
                setTimeout(() => {
                    document.location.reload();
                }, 3000);
                clearInterval(interval);
            } else {
                ball.x = canvas.width / 2;
                ball.y = canvas.height - 30;
                ball.dx = 2;
                ball.dy = -5;
                paddleX = (canvas.width - PADDLE_WIDTH) / 2;
            }
        }
    }

    if (rightClick && paddleX < canvas.width - PADDLE_WIDTH) {
        paddleX += 7;
    } else if (leftClick && paddleX > 0) {
        paddleX -= 7;
    }

    ball.move();
};

const interval = setInterval(draw, 10);
