const canvas = document.getElementById('my-canvas');
const ctx = canvas.getContext('2d');

let lives = 3;

const drawLives = () => {
    ctx.font = '35px Teko';
    ctx.fillStyle = '#fff';
    ctx.fillText(`LIVES: ${lives}`, canvas.width - 85, 35);
};

// ==============================
// BRICK VARIABLES
const BRICK_ROW_COUNT = 3;
const BRICK_COLUMN_COUNT = 5;
const BRICK_WIDTH = 75;
const BRICK_HEIGHT = 20;
const BRICK_PADDING = 10;
const BRICK_OFF_SET_TOP = 95;
const BRICK_OFF_SET_LEFT = 30;

const bricks = [];
// Loops through the rows and columns and creates the bricks
for (let column = 0; column < BRICK_COLUMN_COUNT; column += 1) {
    bricks[column] = [];
    for (let row = 0; row < BRICK_ROW_COUNT; row += 1) {
        bricks[column][row] = { x: 0, y: 0, status: 1 };
    }
}
const drawBricks = () => {
    for (let column = 0; column < BRICK_COLUMN_COUNT; column += 1) {
        for (let row = 0; row < BRICK_ROW_COUNT; row += 1) {
            if (bricks[column][row].status === 1) {
                const BRICK_X = column * (BRICK_WIDTH + BRICK_PADDING) + BRICK_OFF_SET_LEFT;
                const BRICK_Y = row * (BRICK_WIDTH + BRICK_PADDING) + BRICK_OFF_SET_TOP;
                bricks[column][row].x = BRICK_X;
                bricks[column][row].y = BRICK_Y;
                ctx.beginPath();
                ctx.rect(BRICK_X, BRICK_Y, BRICK_WIDTH, BRICK_HEIGHT);
                ctx.fillStyle = '#F7705E';
                ctx.fill();
            }
        }
    }
};

// ==============================
// BALL PROPERTIES
let x = canvas.width / 2;
let y = canvas.height - 30;
const BALL_RADIUS = 10;

const drawBall = () => {
    ctx.beginPath();
    ctx.arc(x, y, BALL_RADIUS, 0, Math.PI * 2); // x,y,width,height
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

// ==============================
// PIXELS TO MOVE THE BALL (SPEED)
let dx = 2;
let dy = -2;

// ==============================
// COLLISION PROPERTIES
const collisionDetection = () => {
    for (let column = 0; column < BRICK_COLUMN_COUNT; column += 1) {
        for (let row = 0; row < BRICK_ROW_COUNT; row += 1) {
            const brick = bricks[column][row];
            if (brick.status === 1) {
                if (
                    x > brick.x &&
                    x < brick.x + BRICK_WIDTH &&
                    y > brick.y &&
                    y < brick.y + BRICK_HEIGHT
                ) {
                    dy = -dy;
                    brick.status = 0;
                    score += 1;
                    if (score === BRICK_ROW_COUNT * BRICK_COLUMN_COUNT) {
                        alert('Good job, you won!');
                        document.location.reload();
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
    if (x + dx > canvas.width - BALL_RADIUS || x + dx < BALL_RADIUS) {
        dx = -dx;
    }

    // Bounce off the top and bottom
    if (y + dy < BALL_RADIUS) {
        dy = -dy;
    } else if (y + dy > canvas.height - BALL_RADIUS) {
        if (x > paddleX && x < paddleX + PADDLE_WIDTH) {
            dy = -dy;
        } else {
            lives -= 1;
            if (!lives) {
                alert('Game Over!');
                document.location.reload();
                clearInterval(interval);
            } else {
                x = canvas.width / 2;
                y = canvas.height - 30;
                dx = 2;
                dy = -2;
                paddleX = (canvas.width - PADDLE_WIDTH) / 2;
            }
        }
    }

    if (rightClick && paddleX < canvas.width - PADDLE_WIDTH) {
        paddleX += 7;
    } else if (leftClick && paddleX > 0) {
        paddleX -= 7;
    }

    // Moves the ball
    x += dx;
    y += dy;
};

const interval = setInterval(draw, 10);
