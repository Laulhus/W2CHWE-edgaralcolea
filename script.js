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

context.fillRect(10, 10, 100, 100);
context.beginPath();
context.stroke();

console.log(grid);
