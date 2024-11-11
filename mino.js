class Mino {
    constructor(i, x, y, r, sensitivity) {
        this.i = i;
        this.x = x;
        this.y = y;
        this.r = r;
        this.sensitivity = sensitivity;

        this.size = MINOS_SHAPE[i].length;
        this.shape = [];
        for (let row = 0; row < this.size; row++) {
            this.shape[row] = [];
            for (let col = 0; col < this.size; col++) {
                this.shape[row][col] = MINOS_SHAPE[i][row][col];
            }
        }
        console.log(this.shape);
    }

    draw() {
        for (let row = 0; row < this.size; row++) {
            for (let col = 0; col < this.size; col++) {
                if (this.shape[row][col]) {
                    drawBlock(this.i, this.x + col, this.y + row);
                }
            }
        }
    }

    checkCollision(x, y, r) {

    }

    /**
     * 移動するメソッド
     * @param {number} x 
     * @param {number} y 
     */
    move(x, y) {
        this.x += x;
        this.y += y;
    }

    /**
     * ミノを90度回転するメソッド
     * @param {number} r +1:時計回り -1:反時計回り
     */
    rotate(r) {
        // 回転を更新
        this.r += r;

        const newShape = rotate2dArr(this.shape, r);

        // 保存した形状を適用
        for (let row = 0; row < this.size; row++) {
            for (let col = 0; col < this.size; col++) {
                this.shape[row][col] = newShape[row][col];
            }
        }
    }

    update() {

        if (keyStatus["ArrowLeft"] % ~~(FPS / this.sensitivity) == 1) {
            this.move(-1, 0);
        }
        if (keyStatus["ArrowRight"] % ~~(FPS / this.sensitivity) == 1) {
            this.move(1, 0);
        }
        if (keyStatus["ArrowUp"] % ~~(FPS / this.sensitivity) == 1) {
            this.move(0, -1);
        }
        if (keyStatus["ArrowDown"] % ~~(FPS / this.sensitivity) == 1) {
            this.move(0, 1);
        }

        if (keyStatus["z"] % ~~(FPS / this.sensitivity) == 1) {
            this.rotate(-1);
        }
        if (keyStatus["x"] % ~~(FPS / this.sensitivity) == 1) {
            this.rotate(1);
        }


        this.draw();
    }
}