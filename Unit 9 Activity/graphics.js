const canvas = document.getElementById("demo-canvas");
const ctx = canvas.getContext("2d");
const graphicsStatus = document.getElementById("graphics-status");

const rectButton = document.getElementById("rect-button");
const smileyButton = document.getElementById("smiley-button");
const linesButton = document.getElementById("lines-button");
const sceneButton = document.getElementById("scene-button");
const clearButton = document.getElementById("clear-button");

rectButton.addEventListener("click", drawRectangle);
smileyButton.addEventListener("click", drawSmiley);
linesButton.addEventListener("click", drawLines);
sceneButton.addEventListener("click", drawScene);
clearButton.addEventListener("click", clearCanvas);

drawScene();

function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  graphicsStatus.textContent = "Canvas cleared.";
}

function drawRectangle() {
  clearCanvas();
  ctx.fillStyle = "tomato";
  ctx.fillRect(40, 40, 160, 120);
  graphicsStatus.textContent = "Drew a filled rectangle using fillRect().";
}

function drawSmiley() {
  clearCanvas();
  ctx.strokeStyle = "tomato";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.arc(170, 150, 80, 0, Math.PI * 2, true);
  ctx.moveTo(220, 150);
  ctx.arc(170, 150, 50, 0, Math.PI, false);
  ctx.moveTo(145, 130);
  ctx.arc(140, 130, 8, 0, Math.PI * 2, true);
  ctx.moveTo(205, 130);
  ctx.arc(200, 130, 8, 0, Math.PI * 2, true);
  ctx.stroke();
  graphicsStatus.textContent = "Drew a smiley face using arcs and lines.";
}

function drawLines() {
  clearCanvas();
  ctx.strokeStyle = "green";

  for (let i = 0; i < 10; i += 1) {
    ctx.lineWidth = 1 + i;
    ctx.beginPath();
    ctx.moveTo(20 + i * 24, 30);
    ctx.lineTo(20 + i * 24, 220);
    ctx.stroke();
  }

  graphicsStatus.textContent = "Drew repeated lines with increasing line width.";
}

function drawScene() {
  clearCanvas();

  ctx.fillStyle = "#8ecae6";
  ctx.fillRect(0, 0, canvas.width, 220);

  ctx.fillStyle = "#8ac926";
  ctx.fillRect(0, 220, canvas.width, 140);

  ctx.fillStyle = "#ffd166";
  ctx.beginPath();
  ctx.arc(430, 70, 35, 0, Math.PI * 2);
  ctx.fill();

  ctx.strokeStyle = "#ffd166";
  for (let i = 0; i < 12; i += 1) {
    const angle = (Math.PI * 2 * i) / 12;
    ctx.beginPath();
    ctx.moveTo(430, 70);
    ctx.lineTo(430 + Math.cos(angle) * 55, 70 + Math.sin(angle) * 55);
    ctx.stroke();
  }

  ctx.fillStyle = "#d9a066";
  ctx.fillRect(160, 150, 180, 120);

  ctx.fillStyle = "#8d5524";
  ctx.fillRect(230, 205, 40, 65);

  ctx.fillStyle = "#9ad1ff";
  ctx.fillRect(185, 180, 35, 35);
  ctx.fillRect(280, 180, 35, 35);

  ctx.fillStyle = "#b23a48";
  ctx.beginPath();
  ctx.moveTo(145, 150);
  ctx.lineTo(250, 90);
  ctx.lineTo(355, 150);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = "#6a994e";
  ctx.fillRect(70, 170, 30, 100);
  ctx.beginPath();
  ctx.arc(85, 150, 45, 0, Math.PI * 2);
  ctx.fill();

  graphicsStatus.textContent = "Drew a simple house scene with the sun shining.";
}
