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


function drawBlock(i, col, row) {
    ctx.fillStyle = COLORS[i];
    ctx.fillRect(BLOCK_SIZE * col, BLOCK_SIZE * row, BLOCK_SIZE, BLOCK_SIZE);
}

function drawField() {
    for (let row = 0; row < BLOCK_ROWS; row++) {
        for (let col = 0; col < BLOCK_ROWS; col++) {
            drawBlock(FIELD[row][col], col, row);
        }
    }
}
