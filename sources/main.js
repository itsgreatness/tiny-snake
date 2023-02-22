javascript: (function () {
    if (typeof window.active != "boolean") {
        var _id;
        var toggleModal = function () {
            window.clearTimeout(_id);
            if (window.active) {
                _id = window.setTimeout(function () {
                    PAUSED = false;
                    requestAnimationFrame(mainloop);
                }, 3000);
                window.popup.style.display = "inline-block";
                window.popup.focus();
            } else {
                PAUSED = true;
                window.active = false;
                window.popup.style.display = "none";
                window.focusedElement.focus({ focusVisible: true });
            }
        };
        window.focusedElement = document.activeElement;
        window.active = !window.active ?? true;
        let mousePosition;
        let offset = [0, 0];
        window.popup = document.createElement("div");
        window.popup.id = "game";
        let isDown = false;
        window.popup.style.all = "initial";
        window.popup.style.display = "inline-block";
        window.popup.style.position = "fixed";
        window.popup.style.left = "0px";
        window.popup.style.top = "0px";
        window.popup.style.margin = "0px 0px 0px 0px";
        window.popup.style.padding = "0px 0px 0px 0px";
        window.popup.style.zIndex = 9999;
        window.popup.tabIndex = 0;

        window.popup.addEventListener('mousedown', function (e) {
            isDown = true;
            offset = [
                window.popup.offsetLeft - e.clientX,
                window.popup.offsetTop - e.clientY
            ];
        }, true);
        document.addEventListener('mouseup', function () {
            isDown = false;
        }, true);
        document.addEventListener('mousemove', function (event) {
            event.preventDefault();
            if (isDown) {
                mousePosition = {
                    x: event.clientX,
                    y: event.clientY
                };
                window.popup.style.left = (mousePosition.x + offset[0]) + 'px';
                window.popup.style.top = (mousePosition.y + offset[1]) + 'px';
            }
        }, true);
        document.addEventListener("focus", function (e) {
            if (document.activeElement != window.popup) {
                window.focusedElement = document.activeElement;
            }
        }, true);
        document.addEventListener("keydown", function (e) {
            if (e.ctrlKey && e.location == 2) {
                window.active = !window.active;
            }
            toggleModal();
        }, true);

        document.body.appendChild(window.popup);
        window.popup.focus({ focusVisible: true });

        /* #region game code */
        var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
            if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
                if (ar || !(i in from)) {
                    if (!ar) ar = Array.prototype.slice.call(from, 0, i);
                    ar[i] = from[i];
                }
            }
            return to.concat(ar || Array.prototype.slice.call(from));
        };
        var pow = Math.pow, abs = Math.abs, floor = Math.floor, ceil = Math.ceil, max = Math.max, min = Math.min;
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
            return values.some(function (element, index) { return seen[Symbol["for"](JSON.stringify(element))] != index; });
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
        var PAUSED = true;
        var canvas = document.createElement("canvas");
        canvas.width = WIDTH * TILE_SIZE;
        canvas.height = HEIGHT * TILE_SIZE;
        window.popup.style.width = `${canvas.width}px`;
        window.popup.style.height = `${canvas.height}px`;
        var container = document.getElementById("game");
        container === null || container === void 0 ? void 0 : container.appendChild(canvas);
        var context = canvas.getContext("2d");
        window.addEventListener("keydown", function (e) {
            var target = (function () {
                switch (e.key.toLowerCase()) {
                    case "arrowdown":
                        e.preventDefault();
                        return PAUSED ? head : 2;
                    case "s":
                        return PAUSED ? head : 2;
                    case "arrowup":
                        e.preventDefault();
                        return PAUSED ? head : 0;
                    case "w":
                        return PAUSED ? head : 0;
                    case "arrowleft":
                        e.preventDefault();
                        return PAUSED ? head : 3;
                    case "a":
                        return PAUSED ? head : 3;
                    case "arrowright":
                        e.preventDefault();
                        return PAUSED ? head : 1;
                    case "d":
                        return PAUSED ? head : 1;
                    case "enter":
                        attemptRestart();
                        return head;
                }
            })();
            if ((head + 3) % 4 == target || (head + 5) % 4 == target) {
                head = target;
            } else {
                head = head;
            }
        });
        var draw = function () {
            game.fill(new Array(WIDTH).fill(0));
            game[max(0, apple.y)] = __spreadArray(__spreadArray(__spreadArray([], game[max(0, apple.y)].slice(0, max(0, apple.x)), true), [2], false), game[max(0, apple.y)].slice(max(0, apple.x) + 1, game[max(0, apple.y)].length), true);
            snake.forEach(function (tile) {
                try {
                    game[max(0, tile.y)] = __spreadArray(__spreadArray(__spreadArray([], game[max(0, tile.y)].slice(0, max(0, tile.x)), true), [1], false), game[max(0, tile.y)].slice(max(0, tile.x) + 1, game[max(0, tile.y)].length), true);
                } catch (e) {
                    GAME_OVER = true;
                }
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
                */ 1;
                tail = 4;
                apple = { x: randint(0, WIDTH), y: randint(0, HEIGHT) };
                score = 0;
                GAME_OVER = false;
                PAUSED = false;
            }
        };
        var mainloop = function () {
            if (!PAUSED) {
                switch (GAME_OVER) {
                    case false:
                        snake.unshift({ x: snake[0].x + a(head), y: snake[0].y + b(head) });
                        snake = snake.slice(0, tail);
                        if (snake[0].x == apple.x && snake[0].y == apple.y) {
                            score += 1;
                            tail += 1;
                            apple = { x: randint(0, WIDTH), y: randint(0, HEIGHT) };
                        }
                        if (snake[0].x >= WIDTH || snake[0].x < 0 || snake[0].y >= HEIGHT || snake[0].y < 0) {
                            GAME_OVER = true;
                        }
                        if (hasDuplicates(snake)) {
                            GAME_OVER = true;
                        }
                        break;
                    case true:
                        break;
                }
                draw();
                window.setTimeout(requestAnimationFrame, 1000 / 16, mainloop);
            }
        };
        /* #endregion */

        requestAnimationFrame(draw);
        toggleModal();
    } else {
        window.active = !window.active;
        toggleModal();
    }

})();