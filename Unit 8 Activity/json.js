const parseButton = document.getElementById("parse-button");
const stringifyButton = document.getElementById("stringify-button");
const jsonStringOutput = document.getElementById("json-string");
const jsonObjectOutput = document.getElementById("json-object");
const jsonOutput = document.getElementById("json-output");

const jStr = '{"firstName":"Jebediah","lastName":"Springfield","isAlive":true,"age":125,"height_cm":167.6,"address":{"streetAddress":"21 2nd Street","city":"Springfield","state":"NY","postalCode":"10021-3100"},"phoneNumbers":[{"type":"home","number":"212 555-1234"},{"type":"work","number":"646 555-4567"}],"children":[],"spouse":null}';
let parsedObject = null;

jsonStringOutput.textContent = jStr;

parseButton.addEventListener("click", parseJsonExample);
stringifyButton.addEventListener("click", stringifyJsonExample);

function parseJsonExample() {
  parsedObject = JSON.parse(jStr);
  jsonObjectOutput.textContent =
    "Name: " + parsedObject.firstName + " " + parsedObject.lastName +
    "\nAlive: " + parsedObject.isAlive +
    "\nCity: " + parsedObject.address.city +
    "\nFirst phone number: " + parsedObject.phoneNumbers[0].number;
}

function stringifyJsonExample() {
  if (!parsedObject) {
    parseJsonExample();
  }

  parsedObject.occupation = "Founder";
  parsedObject.age += 1;

  jsonOutput.textContent = JSON.stringify(parsedObject, null, 2);
}
