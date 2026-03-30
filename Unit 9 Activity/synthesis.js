const AudioContextClass = window.AudioContext || window.webkitAudioContext;
const context = new AudioContextClass();
const gain = context.createGain();
const waveTypeInput = document.getElementById("wave-type");
const frequencyInput = document.getElementById("frequency");
const startToneButton = document.getElementById("start-tone-button");
const muteButton = document.getElementById("mute-button");
const stopToneButton = document.getElementById("stop-tone-button");
const synthStatus = document.getElementById("synth-status");
const pianoKeys = document.querySelectorAll("#piano-keys button");

let oscillator = null;
let muted = true;

gain.connect(context.destination);
gain.gain.setValueAtTime(0, context.currentTime);
updateSynthStatus();

startToneButton.addEventListener("click", startTone);
muteButton.addEventListener("click", toggleMute);
stopToneButton.addEventListener("click", stopTone);
waveTypeInput.addEventListener("change", updateOscillator);
frequencyInput.addEventListener("input", updateOscillator);

pianoKeys.forEach(function registerKey(button) {
  button.addEventListener("click", function playPianoNote() {
    playShortTone(Number(button.dataset.note), waveTypeInput.value, 0.35);
  });
});

function ensureRunningContext() {
  if (context.state === "suspended") {
    context.resume();
  }
}

function startTone() {
  ensureRunningContext();

  if (!oscillator) {
    oscillator = context.createOscillator();
    oscillator.connect(gain);
    oscillator.start();
  }

  updateOscillator();
  muted = false;
  gain.gain.setValueAtTime(0.2, context.currentTime);
  updateSynthStatus();
}

function updateOscillator() {
  if (!oscillator) {
    updateSynthStatus();
    return;
  }

  oscillator.type = waveTypeInput.value;
  oscillator.frequency.setValueAtTime(Number(frequencyInput.value), context.currentTime);
  updateSynthStatus();
}

function toggleMute() {
  ensureRunningContext();
  muted = !muted;
  gain.gain.setValueAtTime(muted ? 0 : 0.2, context.currentTime);
  updateSynthStatus();
}

function stopTone() {
  if (oscillator) {
    oscillator.stop();
    oscillator.disconnect();
    oscillator = null;
  }

  muted = true;
  gain.gain.setValueAtTime(0, context.currentTime);
  updateSynthStatus();
}

function playShortTone(frequency, type, volume) {
  ensureRunningContext();
  const tempOscillator = context.createOscillator();
  const tempGain = context.createGain();

  tempOscillator.type = type;
  tempOscillator.frequency.setValueAtTime(frequency, context.currentTime);
  tempGain.gain.setValueAtTime(0, context.currentTime);
  tempGain.gain.linearRampToValueAtTime(volume, context.currentTime + 0.02);
  tempGain.gain.linearRampToValueAtTime(0, context.currentTime + 0.35);

  tempOscillator.connect(tempGain);
  tempGain.connect(context.destination);
  tempOscillator.start();
  tempOscillator.stop(context.currentTime + 0.4);
}

function updateSynthStatus() {
  synthStatus.textContent =
    "Wave: " + waveTypeInput.value +
    " | Frequency: " + frequencyInput.value + " Hz" +
    " | Tone active: " + (oscillator !== null) +
    " | Muted: " + muted;
}
