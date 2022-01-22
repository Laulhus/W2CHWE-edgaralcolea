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
const grid = create2dArray();
console.log(grid);
console.log(cols, rows, grid);

function render(area) {
  for (let col = 0; col < area.length; col++) {
    for (let row = 0; row < area[col].length; row++) {
      //  const cell = grid[col][row];

      context.beginPath();
      context.rect(col * resolution, row * resolution, resolution, resolution);
      context.stroke();
    }
  }
}
render(grid);
