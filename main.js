let size = 10;
let board = [];

var canvas = document.getElementById("c");
canvas.width = 400;
canvas.height = 400;
var ctx = canvas.getContext("2d");

function generate(){
    for(let i = 0 ; i < canvas.width; i+= size){
        for(let j = 0; j < canvas.height; j+= size){
            let alive = Math.random();
            if(alive >= 0.8){
                ctx.fillStyle = "black";
            }
            else{
                ctx.fillStyle = "white";
            }
            board.push({x: i, y: j, color: ctx.fillStyle})
            ctx.fillRect(i, j, size, size);
        }
    }
}

function update(){
    render();
}


function isAlive(x, y){
    let alive = 0;

    if(ctx.getImageData(x - 1, y, 1, 1).data[0] === 0 && ctx.getImageData(x - 1, y, 1, 1).data[3] !== 0){
        alive+=1;
    }
    if(ctx.getImageData(x + 1, y, 1, 1).data[0] === 0 && ctx.getImageData(x + 1, y , 1, 1).data[3] !== 0){
        alive+=1;
    }
    if(ctx.getImageData(x, y + size, 1, 1).data[0] === 0 && ctx.getImageData(x, y + size, 1, 1).data[3] !== 0 ){
        alive+=1;
    }
    if(ctx.getImageData(x, y - size, 1, 1).data[0] === 0 && ctx.getImageData(x, y - size, 1, 1).data[3] !== 0 ){
        alive+=1;
    }
    if(ctx.getImageData(x + 1, y + size, 1, 1).data[0] === 0 && ctx.getImageData(x + 1, y + size, 1, 1).data[3] !== 0 ){
        alive+=1;
    }
    if(ctx.getImageData(x - 1, y + size, 1, 1).data[0] === 0 && ctx.getImageData(x - 1, y + size, 1, 1).data[3] !== 0 ){
        alive+=1;
    }
    if(ctx.getImageData(x + 1, y - size, 1, 1).data[0] === 0 && ctx.getImageData(x + 1, y - size, 1, 1).data[3] !== 0 ){
        alive+=1;
    }
    if(ctx.getImageData(x - 1, y - size, 1, 1).data[0] === 0 && ctx.getImageData(x - 1, y - size, 1, 1).data[3] !== 0 ){
        alive += 1;
    }
    return alive;
}

function nextGeneration(){
    for(let i = 0; i < board.length; i++){
        if(isAlive(board[i].x, board[i].y) < 2){
            board[i].color = "white";
        }
        if(isAlive(board[i].x, board[i].y) === 3 || isAlive(board[i].x, board[i].y) === 2){
            board[i].color = "black";
        }
        if(isAlive(board[i].x, board[i].y) > 3){
            board[i].color = "white";
        }
    }
}


function render(){
    for(let i = 0; i < board.length; i++){
        ctx.fillStyle = board[i].color;
        ctx.fillRect(board[i].x, board[i].y, size, size);
    }
}


generate();
setInterval(update,5000);
setInterval(nextGeneration,5000);
