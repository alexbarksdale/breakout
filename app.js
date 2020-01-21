const canvas = document.getElementById('my-canvas');
const ctx = canvas.getContext('2d');

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

// BALL PROPERTIES
let x = canvas.width / 2;
let y = canvas.height - 30;
const BALL_RADIUS = 10;

const drawBall = () => {
    ctx.beginPath();
    ctx.arc(x, y, BALL_RADIUS, 0, Math.PI * 2); // x,y,width,height
    ctx.fillStyle = '#0095DD';
    ctx.fill(); // automatcally closes
};

// PADDLE PROPERTIES
const PADDLE_HEIGHT = 10;
const PADDLE_WIDTH = 75;
let paddleX = (canvas.width - PADDLE_WIDTH) / 2;

const drawPaddle = () => {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height - PADDLE_HEIGHT, PADDLE_WIDTH, PADDLE_HEIGHT);
    ctx.fillStyle = 'green';
    ctx.fill();
};

// PIXELS TO MOVE THE BALL (SPEED)
let dx = 2;
let dy = -2;

const draw = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // clears canvas content
    drawBall();
    drawPaddle();

    // Bounce off the left and right
    if (x + dx > canvas.width - BALL_RADIUS || x + dx < BALL_RADIUS) {
        dx = -dx;
    }

    // Bounce off the top and bottom
    if (y + dy > canvas.height - BALL_RADIUS || y + dy < BALL_RADIUS) {
        dy = -dy;
    }

    if (rightClick) {
        paddleX += 7;

        if (paddleX + PADDLE_WIDTH > canvas.width) {
            paddleX = canvas.width - PADDLE_WIDTH;
        }
    } else if (leftClick) {
        paddleX -= 7;
        if (paddleX < 0) {
            paddleX = 0;
        }
    }

    // Moves the ball
    x += dx;
    y += dy;
};

setInterval(draw, 10);
