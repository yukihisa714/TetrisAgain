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


/**
 * 正方形の２次元配列を回転する関数
 * @param {Array} arr 
 * @param {number} r +1,-1: 時計回り,反時計回り
 * @returns {Array} 回転した配列
 */
function rotate2dArr(arr, r) {
    const newArr = [];
    for (let row = 0; row < arr.length; row++) {
        newArr[row] = [];
        for (let col = 0; col < arr.length; col++) {
            newArr[row][col] = 0;
        }
    }

    for (let row = 0; row < arr.length; row++) {
        for (let col = 0; col < arr.length; col++) {
            newArr[
                (1 - r) * (arr.length - 1) / 2 + r * col
            ][
                (1 + r) * (arr.length - 1) / 2 - r * row
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
