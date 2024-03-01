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
  throwableObjects = [];

  coinSound = new Audio("./audio/coin.mp3")
  pickUpSound = new Audio("./audio/pick.mp3")

  constructor(canvas, keyboard) {
    this.canvas = canvas;
    // diese Variable greift auf das Canvas zu lässt drauf malen
    this.ctx = canvas.getContext("2d");
    this.keyboard = keyboard;
    this.setWorld();
    this.startGame();
  }

  /**
   * config our character with all the world objects
   */
  setWorld() {
    this.character.world = this;
    this.character.energy = 100;
    this.character.coins = 20;
    this.character.bottles = 20;
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
    }, 100);
  }

  /**
   * checks if the button is clicked to throw the bottles
   */
  checkThrowObjects() {
    if (this.keyboard.D) {
      let bottle = new ThrowableObject(
        this.character.x + 50,
        this.character.y + 50
      );
      this.throwableObjects.push(bottle);
    }
  }

  /**
   * checks if the character is colliding with an enemy
   */
  checkCollisions() {
    setInterval(() => {
      this.level.enemies.forEach((enemy) => {
        if (!enemy.dead && this.character.isColliding(enemy)) {
          if (enemy instanceof Chicken && this.character.y + this.character.height > 60 && !this.character.isHurt() && this.character.isAboveGround()  && enemy.killAble) {
              this.character.jump();
              this.kill(enemy);
          } else if (this.character.isColliding(enemy)) {
          this.character.hit();
          this.statusBar.setPercentage(this.character.energy);
        }
    }});
    }, 400);
  }

   /**
     * kills enemy
     * @param {class} enemy - movable object
     */
   kill(enemy) {
    enemy.killChicken();
    console.log(this.level.enemies.indexOf(enemy))

    setTimeout(() => {
    this.level.enemies.splice(this.level.enemies.indexOf(enemy),1);

    }, 300);

    
}

  /**
   * checks collision with bottles on ground
   */
  checkCollisionsWithBottles() {
    this.level.bottles.forEach((bottle) => {
      if (this.character.isColliding(bottle)) {
        this.character.bottles += 20;
        this.pickUpSound.play();
        if(this.character.bottles === 100){
          this.character.bottles = 100;
        }

        this.bottelStatusBar.setPercentage(this.character.bottles);
        this.level.bottles.splice(this.level.bottles.indexOf(bottle), 1);
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
    this.addObjectsToMap(this.level.endboss)
    this.addObjectsToMap(this.level.clouds);
    this.addObjectsToMap(this.level.coins);
    this.addObjectsToMap(this.level.bottles);
    this.addObjectsToMap(this.throwableObjects);

    // section for static objects
    this.ctx.translate(-this.camera_x, 0); // set Camera pos back

    this.addToMap(this.statusBar);
    this.addToMap(this.coinStatusBar);
    this.addToMap(this.bottelStatusBar);
    this.addToMap(this.endbossStatusBar);

    this.ctx.translate(this.camera_x, 0); // set Camera pos forward

    this.ctx.translate(-this.camera_x, 0);

    //Draw() wird immer wieder ausgeführt
    let self = this;
    requestAnimationFrame(function () {
      self.draw();
    });
  }
}
