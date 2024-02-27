class World {
  character = new Character();
  enemies = [new Chicken(), new Chicken(), new Chicken()];
  clouds = [new Clouds(), new Clouds(), new Clouds()];
  backgroundObjects = [
    new BackgroundObject("./img/5_background/layers/air.png", 0),
    new BackgroundObject("./img/5_background/layers/3_third_layer/1.png", 0),
    new BackgroundObject("./img/5_background/layers/2_second_layer/1.png", 0),
    new BackgroundObject("./img/5_background/layers/1_first_layer/1.png", 0),
  ];
  ctx;
  canvas;
  keyboard;
  constructor(canvas, keyboard) {
    this.canvas = canvas;
    // diese Variable greift auf das Canvas zu lässt drauf malen
    this.ctx = canvas.getContext("2d");
    this.keyboard = keyboard;
    this.draw();
    this.setWorld();
  }
  /**
   * config our character with all the world objects
   */
  setWorld(){
    this.character.world = this
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

    if(obj.otherDirection){
      this.ctx.save();
      this.ctx.translate(obj.width, 0)
      this.ctx.scale(-1,1)
      obj.x = obj.x *-1
    }

    this.ctx.drawImage(obj.img, obj.x, obj.y, obj.width, obj.height);

    if(obj.otherDirection){
      obj.x = obj.x *-1
      this.ctx.restore()
    }
  }

  /**
   * draws to the canvas constantly
   */
  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.addObjectsToMap(this.backgroundObjects);
    this.addToMap(this.character);
    this.addObjectsToMap(this.enemies);
    this.addObjectsToMap(this.clouds);

    //Draw() wird immer wieder ausgeführt
    let self = this;
    requestAnimationFrame(function () {
      self.draw();
    });
  }
}
