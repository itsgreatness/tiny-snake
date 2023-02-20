var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var pow = Math.pow, abs = Math.abs, floor = Math.floor, ceil = Math.ceil;
/* Max is exclusive, min is inclusive */
var randint = function (min, max) { return floor(Math.random() * (floor(max) - ceil(min)) + ceil(min)); };
var a = function (x) { return -abs(x - 1) + 1; };
var b = function (x) { return -abs(x - 2) + 1; };
var id = function (x) { return Symbol["for"](JSON.stringify(x)); };
var hasDuplicates = function (values) {
    var seen = {};
    values.forEach(function (element, index) {
        if (!seen.hasOwnProperty(Symbol["for"](JSON.stringify(element)))) {
            seen[Symbol["for"](JSON.stringify(element))] = index;
        }
    });
    return values.some(function (element, index) { return seen[id(element)] != index; });
};
var WIDTH = 24, HEIGHT = 24, TILE_SIZE = 16;
var game = new Array(HEIGHT).fill(new Array(WIDTH).fill(0));
var snake = [{ x: floor(WIDTH / 4), y: floor(HEIGHT / 2) }];
var head = /*
     0

3   ( )   1

     2
*/ 1;
var tail = 4;
var apple = { x: randint(0, WIDTH), y: randint(0, HEIGHT) };
var score = 0;
var GAME_OVER = false;
var PAUSED = false;
var canvas = document.createElement("canvas");
canvas.width = WIDTH * TILE_SIZE;
canvas.height = HEIGHT * TILE_SIZE;
var container = document.getElementById("game");
container === null || container === void 0 ? void 0 : container.appendChild(canvas);
var context = canvas.getContext("2d");
window.addEventListener("keyup", function (e) {
    var target = (function () {
        switch (e.key.toLowerCase()) {
            case "arrowdown":
                return 2;
            case "s":
                return 2;
            case "arrowup":
                return 0;
            case "w":
                return 0;
            case "arrowleft":
                return 3;
            case "a":
                return 3;
            case "arrowright":
                return 1;
            case "d":
                return 1;
            case "enter":
                return attemptRestart();
        }
    })();
    if ((head + 3) % 4 == target || (head + 5) % 4 == target) {
        head = target;
    }
    else {
        head = head;
    }
});
var draw = function () {
    game.fill(new Array(WIDTH).fill(0));
    game[apple.y] = __spreadArray(__spreadArray(__spreadArray([], game[apple.y].slice(0, apple.x), true), [2], false), game[apple.y].slice(apple.x + 1, game[apple.y].length), true);
    snake.forEach(function (tile) {
        game[tile.y] = __spreadArray(__spreadArray(__spreadArray([], game[tile.y].slice(0, tile.x), true), [1], false), game[tile.y].slice(tile.x + 1, game[tile.y].length), true);
    });
    game.forEach(function (row, y) {
        row.forEach(function (tile, x) {
            if (context) {
                context.fillStyle = ["green", "blue", "red"][tile];
                context.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
            }
        });
    });
    if (context) {
        context.fillStyle = "white";
        context.font = "bold ".concat(0.75 * TILE_SIZE, "px sans-serif");
        context.fillText(score.toString(), 16, 32);
    }
};
var attemptRestart = function () {
    if (GAME_OVER) {
        snake = [{ x: floor(WIDTH / 4), y: floor(HEIGHT / 2) }];
        head = /*
             0

        3   ( )   1

             2
        */
            1;
        tail = 4;
        apple = { x: randint(0, WIDTH), y: randint(0, HEIGHT) };
        score = 0;
        GAME_OVER = false;
    }
};
var mainloop = function () {
    switch (GAME_OVER) {
        case false:
            if (!PAUSED) {
                snake.unshift({ x: snake[0].x + a(head), y: snake[0].y + b(head) });
                snake = snake.slice(0, tail);
                if (snake[0].x == apple.x && snake[0].y == apple.y) {
                    score += 1;
                    tail += 1;
                    apple = { x: randint(0, WIDTH), y: randint(0, HEIGHT) };
                }
                if (snake[0].x > WIDTH || snake[0].x < 0 || snake[0].y > HEIGHT || snake[0].y < 0) {
                    GAME_OVER = true;
                }
                if (hasDuplicates(snake)) {
                    GAME_OVER = true;
                }
            }
        case true:
            break;
    }
    draw();
    window.setTimeout(requestAnimationFrame, 1000 / 16, mainloop);
};
requestAnimationFrame(draw);
window.setTimeout(requestAnimationFrame, 3000, mainloop);
