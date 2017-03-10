var canvas;
var canvasContext;
var ballX = 50;

window.onload = function() {
  canvas = document.getElementById('gameCanvas');
  canvasContext = canvas.getContext('2d');
  
  var framesPerSecond = 30;
  setInterval(function() {
    moveEverything();
    drawEverything();
  }, 1000 / framesPerSecond);
}

function moveEverything() {
  ballX = ballX + 5;
}

function drawEverything() {
  canvasContext.fillStyle = 'black';
  canvasContext.fillRect(0, 0, canvas.width, canvas.height)
  canvasContext.fillStyle = 'white';
  canvasContext.fillRect(ballX, 300, 10, 10);
  canvasContext.fillRect(10, 250, 10, 100);
}