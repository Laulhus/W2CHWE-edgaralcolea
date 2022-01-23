//  Variables Init

const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");

const resolution = 40;
canvas.width = 400;
canvas.height = 400;
const cols = canvas.width / resolution;
const rows = canvas.height / resolution;

//  Grid Rendering
function create2dArray() {
  return new Array(10).fill(null).map(() => new Array(10).fill(0));
}
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

//  renderNextGen function to draw alive cells functions

const grid = create2dArray();
const cells = initialRender(grid);
console.log(cells);
cells[0][4].alive = true;
cells[1][3].alive = true;
cells[1][2].alive = true;
cells[2][3].alive = true;
cells[3][1].alive = true;

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
  requestAnimationFrame(update);
}
requestAnimationFrame(update);
update();
