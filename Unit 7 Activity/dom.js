const messageButton = document.getElementById("message-button");
const appendButton = document.getElementById("append-button");
const listButton = document.getElementById("list-button");
const resetListButton = document.getElementById("reset-list-button");
const colourButton = document.getElementById("colour-button");

const outputDemo = document.getElementById("output-demo");
const output = document.getElementById("output");
const orderedOutput = document.getElementById("ordered-output");
const colourMessage = document.getElementById("colour-message");

let listCount = 0;
const colours = ["red", "blue", "green", "orange"];
let colourIndex = 0;

messageButton.addEventListener("click", addMessage);
appendButton.addEventListener("click", appendMessage);
listButton.addEventListener("click", addListItem);
resetListButton.addEventListener("click", resetList);
colourButton.addEventListener("click", changeColour);

function addMessage() {
  outputDemo.innerHTML = "HELLO WORLD";
}

function appendMessage() {
  output.innerHTML += "<p>HELLO WORLD</p>";
}

function addListItem() {
  listCount += 1;
  orderedOutput.innerHTML += "<li>Dynamic item " + listCount + "</li>";
}

function resetList() {
  listCount = 0;
  orderedOutput.innerHTML = "";
}

function changeColour() {
  colourIndex = (colourIndex + 1) % colours.length;
  const current = colours[colourIndex];
  colourMessage.style.color = current;
  colourMessage.textContent = "I am " + current;
}
