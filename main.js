/*This is only a prototype.
  Many fucntionalities are still not implemented
  (like a start button, the possibility of clicking on the canvas to
  give life to a cell and a grid size editor).
  Any type of feedback is appreciated.
*/

let size = 5; //size of a square
let board = [];
let clonedBoard = [];
let width, height;

const canvas = document.getElementById("c");
width = canvas.width = 600;
height = canvas.height = 600;
const ctx = canvas.getContext("2d");

function generate(){
    for(let x = -size ; x < width + size; x+= size){
        board[x] = [];
        clonedBoard[x] = [];
        for (let y = -size; y < height + size; y += size) {
            ctx.fillStyle = Math.random() > .5 ? "black" : "white";
            board[x][y] = ctx.fillStyle === "#000000";
            ctx.fillRect(x, y, size, size);
        }
    }
}


//Rules are on the wiki: https://en.wikipedia.org/wiki/Conway's_Game_of_Life 
function update() {
    for (let x = 0; x < width; x += size) {
      for (let y = 0; y < height; y += size) {
        let isAlive = board[x][y];
  
        // Count the alive neighbours
        const neighbours =
          board[x-size][y-size] + board[x][y-size] + board[x+size][y-size] + // up row
          board[x-size][y] + board[x+size][y] + // middle row
          board[x-size][y+size] + board[x][y+size] + board[x+size][y+size]; // down row
  
        // Algorithm
        if (isAlive) {
          if (neighbours > 3) { isAlive = 0; } // Any live cell with more than three live neighbours dies, as if by overpopulation.
          else if (neighbours > 1) { isAlive = 1; } // Any live cell with two or three live neighbours lives on to the next generation.
          else { isAlive = 0; } // Any live cell with fewer than two live neighbours dies, as if caused by underpopulation.
  
        } else if (neighbours === 3) {
          isAlive = 1; // Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.
        }
  
        // Render
        clonedBoard[x][y] = isAlive;
        ctx.fillStyle = isAlive ? "black" : "white";
        ctx.fillRect(x, y, size, size);
      }
    }
  
    // Assign the cloned board to the real one
    for (let x = -size; x < width + size; x += size) {
      board[x] = clonedBoard[x].slice();
    }
  }



generate();
setInterval(update,60);
