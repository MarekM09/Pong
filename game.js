var canvas;
var canvasContext;
var ballX = 50;
var ballSpeedX = 5;
var ballY = 50;
var ballSpeedY = 5;

var playerOneScore = 0;
var playerTwoScore = 0;
const WINNING_SCORE = 3;

var showingWinScreen = false;

var paddleLeftX = 10;
var paddleLeftY = 250;
var paddleRightX = 780;
var paddleRightY = 250;
const PADDLE_HEIGHT = 100;
const PADDLE_THICKNESS = 10;

function calculateMousePos(evt) {
  var rect = canvas.getBoundingClientRect();
  var root = document.documentElement;
  var mouseX = evt.clientX - rect.left - root.scrollLeft;
  var mouseY = evt.clientY - rect.top - root.scrollTop;

  return {
    x:mouseX,
    y:mouseY
  }
}

function handleMouseClick(evt) {
  if(showingWinScreen) {
    playerOneScore = 0;
    playerTwoScore = 0;
    showingWinScreen = false;
  }
}

window.onload = function() {
  canvas = document.getElementById('gameCanvas');
  canvasContext = canvas.getContext('2d');
  
  var framesPerSecond = 30;
  setInterval(function() {
    moveEverything();
    drawEverything();
  }, 1000 / framesPerSecond);

  canvas.addEventListener('mousedown', handleMouseClick);

  canvas.addEventListener('mousemove', function(evt) {
    var mousePos = calculateMousePos(evt);
    paddleLeftY = mousePos.y - (PADDLE_HEIGHT / 2);
  });
}

function ballReset() {
  if(playerOneScore >= WINNING_SCORE || playerTwoScore >= WINNING_SCORE) {
    showingWinScreen = true;
  }
  ballSpeedX *= -1;
  ballX = canvas.width / 2;
  ballY = canvas.height / 2;
}

function computerMovement() {
  var paddleRightYCenter = paddleRightY + (PADDLE_HEIGHT / 2);

  if(paddleRightYCenter < ballY - 20) {
    paddleRightY += 5;
  } else if(paddleRightYCenter > ballY + 20) {
    paddleRightY -= 5;    
  }
}

function moveEverything() {
  if(showingWinScreen) {
    return;
  }

  computerMovement();

  ballX += ballSpeedX;
  ballY += ballSpeedY;

  if(ballX > canvas.width) {
    if(ballY > paddleRightY && ballY < paddleRightY + PADDLE_HEIGHT) {
      ballSpeedX *= -1;

      var deltaY = ballY - (paddleRightY + PADDLE_HEIGHT / 2);
      ballSpeedY = deltaY * 0.35;
    } else {
      playerOneScore++;
      ballReset();
    }  
  }

  if(ballX < paddleLeftX) {
    if(ballY > paddleLeftY && ballY < paddleLeftY + PADDLE_HEIGHT) {
      ballSpeedX *= -1;

      var deltaY = ballY - (paddleLeftY + PADDLE_HEIGHT / 2);
      ballSpeedY = deltaY * 0.35;
    } else {
      playerTwoScore++;
      ballReset();
    }    
  }

  if(ballY > canvas.height || ballY < 0) {
    ballSpeedY *= -1;
  }
}

function drawNet() {
  for (var i = 10; i < canvas.height; i+=40) {
    colorRect(canvas.width / 2 - 1, i, 2, 20, 'white')
  }
}

function drawEverything() {
  // draw black board
  colorRect(0, 0, canvas.width, canvas.height, 'black'); 

  // Show win screen
  if(showingWinScreen) {
    canvasContext.fillStyle = 'white';

    if(playerOneScore >= WINNING_SCORE) {
      canvasContext.fillText("Left player won", 360, 250)
    } else
    if(playerTwoScore >= WINNING_SCORE) {
      canvasContext.fillText("Right player won", 360, 250)
    }
    
    canvasContext.fillText("click to continue", 360, 300)
    return;
  }

  drawNet();
  
  //left player paddle
  colorRect(paddleLeftX, paddleLeftY, PADDLE_THICKNESS, PADDLE_HEIGHT, 'white'); 

  //right player paddle
  colorRect(canvas.width - 20, paddleRightY, PADDLE_THICKNESS, PADDLE_HEIGHT, 'white'); 
  
  // draw a ball
  colorCircle(ballX, ballY, 10, 'white');

  // score board
  canvasContext.fillText(playerOneScore, 200, 100);
  canvasContext.fillText(playerTwoScore, canvas.width - 200, 100);  
}

function colorCircle(centerX, centerY, radius, drawColor) {
  canvasContext.fillStyle = drawColor;
  canvasContext.beginPath();
  canvasContext.arc(centerX, centerY, radius, 0, Math.PI * 2, true);
  canvasContext.fill();   
}

function colorRect(leftX, topY, width, height, drawColor) {
  canvasContext.fillStyle = drawColor;
  canvasContext.fillRect(leftX, topY, width, height)
}