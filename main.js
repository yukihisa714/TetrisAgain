let flame = 0;


document.addEventListener("keydown", e => {
    if (e.key === "Shift") {
        hold();
    }
});



let minoOptions = [1, 2, 3, 4, 5, 6, 7];

const MINOS = [];
refillMinos();

const HOLD = [];
let canHold = true;

function refillMinos() {
    while (MINOS.length < NUM_OF_NEXT_MINOS + 1) {
        const i = minoOptions.splice(Math.floor(Math.random() * minoOptions.length), 1)[0];
        const x = (BLOCK_COLS - MINOS_SHAPE[i].length) / 2 | 0;
        MINOS.push(new Mino(i, x, 0, 0, 5, true));
        if (minoOptions.length === 0) {
            minoOptions = [1, 2, 3, 4, 5, 6, 7];
        }
    }
}


function deleteLines() {
    for (let row = 0; row < BLOCK_ROWS; row++) {
        let product = 1;
        for (let col = 0; col < BLOCK_COLS; col++) {
            product *= FIELD[row][col];
        }
        if (product) {
            FIELD.splice(row, 1);
            FIELD.unshift(new Array(BLOCK_COLS).fill(0));
        }
    }
}


function hold() {
    if (canHold) {
        if (HOLD.length === 0) {
            HOLD[0] = MINOS.splice(0, 1)[0];
            refillMinos();
        }
        else {
            const tmp = MINOS[0]
            MINOS[0] = HOLD[0];
            HOLD[0] = tmp;
        }
        canHold = false;
    }
}


function mainLoop() {
    ctx.clearRect(0, 0, FIELD_W, FIELD_H);


    drawField();

    if (flame % (FPS - 1) === 0) {
        MINOS[0].move(0, 1, 0);
    }


    MINOS[0].update();
    if (MINOS[0].life === false) {
        MINOS.shift();
        refillMinos();
        canHold = true;
    }
    deleteLines();

    keyCount();
    flame++;
}

setInterval(mainLoop, 1000 / FPS);