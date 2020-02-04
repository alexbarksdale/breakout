/* eslint-disable */
import Ball from './classes/ball.js';
import Bricks from './classes/bricks.js';
import Paddle from './classes/paddle.js';
import Score from './classes/score.js';
import Lives from './classes/lives.js';
import Game from './classes/game.js';
/* eslint-enable */

const gameHeader = document.getElementById('game-header');
const canvas = document.getElementById('my-canvas');
const ctx = canvas.getContext('2d');

const ball = new Ball(canvas);
const bricks = new Bricks();
const paddle = new Paddle(canvas);
const score = new Score();
const lives = new Lives(canvas);
const game = new Game();

const draw = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // clears canvas content
    bricks.render(ctx);
    paddle.render(ctx);
    score.render(ctx);
    lives.render(ctx);
    game.collisionDetection(ball, score, bricks);

    // Bounce off the left and right
    if (ball.x + ball.dx > canvas.width - ball.radius || ball.x + ball.dx < ball.radius) {
        ball.dx = -ball.dx;
    }

    // Bounce off the top and bottom
    if (ball.y + ball.dy < ball.radius) {
        ball.dy = -ball.dy;
    } else if (ball.y + ball.dy > canvas.height - ball.radius) {
        if (ball.x > paddle.x && ball.x < paddle.x + paddle.width) {
            ball.dy = -ball.dy;
        } else {
            lives.lives -= 1;
            if (!lives.lives) {
                gameHeader.innerHTML = `Game over you lost! <br /> Your Score - ${score.score}`;
                setTimeout(() => {
                    document.location.reload();
                }, 3000);
                clearInterval(interval);
            } else {
                ball.x = canvas.width / 2;
                ball.y = canvas.height - 30;
                ball.dx = 2;
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

    ball.move();
    ball.render(ctx);
};

const interval = setInterval(draw, 10);
