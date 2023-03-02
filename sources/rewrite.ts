javascript: (function () {
    "use strict";
    if (typeof globalThis.globalThis.active !== "boolean") {
        var _id: number;
        var toggleModal = function (t = 3000) {
            globalThis.clearTimeout(_id);
            if (globalThis.active === true) {
                _id = globalThis.setTimeout(function () {
                    globalThis.PAUSED = false;
                    requestAnimationFrame(globalThis.mainloop);
                }, t);
                globalThis.popup.style.display = "inline-block";
                globalThis.popup.focus();
            } else {
                globalThis.PAUSED = true;
                globalThis.active = false;
                globalThis.popup.style.display = "none";
                globalThis.focusedElement.focus();
            }
        }
        var focusedElement = document.activeElement;
        globalThis.active = !globalThis.active ?? true;
        let mousePosition: { x: number, y: number };
        let offset = [0, 0];
        let isDown = false;
        globalThis.popup = document.createElement("div");
        globalThis.popup.id = "game";
        globalThis.popup.tabIndex = 0;
        globalThis.popup.style.all = "initial";
        globalThis.popup.style.display = "inline-block";
        globalThis.popup.style.position = "fixed";
        globalThis.popup.style.left = "0px";
        globalThis.popup.style.top = "0px";
        globalThis.popup.style.margin = "0";
        globalThis.popup.style.padding = "0";
        globalThis.popup.style.zIndex = "9999";
        globalThis.popup.addEventListener("mousedown", (event) => {
            isDown = true;
            offset = [
                globalThis.popup.offsetLeft - event.clientX,
                globalThis.popup.offsetTop - event.clientY
            ]
        }, true)
        document.addEventListener("mouseup", () => {
            isDown = false;
        }, true)
        document.addEventListener("mousemove", (event) => {
            event.preventDefault();
            if (isDown) {
                mousePosition = {
                    x: event.clientX,
                    y: event.clientY
                };
                globalThis.popup.style.left = `${mousePosition.x + offset[0]}px`;
                globalThis.popup.style.top = `${mousePosition.y + offset[1]}px`;
            }
        }, true)
        document.addEventListener("focus", (event) => {
            focusedElement = document.activeElement === globalThis.popup ? focusedElement : document.activeElement;
        }, true)
        document.body.appendChild(globalThis.popup);
        globalThis.popup.focus();

        const { abs, floor, ceil, max } = Math;
        /* Max is exclusive, min is inclusive */
        const randint = (min: number, max: number) => floor(Math.random() * (floor(max) - ceil(min)) + ceil(min));
        const a = (x: number) => -abs(x - 1) + 1;
        const b = (x: number) => -abs(x - 2) + 1;
        const valid_turn = (a: number, b: number) => abs(abs(a - b) - 2);
        const id = (x: any) => Symbol.for(JSON.stringify(x));
        const hasDuplicates = (values: any[]) => {
            let seen = {};
            values.forEach((element, index) => {
                if (!seen.hasOwnProperty(id(element))) {
                    seen[id(element)] = index;
                }
            })
            return values.some((element, index) => seen[id(element)] != index);
        }
        const WIDTH = 24, HEIGHT = 24, TILE_SIZE = 16;
        const game = new Array(HEIGHT).fill(new Array(WIDTH).fill(0));
        let snake = [{ x: floor(WIDTH / 4), y: floor(HEIGHT / 2) }];
        let head = /* 
     0

3   ( )   1

     2
*/ 1;
        let tail = 4;
        let apple = { x: randint(0, WIDTH), y: randint(0, HEIGHT) };
        let score = 0;
        let GAME_OVER = false;
        let PAUSED = false;
        const canvas = document.createElement("canvas");
        canvas.width = WIDTH * TILE_SIZE;
        canvas.height = HEIGHT * TILE_SIZE;
        globalThis.popup.style.width = `${canvas.width}px`;
        globalThis.popup.style.height = `${canvas.height}px`;
        const container = document.getElementById("game");
        container?.appendChild(canvas);
        const context = canvas.getContext("2d");
        document.addEventListener("keydown", (event) => {
            event.preventDefault();
            event.stopPropagation();
            if (event.ctrlKey && event.location === 2) {
                globalThis.active = !globalThis.active;
                return toggleModal();
            }
            if (GAME_OVER || PAUSED) {
                return event.key.toLowerCase() === "enter" ? attemptRestart() : void 0;
            }
            let target = (function () {
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
                        return head;
                }
            })();
            head = head + valid_turn(target, head) * (target - head);
        }, true)
        const draw = () => {
            if (globalThis.active) {
                game.fill(new Array(WIDTH).fill(0));
                game[max(0, apple.y)] = [...game[max(0, apple.y)].slice(0, max(0, apple.x)), 2, ...game[max(0, apple.y)].slice(max(0, apple.x) + 1, game[max(0, apple.y)].length)];
                snake.forEach((tile) => {
                    try {
                        game[max(0, tile.y)] = [...game[max(0, tile.y)].slice(0, max(0, tile.x)), 1, ...game[max(0, tile.y)].slice(max(0, tile.x) + 1, game[max(0, tile.y)].length)];
                    } catch (e) {
                        GAME_OVER = true;
                    }
                })
                game.forEach((row: number[], y: number) => {
                    row.forEach((tile, x) => {
                        if (context) {
                            context.fillStyle = ["green", "blue", "red"][tile];
                            context.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
                        }
                    })
                })
                if (context) {
                    context.fillStyle = "white";
                    context.font = `bold ${0.75 * TILE_SIZE}px sans-serif`;
                    context.fillText(score.toString(), 16, 32);
                }
            }
            requestAnimationFrame(draw);
        }
        const attemptRestart = () => {
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
                toggleModal(0);
            }
        }
        globalThis.mainloop = () => {
            if (PAUSED || GAME_OVER) return;
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
            window.setTimeout(requestAnimationFrame, 1000 / 16, globalThis.mainloop);
        }
        requestAnimationFrame(draw);
        toggleModal();
    } else {
        globalThis.active = !globalThis.active;
        globalThis.toggleModal();
    }
})()