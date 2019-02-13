
const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
const x = canvas.width / 2;
const y = canvas.height - 40;

function draw() {
  context.beginPath();
  context.arc(x, y, 10, 0, Math.PI * 2);
  context.fillStyle = '#0095dd';
  context.fill();
  context.closePath();
};


setInterval(draw, 10);