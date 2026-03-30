const AudioContextClass = window.AudioContext || window.webkitAudioContext;
const context = new AudioContextClass();
const pulseButton = document.getElementById("pulse-button");
const randomButton = document.getElementById("random-button");
const clearVisualsButton = document.getElementById("clear-visuals-button");
const statusOutput = document.getElementById("sound-vision-status");
const visionCanvas = document.getElementById("vision-canvas");
const visionContext = visionCanvas.getContext("2d");

const noteChoices = [220, 261.63, 293.66, 329.63, 392, 440, 523.25];
const circles = [];

pulseButton.addEventListener("click", function playPulse() {
  playTone(261.63, "sine", "tomato");
});

randomButton.addEventListener("click", function playRandom() {
  const frequency = noteChoices[Math.floor(Math.random() * noteChoices.length)];
  playTone(frequency, "triangle", randomColor());
});

clearVisualsButton.addEventListener("click", function clearVisuals() {
  circles.length = 0;
  drawScene();
  statusOutput.textContent = "Visuals cleared.";
});

drawScene();
requestAnimationFrame(animate);

function playTone(frequency, type, color) {
  if (context.state === "suspended") {
    context.resume();
  }

  const oscillator = context.createOscillator();
  const gain = context.createGain();

  oscillator.type = type;
  oscillator.frequency.setValueAtTime(frequency, context.currentTime);
  gain.gain.setValueAtTime(0, context.currentTime);
  gain.gain.linearRampToValueAtTime(0.25, context.currentTime + 0.02);
  gain.gain.linearRampToValueAtTime(0, context.currentTime + 0.45);

  oscillator.connect(gain);
  gain.connect(context.destination);
  oscillator.start();
  oscillator.stop(context.currentTime + 0.5);

  circles.push({
    x: Math.random() * visionCanvas.width,
    y: Math.random() * visionCanvas.height,
    radius: 10,
    growth: frequency / 160,
    alpha: 1,
    color: color
  });

  statusOutput.textContent = "Played " + frequency.toFixed(2) + " Hz and created a matching visual pulse.";
}

function animate() {
  drawScene();

  for (let i = circles.length - 1; i >= 0; i -= 1) {
    const circle = circles[i];
    circle.radius += circle.growth;
    circle.alpha -= 0.015;

    if (circle.alpha <= 0) {
      circles.splice(i, 1);
      continue;
    }

    visionContext.save();
    visionContext.globalAlpha = circle.alpha;
    visionContext.fillStyle = circle.color;
    visionContext.beginPath();
    visionContext.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2);
    visionContext.fill();
    visionContext.restore();
  }

  requestAnimationFrame(animate);
}

function drawScene() {
  visionContext.fillStyle = "#0f172a";
  visionContext.fillRect(0, 0, visionCanvas.width, visionCanvas.height);

  visionContext.fillStyle = "rgba(255,255,255,0.08)";
  for (let i = 0; i < 40; i += 1) {
    visionContext.fillRect(i * 16, 0, 1, visionCanvas.height);
  }
}

function randomColor() {
  const colors = ["#ff595e", "#ffca3a", "#8ac926", "#1982c4", "#6a4c93"];
  return colors[Math.floor(Math.random() * colors.length)];
}
