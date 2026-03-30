const audioElement = document.getElementById("my-audio");
const playButton = document.getElementById("play-button");
const pauseButton = document.getElementById("pause-button");
const loopButton = document.getElementById("loop-button");
const muteButton = document.getElementById("mute-button");
const controlsButton = document.getElementById("controls-button");
const jumpButton = document.getElementById("jump-button");
const startTimeInput = document.getElementById("start-time");
const audioStatus = document.getElementById("audio-status");

createDemoAudio();
updateStatus();

playButton.addEventListener("click", function playAudio() {
  audioElement.play();
  updateStatus();
});

pauseButton.addEventListener("click", function pauseAudio() {
  audioElement.pause();
  updateStatus();
});

loopButton.addEventListener("click", function toggleLoop() {
  audioElement.loop = !audioElement.loop;
  updateStatus();
});

muteButton.addEventListener("click", function toggleMute() {
  audioElement.muted = !audioElement.muted;
  updateStatus();
});

controlsButton.addEventListener("click", function toggleControls() {
  audioElement.controls = !audioElement.controls;
  updateStatus();
});

jumpButton.addEventListener("click", function jumpToTime() {
  audioElement.currentTime = Number(startTimeInput.value);
  updateStatus();
});

audioElement.addEventListener("timeupdate", updateStatus);
audioElement.addEventListener("loadedmetadata", updateStatus);

function updateStatus() {
  audioStatus.textContent =
    "Current time: " + audioElement.currentTime.toFixed(2) +
    "s | Loop: " + audioElement.loop +
    " | Muted: " + audioElement.muted +
    " | Controls visible: " + audioElement.controls;
}

function createDemoAudio() {
  const context = new (window.AudioContext || window.webkitAudioContext)();
  const sampleRate = context.sampleRate;
  const duration = 2;
  const frameCount = sampleRate * duration;
  const buffer = context.createBuffer(1, frameCount, sampleRate);
  const channelData = buffer.getChannelData(0);
  const notes = [261.63, 329.63, 392.0, 523.25];

  for (let i = 0; i < frameCount; i += 1) {
    const time = i / sampleRate;
    const noteIndex = Math.floor(time * 2) % notes.length;
    const frequency = notes[noteIndex];
    channelData[i] = Math.sin(2 * Math.PI * frequency * time) * 0.35;
  }

  const wavBlob = audioBufferToWav(buffer);
  audioElement.src = URL.createObjectURL(wavBlob);
  context.close();
}

function audioBufferToWav(buffer) {
  const channelData = buffer.getChannelData(0);
  const length = channelData.length * 2 + 44;
  const arrayBuffer = new ArrayBuffer(length);
  const view = new DataView(arrayBuffer);

  writeString(view, 0, "RIFF");
  view.setUint32(4, 36 + channelData.length * 2, true);
  writeString(view, 8, "WAVE");
  writeString(view, 12, "fmt ");
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true);
  view.setUint16(22, 1, true);
  view.setUint32(24, buffer.sampleRate, true);
  view.setUint32(28, buffer.sampleRate * 2, true);
  view.setUint16(32, 2, true);
  view.setUint16(34, 16, true);
  writeString(view, 36, "data");
  view.setUint32(40, channelData.length * 2, true);

  let offset = 44;
  for (let i = 0; i < channelData.length; i += 1) {
    const sample = Math.max(-1, Math.min(1, channelData[i]));
    view.setInt16(offset, sample * 32767, true);
    offset += 2;
  }

  return new Blob([view], { type: "audio/wav" });
}

function writeString(view, offset, string) {
  for (let i = 0; i < string.length; i += 1) {
    view.setUint8(offset + i, string.charCodeAt(i));
  }
}
