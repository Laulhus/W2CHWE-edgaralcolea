const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");

const resolution = 40;
canvas.width = 400;
canvas.height = 400;
const cols = canvas.width / resolution;
const rows = canvas.height / resolution;

function create2dArray() {
  return new Array(10).fill(null).map(() => new Array(10).fill(0));
}

function initialRender(area) {
  const cellArray = [];
  for (let col = 0; col < area.length; col++) {
    for (let row = 0; row < area[col].length; row++) {
      const cell = {
        x: col,
        y: row,
        alive: 0,
      };
      cellArray.push(cell);
      context.beginPath();
      context.rect(col * resolution, row * resolution, resolution, resolution);
      context.stroke();
    }
  }
  return cellArray;
}

const grid = create2dArray();
console.log(grid);
const cells = initialRender(grid);
cells[5].alive = 1;
function nextGen(area) {
  for (const cell of cells) {
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
console.log(cells);
nextGen();
