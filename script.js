//  Variables Init

const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");

const resolution = 40;
canvas.width = 400;
canvas.height = 400;
const cols = canvas.width / resolution;
const rows = canvas.height / resolution;
let cells = null;

let intervalID;

//  Adds cell objects to 2D array
function initialRender(area) {
  const cellArray = [];
  for (let col = 0; col < area.length; col++) {
    cellArray.push(area[col]);
    for (let row = 0; row < area[col].length; row++) {
      const cell = {
        x: col,
        y: row,
        alive: false,
      };
      cellArray[col][row] = cell;
      context.beginPath();
      context.rect(col * resolution, row * resolution, resolution, resolution);
      context.stroke();
    }
  }
  return cellArray;
}

//  Grid Rendering
function renderNextGen() {
  for (const row of cells) {
    for (const cell of row) {
      context.beginPath();
      context.rect(
        cell.x * resolution,
        cell.y * resolution,
        resolution,
        resolution
      );
      context.fillStyle = cell.alive ? "black" : "white";
      context.stroke();
      context.fill();
    }
  }
}
function selectCell() {
  canvas.addEventListener("click", (event) => {
    const cellCol = Math.floor(
      (event.clientX - canvas.offsetLeft) / resolution
    );
    const cellRow = Math.floor((event.clientY - canvas.offsetTop) / resolution);
    cells[cellCol][cellRow].alive = true;
    renderNextGen();
  });
}
function create2dArray() {
  return new Array(10)
    .fill(null)
    .map(() => new Array(10).fill(0).map(() => selectCell()));
}
//  renderNextGen function to draw alive cells functions

const grid = create2dArray();
cells = initialRender(grid);

renderNextGen();

//  Function to check alive neighbours

function countAliveNeighbours() {
  const nextGenCells = cells.map((arr) => [...arr]);
  for (let col = 0; col < cells.length; col += 1) {
    for (let row = 0; row < cells[col].length; row += 1) {
      const cell = nextGenCells[col][row];
      cell.aliveNeighbours = 0;
      for (let i = -1; i < 2; i += 1) {
        for (let j = -1; j < 2; j += 1) {
          if (
            col + i !== -1 &&
            row + j !== -1 &&
            col + i < cols &&
            row + j < rows
          ) {
            if (!(i === 0 && j === 0)) {
              const neighbour = cells[col + i][row + j];
              if (neighbour.alive) {
                cell.aliveNeighbours += 1;
              }
            }
          }
        }
      }
    }
  }
  return nextGenCells;
}

//  Applies rules of cell survival and changes status accordingly.

function applyRules() {
  for (const col of cells) {
    for (const cell of col) {
      if (cell.alive && cell.aliveNeighbours < 2) cell.alive = false;
      else if (cell.alive && cell.aliveNeighbours > 3) cell.alive = false;
      else if (!cell.alive && cell.aliveNeighbours === 3) cell.alive = true;
    }
  }
}

//  Updates cell generation and renders it

function update() {
  countAliveNeighbours();
  applyRules();
  renderNextGen();
}

//  Starts the game

function startGame() {
  if (!intervalID) {
    intervalID = setInterval(update, 500);
  }
}
//  Stops the game

function stopGame() {
  clearInterval(intervalID);
  intervalID = null;
}

//  Resets the game

function resetGame() {
  clearInterval(intervalID);
  intervalID = null;
  cells = initialRender(grid);
  renderNextGen();
}
//  DOM click events to manage the game

document.querySelector(".start-button").addEventListener("click", startGame);
document.querySelector(".stop-button").addEventListener("click", stopGame);
document.querySelector(".reset-button").addEventListener("click", resetGame);
