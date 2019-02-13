(function(){
  const canvas = document.getElementById("canvas");
  const context = canvas.getContext("2d");

  const ballRadius = 10;
  let x = canvas.width/2;
  let y = canvas.height-30;

  let dx = 2;
  let dy = -2;

  const paddleHeight = 10;
  const paddleWidth = 75;
  let paddleX = (canvas.width-paddleWidth)/2;

  let rightPressed = false;
  let leftPressed = false;

  const brickRowCount = 7;
  const brickColumnCount = 3;
  const brickWidth = 75;
  const brickHeight = 20;
  const brickPadding = 10;
  const brickOffsetTop = 30;
  const brickOffsetLeft = 30;

  let bricks = [];

  let score = 0;
  let lives = 3;

  for(let column = 0; column < brickColumnCount; column++) {
    bricks[column] = [];
    for(let row = 0; row < brickRowCount; row++) {
      bricks[column][row] = { x: 0, y: 0, status: 1 };
    }
  }


  /*==============================================================*/
   /* EVENT HANDLERS                                             */
   /*============================================================*/

  function keyDownHandler(e) {
    if(e.key === 'Right' || e.key === 'ArrowRight') {
      rightPressed = true;
    }
    else if(e.key === "Left" || e.key === 'ArrowLeft') {
      leftPressed = true;
    }
  }
  function keyUpHandler(e) {
    if(e.key === 'Right' || e.key === 'ArrowRight') {
      rightPressed = false;
    }
    else if(e.key === "Left" || e.key === 'ArrowLeft') {
      leftPressed = false;
    }
  }

  function mouseMoveHandler(e) {
    var relativeX = e.clientX - canvas.offsetLeft;
    if(relativeX > 0 && relativeX < canvas.width) {
      paddleX = relativeX - paddleWidth/2;
    }
  }


  /*==============================================================*/
  /* COLLISION DETECTION                                         */
  /*============================================================*/

  function collisionDetection() {
    for(let column = 0; column < brickColumnCount; column++) {
      for(let row = 0; row < brickRowCount; row++) {
        let brick = bricks[column][row];
        if(brick.status == 1) {
          if(x > brick.x && x < brick.x+brickWidth && y > brick.y && y < brick.y+brickHeight) {
            dy = -dy;
            brick.status = 0;
            score += 2;
            if(score == 2 * brickRowCount*brickColumnCount) {
              alert("YOU WIN, CONGRATS!");
              document.location.reload();
            }
          }
        }
      }
    }
  }

  /*==============================================================*/
  /* DRAW FUNCTIONS                                              */
  /*============================================================*/

  function drawScore() {
    context.font = "16px Arial";
    context.fillStyle = "#0095DD";
    context.fillText("Score: " + score, 8, 20);
  }

  function drawBall() {
    context.beginPath();
    context.arc(x, y, ballRadius, 0, Math.PI*2);
    context.fillStyle = "#0095DD";
    context.fill();
    context.closePath();
  }

  function drawPaddle() {
    context.beginPath();
    context.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
    context.fillStyle = "#0095DD";
    context.fill();
    context.closePath();
  }

  function drawBricks() {
    for(let column = 0; column < brickColumnCount; column++) {
      for(let row = 0; row < brickRowCount; row++) {
        if(bricks[column][row].status == 1) {
          let brickX = (row*(brickWidth+brickPadding))+brickOffsetLeft;
          let brickY = (column*(brickHeight+brickPadding))+brickOffsetTop;
          bricks[column][row].x = brickX;
          bricks[column][row].y = brickY;
          context.beginPath();
          context.rect(brickX, brickY, brickWidth, brickHeight);
          context.fillStyle = "#0095DD";
          context.fill();
          context.closePath();
        }
      }
    }
  }


  function drawLives() {
    context.font = "16px Arial";
    context.fillStyle = "#0095DD";
    context.fillText("Lives: "+lives, canvas.width-65, 20);
  }


  /*==============================================================*/
  /* MAIN GAME                                                   */
  /*============================================================*/

  function draw() {
    context.clearRect(0, 0, canvas.width, canvas.height);

    drawBricks();
    drawBall();
    drawPaddle();
    drawLives();
    drawScore();
    collisionDetection();

    if (x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
      dx = -dx;
    }

    if (y + dy < ballRadius) {
      dy = -dy;
    } else if (y + dy > canvas.height-ballRadius) {
      if(x > paddleX && x < paddleX + paddleWidth) {
        dy = -dy;
      }
      else {
        lives -= 1;
        if (!lives) {
          alert("GAME OVER");
          document.location.reload();
        } else {
          x = canvas.width/2;
          y = canvas.height-30;
          dx = 2;
          dy = -2;
          paddleX = (canvas.width-paddleWidth)/2;
        }
      }
    }

    if (rightPressed && paddleX < canvas.width-paddleWidth) {
      paddleX += 7;
    }
    else if (leftPressed && paddleX > 0) {
      paddleX -= 7;
    }

    x += dx;
    y += dy;

    requestAnimationFrame(draw);
  }

  document.addEventListener("keydown", keyDownHandler, false);
  document.addEventListener("keyup", keyUpHandler, false);
  document.addEventListener("mousemove", mouseMoveHandler, false);
  draw();
}());