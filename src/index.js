/* eslint-disable */
import Game from '../classes/game.js';
/* eslint-enable */

const gameHeader = document.getElementById('game-header');
const canvas = document.getElementById('my-canvas');
const ctx = canvas.getContext('2d');

const game = new Game(canvas, gameHeader);

const draw = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    game.render(ctx);
    game.collisionDetection();
    game.move(canvas);
    requestAnimationFrame(draw);
};

draw();
