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


const keyStatus = {};
document.addEventListener("keydown", e => {
    if (!keyStatus[e.key]) keyStatus[e.key] = 1;
});
document.addEventListener("keyup", e => {
    keyStatus[e.key] = 0;
});

function keyCount() {
    for (const key in keyStatus) {
        if (keyStatus[key]) {
            keyStatus[key]++;
        }
    }
}

function checkKeyExe(keyName, sensitivity) {
    return keyStatus[keyName] % ~~(FPS / sensitivity) == 1;
}


const FIELD = [];
for (let row = 0; row < BLOCK_ROWS; row++) {
    FIELD[row] = [];
    for (let col = 0; col < BLOCK_COLS; col++) {
        FIELD[row][col] = 0;
    }
}



/**
 * 正方形の２次元配列を回転する関数
 * @param {Array} arr 
 * @param {number} r +1,-1: 時計回り,反時計回り 0:return
 * @returns {Array} 回転した配列
 */
function getRotate2dArr(arr, r) {
    if (Math.abs(r) !== 1) return arr;
    const size = arr.length;
    const newArr = [];
    for (let row = 0; row < size; row++) {
        newArr[row] = [];
        for (let col = 0; col < size; col++) {
            newArr[row][col] = 0;
        }
    }

    for (let row = 0; row < size; row++) {
        for (let col = 0; col < size; col++) {
            newArr[
                (1 - r) * (size - 1) / 2 + r * col
            ][
                (1 + r) * (size - 1) / 2 - r * row
            ] = arr[row][col];
        }
    }

    return newArr;
}


function drawBlock(i, col, row) {
    ctx.fillStyle = COLORS[i];
    ctx.fillRect(BLOCK_SIZE * col, BLOCK_SIZE * row, BLOCK_SIZE, BLOCK_SIZE);
    ctx.strokeStyle = "#888";
    ctx.lineWidth = 1;
    ctx.strokeRect(BLOCK_SIZE * col, BLOCK_SIZE * row, BLOCK_SIZE, BLOCK_SIZE);
}

function drawField() {
    for (let row = 0; row < BLOCK_ROWS; row++) {
        for (let col = 0; col < BLOCK_ROWS; col++) {
            drawBlock(FIELD[row][col], col, row);
        }
    }
}
