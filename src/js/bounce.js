(function () {
  const canvas = document.getElementById('canvas');
  const context = canvas.getContext('2d');
  let x = canvas.width / 2;
  let y = canvas.height - 40;
  let dx = 2;
  let dy = -2;

  const ballRadius = 10;

  function drawBall() {
    context.beginPath();
    context.arc(x, y, ballRadius, 0, Math.PI * 2);
    context.fillStyle = '#0095dd';
    context.fill();
    context.closePath();
  }

  function draw() {
    context.clearRect(0, 0 , canvas.width, canvas.height);
    drawBall();
    x += dx;
    y += dy;


    if (x + dx < ballRadius || x + dx  > canvas.width - ballRadius) {
      dx = -dx;
    }

    if (y + dy < ballRadius || y + dy > canvas.height - ballRadius) {
      dy = -dy;
    }
  }

  setInterval(draw, 10);
}());
