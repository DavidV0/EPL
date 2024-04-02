class World {
  character = new Character();
  level = level1;
  ctx;
  canvas;
  keyboard;
  camera_x = 0;
  statusBar = new StatusBar();
  coinStatusBar = new CoinStatusBar();
  bottelStatusBar = new BottleStatusBar();
  endbossStatusBar = new EndBossbar();
  spawnEndbossStatusBar = false;
  throwableObjects = [];
  allowThrow = true;

  coinSound = new Audio("../audio/coin.mp3");
  pickUpSound = new Audio("../audio/pick.mp3");
  glasSound = new Audio("../audio/glas.mp3");
  deadBossSound = new Audio("../audio/dead_boss.mp3");
  throwSound = new Audio("../audio/throw.mp3");
  hitSound = new Audio("../audio/hit.mp3");
  deadChickenSound = new Audio("../audio/dead_chicken.mp3");

  constructor(canvas, keyboard) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.keyboard = keyboard;
    this.setWorld();
    this.startGame();
  }

  /**
   * checks if sounds are muted or not;
   */
  checkSounds() {
    if (isMuted) {
      this.muteSounds();
      this.character.muteSounds();
      this.level.endboss.muteSounds();
    } else {
      this.unmuteSounds();
      this.character.unmuteSounds();
      this.level.endboss.unmuteSounds();
    }
  }

  /**
   * mutes the sounds in the World
   */
  muteSounds() {
    this.coinSound.muted = true;
    this.glasSound.muted = true;
    this.pickUpSound.muted = true;
    this.deadBossSound.muted = true;
    this.throwSound.muted = true;
    this.hitSound.muted = true;
    this.deadChickenSound.muted = true;
  }

  /**
   * unmutes the sounds in the World
   */
  unmuteSounds() {
    this.coinSound.muted = false;
    this.glasSound.muted = false;
    this.pickUpSound.muted = false;
    this.deadBossSound.muted = false;
    this.throwSound.muted = false;
    this.hitSound.muted = false;
    this.deadChickenSound.muted = false;
  }

  /**
   * config our character with all the world objects
   */
  setWorld() {
    this.character.world = this;
    this.character.energy = 100;
    this.character.coins = 20;
    this.character.bottles = 20;
    this.level.endboss.world = this;
    this.level.endboss.hadFirstContact = false;
    this.level.endboss.animate();
  }
  /**
   * starts the game loop and the drawing
   */
  startGame() {
    this.draw();
    this.run();
    closeSettings();
  }

  /**
   * starts checking the game logic like collision, throwing and etc
   */
  run() {
    setInterval(() => {
      this.checkCollisions();
      this.checkThrowObjects();
      this.checkCollisionsWithCoins();
      this.checkCollisionsWithBottles();
      this.checkCollisionsWithEndboss();
      this.checkCollisionsWithEndbossBottle();
      this.checkSounds();
    }, 1000 / 30);
  }

  /**
   * checks if the button is clicked to throw the bottles
   */
  checkThrowObjects() {
    if (this.keyboard.D && this.character.bottles > 20 && this.allowThrow) {
      this.allowThrow = false;
      let bottle = new ThrowableObject(
        this.character.x + 75,
        this.character.y + 75
      );

      this.throwSound.play();
      this.throwableObjects.push(bottle);
      this.bottelStatusBar.setPercentage(this.character.bottles);
      setTimeout(() => {
        this.allowThrow = true;
        bottle.splash();
        this.glasSound.play();
      }, 1100);
    }
  }

  /**
   * checks if the character is colliding with an enemy
   */
  checkCollisions() {
    this.level.enemies.forEach((enemy) => {
      if (enemy.alive && this.character.isColliding(enemy)) {
        if (
          (enemy instanceof Chicken &&
            this.character.y + this.character.height > 60 &&
            this.character.isAboveGround() &&
            enemy.killAble) ||
          (enemy instanceof Duck &&
            this.character.y + this.character.height > 60 &&
            this.character.isAboveGround() &&
            enemy.killAble)
        ) {
          this.character.jump();
          this.kill(enemy);
        } else {
          this.character.hit();
          this.hitSound.play();
          this.statusBar.setPercentage(this.character.energy);
        }
      }
    });
  }

  /**
   * kills enemy
   * @param {class} enemy - movable object
   */
  kill(enemy) {
    if (enemy instanceof Chicken || enemy instanceof Duck) {
      enemy.killChicken();
      this.deadChickenSound.volume = 0.1;
      this.deadChickenSound.play();
    }

    setTimeout(() => {
      this.level.enemies.splice(this.level.enemies.indexOf(enemy), 1);
    }, 300);
  }

  /**
   * checks if the bottle hits the endboss
   */
  checkCollisionsWithEndbossBottle() {
    this.throwableObjects.forEach((bottle) => {
      if (this.level.endboss.isColliding(bottle)) {
        bottle.splash();
        this.glasSound.play();
        setTimeout(() => {
          this.throwableObjects.pop();
          this.level.endboss.energy -= 5;
          this.endbossStatusBar.setPercentage(this.level.endboss.energy);
          this.deadBossSound.play();
          this.level.endboss.playAnimation(this.level.endboss.IMAGES_HURT);
        }, 200);
      }
      if (this.level.endboss.energy <= 0) {
        this.deadBossSound.volume = 0.2;
        this.deadBossSound.play();
        this.level.endboss.alive = false;
        this.kill(this.level.endboss);
      }
    });
  }

  /**
   * checks the if the characters gets hit by the endboss
   */
  checkCollisionsWithEndboss() {
    if (
      this.level.endboss.alive &&
      this.character.isColliding(this.level.endboss)
    ) {
      this.hitSound.volume = 0.2;
      this.hitSound.play();
      this.character.hit();
      this.statusBar.setPercentage(this.character.energy);
    }
  }

  /**
   * checks collision with bottles on ground
   */
  checkCollisionsWithBottles() {
    this.level.bottles.forEach((bottle) => {
      if (this.character.bottles < 100) {
        if (this.character.isColliding(bottle)) {
          this.character.bottles += 20;
          this.bottelStatusBar.setPercentage(this.character.bottles);

          this.pickUpSound.play();
          if (this.character.bottles == 100) {
            this.character.bottles = 100;
          }

          this.level.bottles.splice(this.level.bottles.indexOf(bottle), 1);
        }
      }
    });
  }

  /**
   * checks collision with coins
   */
  checkCollisionsWithCoins() {
    this.level.coins.forEach((coin) => {
      if (this.character.isColliding(coin)) {
        this.character.coins += 20;
        this.coinSound.play();
        this.coinStatusBar.setPercentage(this.character.coins);
        this.level.coins.splice(this.level.coins.indexOf(coin), 1);
      }
    });
  }

  /**
   * sets an array of objects to the canvas
   * @param {*} objects array of images
   */

  addObjectsToMap(objects) {
    objects.forEach((object) => {
      this.addToMap(object);
    });
  }

  /**
   * sets the Image in to the canvas
   *
   * @param {obj} obj the image you wanna place into the canvas
   */
  addToMap(obj) {
    if (obj.otherDirection) {
      this.flipImage(obj);
    }
    obj.draw(this.ctx);

    if (obj.otherDirection) {
      this.flipImageBack(obj);
    }
  }

  /**
   * mirrors the image properly so the character looking into the right direction
   * @param {*} obj
   */
  flipImage(obj) {
    this.ctx.save();
    this.ctx.translate(obj.width, 0);
    this.ctx.scale(-1, 1);
    obj.x = obj.x * -1;
  }

  /**
   * mirrors the image properly so the character looking into the right direction
   * @param {*} obj
   */
  flipImageBack(obj) {
    obj.x = obj.x * -1;
    this.ctx.restore();
  }

  /**
   * draws to the canvas constantly
   */
  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.translate(this.camera_x, 0);

    this.addObjectsToMap(this.level.backgroundObjects);
    this.addToMap(this.character);
    this.addObjectsToMap(this.level.enemies);
    this.addToMap(this.level.endboss);
    this.addObjectsToMap(this.level.clouds);
    this.addObjectsToMap(this.level.coins);
    this.addObjectsToMap(this.level.bottles);
    this.addObjectsToMap(this.throwableObjects);

    this.ctx.translate(-this.camera_x, 0);
    this.addToMap(this.statusBar);
    this.addToMap(this.coinStatusBar);
    this.addToMap(this.bottelStatusBar);
    if (this.spawnEndbossStatusBar) {
      this.addToMap(this.endbossStatusBar);
    }
    this.ctx.translate(this.camera_x, 0);
    this.ctx.translate(-this.camera_x, 0);
    let self = this;
    requestAnimationFrame(function () {
      self.draw();
    });
  }
}
