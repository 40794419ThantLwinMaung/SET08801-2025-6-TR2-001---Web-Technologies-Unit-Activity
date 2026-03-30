const studentNameInput = document.getElementById("student-name");
const studentModuleInput = document.getElementById("student-module");
const sessionNoteInput = document.getElementById("session-note");
const storageStatus = document.getElementById("storage-status");
const storageOutput = document.getElementById("storage-output");

const saveLocalButton = document.getElementById("save-local-button");
const loadLocalButton = document.getElementById("load-local-button");
const clearLocalButton = document.getElementById("clear-local-button");
const saveSessionButton = document.getElementById("save-session-button");
const loadSessionButton = document.getElementById("load-session-button");
const clearSessionButton = document.getElementById("clear-session-button");

saveLocalButton.addEventListener("click", saveLocalStorageData);
loadLocalButton.addEventListener("click", loadLocalStorageData);
clearLocalButton.addEventListener("click", clearLocalStorageData);
saveSessionButton.addEventListener("click", saveSessionStorageData);
loadSessionButton.addEventListener("click", loadSessionStorageData);
clearSessionButton.addEventListener("click", clearSessionStorageData);

updateStatus();
renderStoredData();
loadLocalStorageData();
loadSessionStorageData();

function storageAvailable(type) {
  try {
    const storage = window[type];
    const testKey = "__storage_test__";
    storage.setItem(testKey, testKey);
    storage.removeItem(testKey);
    return true;
  } catch (error) {
    return false;
  }
}

function updateStatus() {
  const localAvailable = storageAvailable("localStorage");
  const sessionAvailable = storageAvailable("sessionStorage");
  storageStatus.textContent = "localStorage available: " + localAvailable + " | sessionStorage available: " + sessionAvailable;
}

function saveLocalStorageData() {
  if (!storageAvailable("localStorage")) {
    storageStatus.textContent = "localStorage is not available in this browser.";
    return;
  }

  const profile = {
    name: studentNameInput.value,
    module: studentModuleInput.value,
    updatedAt: new Date().toLocaleString()
  };

  localStorage.setItem("unit8_profile", JSON.stringify(profile));
  renderStoredData();
}

function loadLocalStorageData() {
  if (!storageAvailable("localStorage")) {
    return;
  }

  const storedProfile = localStorage.getItem("unit8_profile");

  if (!storedProfile) {
    return;
  }

  const profile = JSON.parse(storedProfile);
  studentNameInput.value = profile.name || "";
  studentModuleInput.value = profile.module || "";
  renderStoredData();
}

function clearLocalStorageData() {
  if (!storageAvailable("localStorage")) {
    return;
  }

  localStorage.removeItem("unit8_profile");
  renderStoredData();
}

function saveSessionStorageData() {
  if (!storageAvailable("sessionStorage")) {
    storageStatus.textContent = "sessionStorage is not available in this browser.";
    return;
  }

  sessionStorage.setItem("unit8_note", sessionNoteInput.value);
  renderStoredData();
}

function loadSessionStorageData() {
  if (!storageAvailable("sessionStorage")) {
    return;
  }

  const note = sessionStorage.getItem("unit8_note");
  if (note) {
    sessionNoteInput.value = note;
  }
  renderStoredData();
}

function clearSessionStorageData() {
  if (!storageAvailable("sessionStorage")) {
    return;
  }

  sessionStorage.removeItem("unit8_note");
  sessionNoteInput.value = "";
  renderStoredData();
}

function renderStoredData() {
  const localProfile = storageAvailable("localStorage") ? localStorage.getItem("unit8_profile") : null;
  const sessionNote = storageAvailable("sessionStorage") ? sessionStorage.getItem("unit8_note") : null;

  storageOutput.textContent =
    "Local Storage (unit8_profile):\n" + (localProfile || "No saved profile") +
    "\n\nSession Storage (unit8_note):\n" + (sessionNote || "No saved note");
}
