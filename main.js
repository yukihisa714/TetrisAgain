const FPS = 60;


const BLOCK_SIZE = 40;
const BLOCK_ROWS = 20;
const BLOCK_COLS = 10;
const FIELD_W = BLOCK_SIZE * BLOCK_COLS;
const FIELD_H = BLOCK_SIZE * BLOCK_ROWS;

const COLORS = ["#aaa", "skyblue", "yellow", "green", "red", "blue", "orange", "purple"];


const can = document.getElementById("canvas-field");
const ctx = can.getContext("2d");
can.width = FIELD_W;
can.height = FIELD_H;
can.style.background = COLORS[0];



const FIELD = [];
for (let row = 0; row < BLOCK_ROWS; row++) {
    FIELD[row] = [];
    for (let col = 0; col < BLOCK_COLS; col++) {
        FIELD[row][col] = 0;
    }
}







const mino = new Mino(1, 3, 0, 0, 5);


function mainLoop() {
    ctx.clearRect(0, 0, FIELD_W, FIELD_H);


    drawField();


    mino.update();

    keyCount();
}

setInterval(mainLoop, 1000 / FPS);