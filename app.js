const canvas = document.getElementById('my-canvas');
const ctx = canvas.getContext('2d');

// Ball properties
let x = canvas.width / 2;
let y = canvas.height - 30;
const ballRadius = 10;

const drawBall = () => {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2); // x,y,width,height
    ctx.fillStyle = '#0095DD';
    ctx.fill(); // automatcally closes
};

const draw = () => {
    // Pixels to move the ball
    let dx = 2;
    let dy = -2;

    // Bounce off the left and right
    if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
        dx = -dx;
    }

    // Bounce off the top and bottom
    if (y + dy > canvas.height - ballRadius || y + dy < ballRadius) {
        dy = -dy;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height); // clears canvas content
    drawBall();
    // Moves the ball
    x += dx;
    y += dy;
};
setInterval(draw, 10);
