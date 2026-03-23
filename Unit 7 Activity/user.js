const alertButton = document.getElementById("alert-button");
const confirmButton = document.getElementById("confirm-button");
const promptButton = document.getElementById("prompt-button");
const dialogOutput = document.getElementById("dialog-output");

alertButton.addEventListener("click", showAlertBox);
confirmButton.addEventListener("click", showConfirmBox);
promptButton.addEventListener("click", showPromptBox);

function showAlertBox() {
  window.alert("hello");
  dialogOutput.textContent = "Alert displayed.";
}

function showConfirmBox() {
  const result = window.confirm("Are you sure?");
  dialogOutput.textContent = "Confirm result: " + result;
  console.log("Confirm result:", result);
}

function showPromptBox() {
  const result = window.prompt("What is your name?");

  if (result !== null) {
    dialogOutput.textContent = "Prompt result: " + result;
    console.log("Prompt result:", result);
  } else {
    dialogOutput.textContent = "Prompt cancelled.";
  }
}
