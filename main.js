/*This is only a prototype.
  Many fucntionalities are still not implemented
  (like a start button, the possibility of clicking on the canvas to
  give life to a cell and a grid size editor).
  Any type of feedback is appreciated.
*/

let size = 10; //size of a square
let board = [];

var canvas = document.getElementById("c");
canvas.width = 100;
canvas.height = 100;
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
    nextGeneration();
}

/*This is to check wheter a cell will be alive or dead in the next gen.
  Rules are on the wiki: https://en.wikipedia.org/wiki/Conway's_Game_of_Life*/
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
setInterval(update,2000);
