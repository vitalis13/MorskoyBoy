const CELL_SIZE = 25;
const FIELD_SIZE =25;

const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');

canvas.width = 1000;
canvas.height = 550;

const player = new Topology({
    offsetX: 50,
    offsetY: 100
});

player
    .addSheeps(
        {x: 0, y: 0, direct: 0, size: 3},
        {x: 0, y: 2, direct: 1, size: 4},
    )
    .addChecks(
        {x: 5, y: 5},
        {x: 5, y: 4}
    );


drawGrid();


player.draw(context);
player.drawSheep(context,{x: 0, y: 0, direct: 0, size: 3});
player.drawCheck(context,{x: 5, y: 5});

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
