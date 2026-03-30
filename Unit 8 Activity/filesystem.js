const saveNameInput = document.getElementById("save-name");
const saveScoreInput = document.getElementById("save-score");
const saveNotesInput = document.getElementById("save-notes");
const downloadButton = document.getElementById("download-button");
const fileInput = document.getElementById("file-input");
const fileOutput = document.getElementById("file-output");

downloadButton.addEventListener("click", downloadJsonFile);
fileInput.addEventListener("change", readJsonFile);

function downloadJsonFile() {
  const data = {
    name: saveNameInput.value,
    score: Number(saveScoreInput.value),
    notes: saveNotesInput.value,
    savedAt: new Date().toISOString()
  };

  const jsonText = JSON.stringify(data, null, 2);
  const blob = new Blob([jsonText], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = "unit8-data.json";
  link.click();

  URL.revokeObjectURL(url);
  fileOutput.textContent = "Downloaded JSON:\n" + jsonText;
}

function readJsonFile(event) {
  const file = event.target.files[0];

  if (!file) {
    return;
  }

  const reader = new FileReader();

  reader.onload = function loadFile() {
    try {
      const parsed = JSON.parse(reader.result);
      fileOutput.textContent = "Loaded JSON file:\n" + JSON.stringify(parsed, null, 2);
      saveNameInput.value = parsed.name || "";
      saveScoreInput.value = parsed.score || 0;
      saveNotesInput.value = parsed.notes || "";
    } catch (error) {
      fileOutput.textContent = "The selected file does not contain valid JSON.";
    }
  };

  reader.readAsText(file);
}
