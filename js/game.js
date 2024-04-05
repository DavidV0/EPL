let canvas;
let ctx;
let world;
let keyboard = new Keyboard();
let settingsBtn = document.getElementById("settings-btn");
let soundBtn = document.getElementById("sound-btn");
let isMuted = true;


let backgroundMusic = new Audio("../audio/intro.mp3");
backgroundMusic.volume = 0.02;
let winSound = new Audio("../audio/win.mp3");
let gameOverSound = new Audio("../audio/gameOver.mp3");


/**
 * creates the world
 */
function init() {
  canvas = document.getElementById("canvas");
  world = new World(canvas, keyboard);
}

/**
 * sets the start screen
 */
function showStartScreen() {
  document.getElementById("container").classList.add("container");
  makeButtonsVisible();
  closeSettings();
}

/**
 * this functions displays the loss
 */
function displayLose() {
  document.getElementById("game-over").classList.remove("d-none");
  document.getElementById("replay-game-btn").classList.remove("d-none");
  gameOverSound.loop = false;
  gameOverSound.volume = 0.2
  gameOverSound.play();
  clearAllIntervals();
}

/**
 * this function displays the win
 */
function displayWin() {
  document.getElementById("container").classList.remove("d-none");
  document.getElementById("start-game-btn").classList.remove("d-none");
  document.getElementById("win").classList.remove("d-none");
  canvas.style.display = "none";
  winSound.loop = false;
  winSound.volume = 0.2;

  winSound.play();
  clearAllIntervals();
}

/**
 * removes the start screen and the creates the game
 */
function removeStartScreen() {
  clearAllIntervals();

  levelInit();
  init();
  canvas.style.display = "block";
  document.getElementById("container").classList.add("d-none");
  document.getElementById("start-game-btn").classList.add("d-none");
  document.getElementById("win").classList.add("d-none");
}

function removeGameOverScreen() {
  clearAllIntervals();

  levelInit();
  init();
  document.getElementById("game-over").classList.add("d-none");
  document.getElementById("replay-game-btn").classList.add("d-none");
}

/**
 * removes the d-none css class and adds the screen-btn class
 */
function makeButtonsVisible() {
  settingsBtn.classList.remove("d-none");
  soundBtn.classList.remove("d-none");

  settingsBtn.classList.add("screen-btn");
  soundBtn.classList.add("screen-btn");
  bindBTNPressEvents();
}

/**
 * mute or unmute background music
 */
function toggleMusic() {
  if (isMuted) {
    soundBtn.src = "img/start_screen_buttons/mute.svg";
    isMuted = false;
    backgroundMusic.play();
    backgroundMusic.loop = true;
    winSound.mute = true;
    gameOverSound.mute = true;
  } else if (!isMuted) {
    soundBtn.src = "img/start_screen_buttons/unmute.svg";
    isMuted = true;
    backgroundMusic.pause();
    backgroundMusic.loop = false;
    winSound.mute = false;
    gameOverSound.mute = false;
  }
}

/**
 * show settings
 */
function openSettings() {
  document.getElementById("menu-screen").classList.remove("d-none");
}

/**
 * close settings
 */
function closeSettings() {
  document.getElementById("menu-screen").classList.add("d-none");
}

/* Alternative (quick and dirty), um alle Intervalle zu beenden. */
function clearAllIntervals() {
  for (let i = 1; i < 9999; i++) window.clearInterval(i);
}

// detecting if a key is pressed
document.addEventListener("keydown", (e) => {
  if (e.keyCode == 39) {
    keyboard.RIGHT = true;
  }
  if (e.keyCode == 37) {
    keyboard.LEFT = true;
  }
  if (e.keyCode == 38) {
    keyboard.UP = true;
  }
  if (e.keyCode == 40) {
    keyboard.DOWN = true;
  }
  if (e.keyCode == 32) {
    keyboard.SPACE = true;
  }
  if (e.keyCode == 68) {
    keyboard.D = true;
  }
});

// detecting if a key is released
document.addEventListener("keyup", (e) => {
  if (e.keyCode == 39) {
    keyboard.RIGHT = false;
  }
  if (e.keyCode == 37) {
    keyboard.LEFT = false;
  }
  if (e.keyCode == 38) {
    keyboard.UP = false;
  }
  if (e.keyCode == 40) {
    keyboard.DOWN = false;
  }
  if (e.keyCode == 32) {
    keyboard.SPACE = false;
  }
  if (e.keyCode == 68) {
    keyboard.D = false;
  }
});

function bindBTNPressEvents() {
  document.getElementById("btn-left").addEventListener("touchstart", (e) => {
    e.preventDefault();
    keyboard.LEFT = true;
  });

  document.getElementById("btn-left").addEventListener("touchend", (e) => {
    e.preventDefault();
    keyboard.LEFT = false;
  });

  document.getElementById("btn-right").addEventListener("touchstart", (e) => {
    e.preventDefault();
    keyboard.RIGHT = true;
  });

  document.getElementById("btn-right").addEventListener("touchend", (e) => {
    e.preventDefault();
    keyboard.RIGHT = false;
  });
  document.getElementById("btn-jump").addEventListener("touchstart", (e) => {
    e.preventDefault();
    keyboard.SPACE = true;
  });

  document.getElementById("btn-jump").addEventListener("touchend", (e) => {
    e.preventDefault();
    keyboard.SPACE = false;
  });

  document.getElementById("btn-throw").addEventListener("touchstart", (e) => {
    e.preventDefault();
    keyboard.D = true;
  });

  document.getElementById("btn-throw").addEventListener("touchend", (e) => {
    e.preventDefault();
    keyboard.D = false;
  });
}
