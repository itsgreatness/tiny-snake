javascript: (function () {
    "use strict";
    var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
        if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
            if (ar || !(i in from)) {
                if (!ar) ar = Array.prototype.slice.call(from, 0, i);
                ar[i] = from[i];
            }
        }
        return to.concat(ar || Array.prototype.slice.call(from));
    };
    var _a;
    if (typeof globalThis.active !== "boolean") {
        var _id;
        var toggleModal = function (t) {
            if (t === void 0) { t = 3000; }
            try {
                globalThis.clearTimeout(_id);
                if (globalThis.active === true) {
                    _id = globalThis.setTimeout(function () {
                        globalThis.PAUSED = false;
                        requestAnimationFrame(globalThis.mainloop);
                    }, t);
                    globalThis.popup.style.display = "inline-block";
                    globalThis.popup.focus();
                }
                else {
                    globalThis.PAUSED = true;
                    globalThis.active = false;
                    globalThis.popup.style.display = "none";
                    globalThis.focusedElement.focus();
                }
            }
            catch (e) {
                void 0;
            }
        };
        var focusedElement = document.activeElement;
        var active = (_a = !active) !== null && _a !== void 0 ? _a : true;
        var mousePosition_1;
        var offset_1 = [0, 0];
        var isDown_1 = false;
        var popup = document.createElement("div");
        popup.id = "game";
        popup.tabIndex = 0;
        popup.style.all = "initial";
        popup.style.display = "inline-block";
        popup.style.position = "fixed";
        popup.style.left = "0px";
        popup.style.top = "0px";
        popup.style.margin = "0";
        popup.style.padding = "0";
        popup.style.zIndex = "9999";
        popup.addEventListener("mousedown", function (event) {
            isDown_1 = true;
            offset_1 = [
                popup.offsetLeft - event.clientX,
                popup.offsetTop - event.clientY
            ];
        }, true);
        document.addEventListener("mouseup", function () {
            isDown_1 = false;
        }, true);
        document.addEventListener("mousemove", function (event) {
            event.preventDefault();
            if (isDown_1) {
                mousePosition_1 = {
                    x: event.clientX,
                    y: event.clientY
                };
                popup.style.left = "".concat(mousePosition_1.x + offset_1[0], "px");
                popup.style.top = "".concat(mousePosition_1.y + offset_1[1], "px");
            }
        }, true);
        document.addEventListener("focus", function (event) {
            focusedElement = document.activeElement === popup ? focusedElement : document.activeElement;
        }, true);
        document.body.appendChild(popup);
        popup.focus();
        var abs_1 = Math.abs, floor_1 = Math.floor, ceil_1 = Math.ceil, max = Math.max;
        /* Max is exclusive, min is inclusive */
        var randint_1 = function (min, max) { return floor_1(Math.random() * (floor_1(max) - ceil_1(min)) + ceil_1(min)); };
        var a_1 = function (x) { return -abs_1(x - 1) + 1; };
        var b_1 = function (x) { return -abs_1(x - 2) + 1; };
        var valid_turn_1 = function (a, b) { return abs_1(abs_1(a - b) - 2); };
        var id_1 = function (x) { return Symbol["for"](JSON.stringify(x)); };
        var hasDuplicates_1 = function (values) {
            var seen = {};
            values.forEach(function (element, index) {
                if (!seen.hasOwnProperty(id_1(element))) {
                    seen[id_1(element)] = index;
                }
            });
            return values.some(function (element, index) { return seen[id_1(element)] != index; });
        };
        var WIDTH_1 = 24, HEIGHT_1 = 24, TILE_SIZE_1 = 24;
        var game_1 = new Array(HEIGHT_1).fill(new Array(WIDTH_1).fill(0));
        var snake_1 = [{ x: floor_1(WIDTH_1 / 4), y: floor_1(HEIGHT_1 / 2) }];
        var head_1 = /*
     0

3   ( )   1

     2
*/ 1;
        var tail_1 = 4;
        var apple_1 = { x: randint_1(0, WIDTH_1), y: randint_1(0, HEIGHT_1) };
        var score_1 = 0;
        var GAME_OVER_1 = false;
        var PAUSED_1 = false;
        var canvas = document.createElement("canvas");
        canvas.width = WIDTH_1 * TILE_SIZE_1;
        canvas.height = HEIGHT_1 * TILE_SIZE_1;
        popup.style.width = "".concat(canvas.width, "px");
        popup.style.height = "".concat(canvas.height, "px");
        var container = document.getElementById("game");
        container === null || container === void 0 ? void 0 : container.appendChild(canvas);
        var context_1 = canvas.getContext("2d");
        document.addEventListener("keydown", function (event) {
            event.preventDefault();
            event.stopPropagation();
            if (event.ctrlKey && event.location === 2) {
                active = !active;
                return toggleModal();
            }
            if (GAME_OVER_1 || PAUSED_1) {
                return event.key.toLowerCase() === "enter" ? attemptRestart_1() : void 0;
            }
            var target = (function () {
                switch (event.key.toLowerCase()) {
                    case "arrowdown":
                    case "s":
                        return 2;
                    case "arrowup":
                    case "w":
                        return 0;
                    case "arrowleft":
                    case "a":
                        return 3;
                    case "arrowright":
                    case "d":
                        return 1;
                    default:
                        return head_1;
                }
            })();
            head_1 = head_1 + valid_turn_1(target, head_1) * (target - head_1);
        }, true);
        var draw_1 = function () {
            if (active) {
                game_1.fill(new Array(WIDTH_1).fill(0));
                game_1[apple_1.y] = __spreadArray(__spreadArray(__spreadArray([], game_1[apple_1.y].slice(0, apple_1.x), true), [2], false), game_1[apple_1.y].slice(apple_1.x + 1, game_1[apple_1.y].length), true);
                snake_1.forEach(function (tile) {
                    game_1[tile.y] = __spreadArray(__spreadArray(__spreadArray([], game_1[tile.y].slice(0, tile.x), true), [1], false), game_1[tile.y].slice(tile.x + 1, game_1[tile.y].length), true);
                });
                game_1.forEach(function (row, y) {
                    row.forEach(function (tile, x) {
                        if (context_1) {
                            context_1.fillStyle = ["green", "blue", "red"][tile];
                            context_1.fillRect(x * TILE_SIZE_1, y * TILE_SIZE_1, TILE_SIZE_1, TILE_SIZE_1);
                        }
                    });
                });
                if (context_1) {
                    context_1.fillStyle = "white";
                    context_1.font = "bold ".concat(0.75 * TILE_SIZE_1, "px sans-serif");
                    context_1.fillText(score_1.toString(), 16, 32);
                }
            }
            requestAnimationFrame(draw_1);
        };
        var attemptRestart_1 = function () {
            if (GAME_OVER_1) {
                snake_1 = [{ x: floor_1(WIDTH_1 / 4), y: floor_1(HEIGHT_1 / 2) }];
                head_1 = /*
             0

        3   ( )   1

             2
        */
                    1;
                tail_1 = 4;
                apple_1 = { x: randint_1(0, WIDTH_1), y: randint_1(0, HEIGHT_1) };
                score_1 = 0;
                GAME_OVER_1 = false;
                toggleModal(0);
            }
        };
        var mainloop_1 = function () {
            if (PAUSED_1 || GAME_OVER_1)
                return;
            snake_1.unshift({ x: snake_1[0].x + a_1(head_1), y: snake_1[0].y + b_1(head_1) });
            snake_1 = snake_1.slice(0, tail_1);
            if (snake_1[0].x == apple_1.x && snake_1[0].y == apple_1.y) {
                score_1 += 1;
                tail_1 += 1;
                apple_1 = { x: randint_1(0, WIDTH_1), y: randint_1(0, HEIGHT_1) };
            }
            if (snake_1[0].x >= WIDTH_1 || snake_1[0].x < 0 || snake_1[0].y >= HEIGHT_1 || snake_1[0].y < 0) {
                GAME_OVER_1 = true;
            }
            if (hasDuplicates_1(snake_1)) {
                GAME_OVER_1 = true;
            }
            window.setTimeout(requestAnimationFrame, 1000 / 16, mainloop_1);
        };
        requestAnimationFrame(draw_1);
        toggleModal();
    }
    else {
        globalThis.active = !globalThis.active;
        toggleModal();
    }
})();
