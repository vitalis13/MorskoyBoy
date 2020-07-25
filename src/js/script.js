const CELL_SIZE = 25;
const FIELD_SIZE =25;

const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');

canvas.width = 1000;
canvas.height = 550;

const mouse = getMouse(canvas);



// setInterval(() => console.log(player.getCoordinats(mouse)));




drawGrid();




const game = new Game();

function clearCanvas() {
    canvas.width |= 0
}

function drawGrid() {

    context.strokeStyle = 'blue';
    context.lineWidth = 0.5;

    for (let i = 0; i < canvas.width / CELL_SIZE; i++) {
        context.beginPath();
        context.moveTo(i * CELL_SIZE, 0);
        context.lineTo(i * CELL_SIZE, canvas.height);
        context.stroke();
    }
    for (let i = 0; i < canvas.height / CELL_SIZE; i++) {
        context.beginPath();
        context.moveTo(0, i * CELL_SIZE);
        context.lineTo(canvas.width, i * CELL_SIZE);
        context.stroke();
    }

    context.lineWidth = 2;
    context.strokeStyle = 'red';

    context.beginPath();
    context.moveTo(0, 70);
    context.lineTo(canvas.width, 70);
    context.stroke();
}
