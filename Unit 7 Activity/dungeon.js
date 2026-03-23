const nextRoomButton = document.getElementById("next-room-button");
const resetGameButton = document.getElementById("reset-game-button");
const playerStats = document.getElementById("player-stats");
const roomOutput = document.getElementById("room-output");

const treasureTypes = ["gold coins", "an emerald", "a silver key", "an ancient map"];
const monsterTypes = ["giant spider", "skeleton guard", "shadow wolf", "cave troll"];

let player = loadPlayer();

renderGame();

nextRoomButton.addEventListener("click", enterRoom);
resetGameButton.addEventListener("click", resetGame);

function loadPlayer() {
  const savedPlayer = window.sessionStorage.getItem("unit7-player");

  if (savedPlayer) {
    return JSON.parse(savedPlayer);
  }

  return {
    health: 10,
    gold: 0,
    roomsCleared: 0,
    alive: true
  };
}

function savePlayer() {
  window.sessionStorage.setItem("unit7-player", JSON.stringify(player));
}

function renderGame() {
  playerStats.textContent =
    "Health: " + player.health +
    " | Gold: " + player.gold +
    " | Rooms cleared: " + player.roomsCleared;

  if (!player.alive) {
    roomOutput.innerHTML = "<p>You were defeated in the dungeon. Restart to try again.</p>";
    nextRoomButton.disabled = true;
    return;
  }

  if (player.roomsCleared >= 5) {
    roomOutput.innerHTML = "<p>You escaped the dungeon with your treasure. Victory!</p>";
    nextRoomButton.disabled = true;
    return;
  }

  nextRoomButton.disabled = false;
  roomOutput.innerHTML = "<p>The corridor ahead is quiet. Step forward to reveal the next room.</p>";
}

function enterRoom() {
  const treasure = randomItem(treasureTypes);
  const monster = randomItem(monsterTypes);
  const foundTreasure = Math.random() >= 0.3;
  const wonBattle = Math.random() >= 0.35;

  player.roomsCleared += 1;

  let message = "<p>Room " + player.roomsCleared + ": ";

  if (foundTreasure) {
    const goldFound = Math.floor(Math.random() * 20) + 5;
    player.gold += goldFound;
    message += "You found " + treasure + " and " + goldFound + " gold.</p>";
  } else {
    message += "The room looked empty at first.</p>";
  }

  message += "<p>A " + monster + " appears.</p>";

  if (wonBattle) {
    message += "<p>You won the battle and keep moving deeper into the dungeon.</p>";
  } else {
    const damage = Math.floor(Math.random() * 4) + 2;
    player.health -= damage;
    message += "<p>You were hurt and lost " + damage + " health.</p>";
  }

  if (player.health <= 0) {
    player.health = 0;
    player.alive = false;
  }

  savePlayer();
  playerStats.textContent =
    "Health: " + player.health +
    " | Gold: " + player.gold +
    " | Rooms cleared: " + player.roomsCleared;

  roomOutput.innerHTML = message;

  if (!player.alive || player.roomsCleared >= 5) {
    renderGame();
  }
}

function resetGame() {
  player = {
    health: 10,
    gold: 0,
    roomsCleared: 0,
    alive: true
  };

  savePlayer();
  renderGame();
}

function randomItem(items) {
  return items[Math.floor(Math.random() * items.length)];
}
