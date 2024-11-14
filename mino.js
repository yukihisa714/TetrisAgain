class Mino {
    constructor(i, x, y, r, sensitivity, life) {
        this.i = i;
        this.x = x;
        this.y = y;
        this.r = r;
        this.normalizeR(); // rは必ず0~3 (負にはならない)
        this.sensitivity = sensitivity;
        this.life = life;

        this.size = MINOS_SHAPE[i].length;
        this.shape = [];
        for (let row = 0; row < this.size; row++) {
            this.shape[row] = [];
            for (let col = 0; col < this.size; col++) {
                this.shape[row][col] = MINOS_SHAPE[i][row][col];
            }
        }
    }

    normalizeR() {
        this.r = (this.r % 4 + 4) % 4;
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

    fixOnField() {
        for (let row = 0; row < this.size; row++) {
            for (let col = 0; col < this.size; col++) {
                if (this.shape[row][col]) {
                    FIELD[this.y + row][this.x + col] = this.shape[row][col];
                }
            }
        }
        this.life = false;
    }

    /**
     * 衝突判定
     * @param {number} x 移動
     * @param {number} y 移動
     * @param {number} r +1,-1: 時計,反時計回り
     * @returns {boolean} 衝突すればfalse
     */
    checkCollision(x, y, r) {
        const nextShape = getRotate2dArr(this.shape, r);
        for (let row = 0; row < this.size; row++) {
            for (let col = 0; col < this.size; col++) {
                if (nextShape[row][col]) {
                    if (FIELD[row + this.y + y] === undefined) return false;
                    if (FIELD[row + this.y + y][col + this.x + x] === undefined) return false;
                    if (FIELD[row + this.y + y][col + this.x + x]) return false;
                }
            }
        }
        return true;
    }


    /**
     * Super Rotation System
     * @param {number} x 
     * @param {number} y 
     * @param {number} r 
     * @returns {{x: number, y: number, r: number}}
     */
    SRS(x, y, r) {
        // Iミノのとき
        if (this.i === 1) {
            const r0 = this.r;
            const r1 = (r0 + r + 4) % 4;

            const a = ((r0 - 1) % 2) * ((r + 1) % 2 + 1) - r * (2 - (r1 / 2)) * Math.abs((r0 - 2) % 2);
            const b = a + 3 * ((1 - r0) % 2 + r * (r0 % 2));
            const c = a + 3 * r * Math.floor(r0 / 3);
            const d = ((r + 1) / 2 + 1) * ((r0 - 2) % 2) - r * ((r0 - 1) % 2) * (2 - (r + 1) / 2);
            const e = b - 3 * r * Math.floor(r0 / 3);
            const f = d + 3 * (((2 - r0) % 2) + r * ((r0 - 1) % 2));

            if (this.checkCollision(x, y, r)) {
                // console.log("SRS: 0");
                return { x: x, y: y, r: r };
            }
            if (this.checkCollision(x + a, y, r)) {
                // console.log("SRS: 1");
                return { x: x + a, y: y, r: r };
            }
            if (this.checkCollision(x + b, y, r)) {
                // console.log("SRS: 2");
                return { x: x + b, y: y, r: r };
            }
            if (this.checkCollision(x + c, y + d, r)) {
                // console.log("SRS: 3");
                return { x: x + c, y: y + d, r: r };
            }
            if (this.checkCollision(x + e, y + f, r)) {
                // console.log("SRS: 4");
                return { x: x + e, y: y + f, r: r };
            }
            // console.log("false");
            return { x: 0, y: 0, r: 0 };
        }
        // Iミノ以外のとき
        else {
            const p = ((this.r - 1) % 2) * r + ((2 - this.r) % 2);
            const q = 2 * (this.r % 2) - 1;

            if (this.checkCollision(x, y, r)) {
                // console.log("SRS: 0");
                return { x: x, y: y, r: r };
            }
            if (this.checkCollision(x + p, y, r)) {
                // console.log("SRS: 1");
                return { x: x + p, y: y, r: r };
            }
            if (this.checkCollision(x + p, y + q, r)) {
                // console.log("SRS: 2");
                return { x: x + p, y: y + q, r: r };
            }
            if (this.checkCollision(x, y - 2 * q, r)) {
                // console.log("SRS: 3");
                return { x: x, y: y - 2 * q, r: r };
            }
            if (this.checkCollision(x + p, y - 2 * q, r)) {
                // console.log("SRS: 4");
                return { x: x + p, y: y - 2 * q, r: r };
            }
            // console.log("false");
            return { x: 0, y: 0, r: 0 };
        }
    }


    /**
     * ミノを移動するメソッド
     * @param {number} x 移動
     * @param {number} y 移動
     * @param {number} r +1,-1: 時計,反時計回り
     */
    move(x, y, r) {
        // if (!this.checkCollision(x, y, r)) return false;
        let newShape;

        if (r === 0) {
            if (this.checkCollision(x, y, r)) {
                this.x += x;
                this.y += y;
                this.r += r;
                this.normalizeR();
            }
            newShape = getRotate2dArr(this.shape, r);
        }
        else {
            const SrsResults = this.SRS(x, y, r);

            this.x += SrsResults.x;
            this.y += SrsResults.y;
            this.r += SrsResults.r;
            this.normalizeR();

            newShape = getRotate2dArr(this.shape, SrsResults.r);
        }



        // 保存した形状を適用
        for (let row = 0; row < this.size; row++) {
            for (let col = 0; col < this.size; col++) {
                this.shape[row][col] = newShape[row][col];
            }
        }

    }


    drop() {
        while (this.checkCollision(0, 1, 0)) {
            this.move(0, 1, 0);
        }
        this.fixOnField();
    }


    update() {

        if (checkKeyExe("ArrowLeft", this.sensitivity)) {
            this.move(-1, 0, 0);
        }
        if (checkKeyExe("ArrowRight", this.sensitivity)) {
            this.move(1, 0, 0);
        }
        if (checkKeyExe("ArrowUp", this.sensitivity)) {
            this.move(0, -1, 0);
        }
        if (checkKeyExe("ArrowDown", this.sensitivity)) {
            this.move(0, 1, 0);
        }

        if (checkKeyExe("z", this.sensitivity)) {
            this.move(0, 0, -1);
        }
        if (checkKeyExe("x", this.sensitivity)) {
            this.move(0, 0, 1);
        }

        if (checkKeyExe(" ", this.sensitivity)) {
            this.drop();
        }


        this.draw();
    }
}