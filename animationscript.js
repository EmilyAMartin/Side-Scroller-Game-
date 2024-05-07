let img = new Image();
img.src = "./img/sheet.png";
img.onload = function() {
  init();
};

let canvas = document.querySelector('canvas');
let ctx = canvas.getContext('2d');

const scale = 2;
const width = 72;
const height = 300;
const scaledWidth = scale * width;
const scaledHeight = scale * height;
const cycleLoop = [0, 1, 0, 2];
let currentLoopIndex = 0;
let frameCount = 0;

function drawFrame(frameX, frameY, canvasX, canvasY) {
  ctx.drawImage(img,
                frameX * width, frameY * height, width, height,
                canvasX, canvasY, scaledWidth, scaledHeight);
}

function step() {
  frameCount++;
  if (frameCount < 12) {
    window.requestAnimationFrame(step);
    return;
  }
  frameCount = 0;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawFrame(cycleLoop[currentLoopIndex], 0, 0, 0);
  currentLoopIndex++;
  if (currentLoopIndex >= cycleLoop.length) {
    currentLoopIndex = 0;
  }
  window.requestAnimationFrame(step);
}

function init() {
  window.requestAnimationFrame(step);
}