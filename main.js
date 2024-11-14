


let minoOptions = [1, 2, 3, 4, 5, 6];



const MINOS = [
    new Mino(1, 3, 0, 0, 5, true),
    new Mino(3, 3, 0, 0, 5, true),
];



function mainLoop() {
    ctx.clearRect(0, 0, FIELD_W, FIELD_H);


    drawField();


    MINOS[0].update();
    if (MINOS[0].life === false) {
        MINOS.shift();
    }

    keyCount();
}

setInterval(mainLoop, 1000 / FPS);