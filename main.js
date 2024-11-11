





FIELD[5][5] = 1;



const mino = new Mino(3, 3, 0, 0, 5);


function mainLoop() {
    ctx.clearRect(0, 0, FIELD_W, FIELD_H);


    drawField();


    mino.update();

    keyCount();
}

setInterval(mainLoop, 1000 / FPS);