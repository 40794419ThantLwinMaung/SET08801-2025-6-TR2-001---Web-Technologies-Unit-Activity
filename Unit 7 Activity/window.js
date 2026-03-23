const propertiesButton = document.getElementById("properties-button");
const scrollButton = document.getElementById("scroll-button");
const openButton = document.getElementById("open-button");

const propertiesOutput = document.getElementById("properties-output");
const navigatorOutput = document.getElementById("navigator-output");
const locationOutput = document.getElementById("location-output");
const historyOutput = document.getElementById("history-output");
const scrollOutput = document.getElementById("scroll-output");

for (let i = 1; i <= 400; i += 1) {
  scrollOutput.innerHTML += i + " ";
}

updateBrowserInfo();

propertiesButton.addEventListener("click", listWindowProperties);
scrollButton.addEventListener("click", scrollWindowByAmount);
openButton.addEventListener("click", openExampleWindow);

function listWindowProperties() {
  const selectedProperties = [];

  for (const property in window) {
    if (property && selectedProperties.length < 40) {
      selectedProperties.push(property);
    }
  }

  propertiesOutput.textContent = selectedProperties.join("\n");
  console.log("Sample window properties:", selectedProperties);
}

function updateBrowserInfo() {
  navigatorOutput.textContent =
    window.navigator.appName + " " +
    window.navigator.appVersion + " " +
    window.navigator.appCodeName;

  locationOutput.innerHTML =
    "Href: " + window.location.href +
    "<br>Protocol: " + window.location.protocol +
    "<br>Host: " + window.location.host +
    "<br>Path: " + window.location.pathname +
    "<br>Hash: " + window.location.hash;

  historyOutput.textContent = window.history.length;
}

function scrollWindowByAmount() {
  window.scrollBy(0, 100);
}

function openExampleWindow() {
  window.open(
    "external.html",
    "unit7example",
    "top=100,left=100,width=640,height=480,status=yes"
  );
}
