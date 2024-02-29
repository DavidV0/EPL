let canvas;
let ctx;
let world;
let keyboard = new Keyboard();

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
function showStartScreen(){
	document.getElementById("container").classList.add("container")
}


/**
 * removes the start screen and the creates the game
 */
function removeStartScreen(){
	levelInit();

	init()
	document.getElementById("container").classList.add("d-none");
	document.getElementById("start-game-btn").classList.add("d-none")

}


// detecting if a key is pressed
document.addEventListener('keydown', (e) => {
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
document.addEventListener('keyup', (e) => {
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