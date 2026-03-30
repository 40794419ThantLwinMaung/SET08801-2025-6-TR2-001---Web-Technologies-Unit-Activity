const cookieForm = document.getElementById("cookie-form");
const loadCookieButton = document.getElementById("load-cookie-button");
const deleteCookieButton = document.getElementById("delete-cookie-button");
const cookieMessage = document.getElementById("cookie-message");
const cookieOutput = document.getElementById("cookie-output");
const usernameInput = document.getElementById("username");
const moodInput = document.getElementById("mood");

cookieForm.addEventListener("submit", saveUserCookies);
loadCookieButton.addEventListener("click", loadCookies);
deleteCookieButton.addEventListener("click", deleteCookies);

loadCookies();

function setCookie(name, value, expiryDays) {
  const date = new Date();
  date.setTime(date.getTime() + expiryDays * 24 * 60 * 60 * 1000);
  const expires = "expires=" + date.toUTCString();
  document.cookie = name + "=" + encodeURIComponent(value) + ";" + expires + ";path=/";
}

function getCookie(cookieName) {
  const name = cookieName + "=";
  const decodedCookie = decodeURIComponent(document.cookie);
  const cookies = decodedCookie.split(";");

  for (let i = 0; i < cookies.length; i += 1) {
    let cookie = cookies[i];

    while (cookie.charAt(0) === " ") {
      cookie = cookie.substring(1);
    }

    if (cookie.indexOf(name) === 0) {
      return cookie.substring(name.length, cookie.length);
    }
  }

  return "";
}

function saveUserCookies(event) {
  event.preventDefault();
  setCookie("unit8_username", usernameInput.value, 7);
  setCookie("unit8_mood", moodInput.value, 7);
  loadCookies();
}

function loadCookies() {
  const username = getCookie("unit8_username");
  const mood = getCookie("unit8_mood");

  cookieOutput.textContent = document.cookie || "No cookies currently stored for this page.";

  if (!username) {
    cookieMessage.textContent = "No saved user cookie found yet.";
    return;
  }

  usernameInput.value = username;
  if (mood) {
    moodInput.value = mood;
  }

  cookieMessage.textContent = buildMoodMessage(username, mood);
}

function deleteCookies() {
  document.cookie = "unit8_username=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/";
  document.cookie = "unit8_mood=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/";
  cookieForm.reset();
  cookieOutput.textContent = document.cookie || "No cookies currently stored for this page.";
  cookieMessage.textContent = "Saved cookies deleted.";
}

function buildMoodMessage(username, mood) {
  if (mood === "happy") {
    return "Hello " + username + ". It is great to hear that you are feeling happy today.";
  }

  if (mood === "sad") {
    return "Hello " + username + ". Sorry that today feels a bit sad. Hope things improve soon.";
  }

  if (mood === "excited") {
    return "Hello " + username + ". Your excitement is contagious. Enjoy the day.";
  }

  return "Hello " + username + ". Make sure you get some rest if you are feeling tired.";
}
