class World {
  character = new Character();
  level = level1
  ctx;
  canvas;
  keyboard;
  camera_x = 0
  statusBar = new StatusBar();
  constructor(canvas, keyboard) {
    this.canvas = canvas;
    // diese Variable greift auf das Canvas zu lässt drauf malen
    this.ctx = canvas.getContext("2d");
    this.keyboard = keyboard;
    this.draw();
    this.setWorld();
    this.checkCollisions();
  }
  /**
   * config our character with all the world objects
   */
  setWorld(){
    this.character.world = this
  }

  checkCollisions(){
    setInterval(()=>{
        this.level.enemies.forEach((enemy)=>{
          if(this.character.isColliding(enemy)){
            this.character.hit();
          }
        })
    },200)
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
      this.flipImage(obj)
    }
    obj.draw(this.ctx)
    obj.drawFrame(this.ctx)

    if(obj.otherDirection){
        this.flipImageBack(obj)
    }
  }


  flipImage(obj){
    this.ctx.save();
    this.ctx.translate(obj.width, 0)
    this.ctx.scale(-1,1)
    obj.x = obj.x *-1
  }

  flipImageBack(obj){
    obj.x = obj.x *-1
      this.ctx.restore()
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
    this.addObjectsToMap(this.level.clouds);


    this.ctx.translate(-this.camera_x, 0);
    this.addToMap(this.statusBar)



    //Draw() wird immer wieder ausgeführt
    let self = this;
    requestAnimationFrame(function () {
      self.draw();
    });
  }

  
}
