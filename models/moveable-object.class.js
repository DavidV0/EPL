class MoveableObject extends DrawAbleObject {
  x = 120; 
  y = 280;
  height = 150;
  width = 100;
  img;
  imageCache = {};
  currentImage = 0;
  speed = 0.15;
  speedY = 0;
  accelaration = 2.5;
  otherDirection = false;
  energy = 100;
  lastHit = 0;
  offset = {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
};
  
 

  
 /** 
   * lets the object move to the right
   */
  moveRight() {
    this.x += this.speed;
  }

  /** 
   * lets the object move to the left
   */
  moveLeft() {
    this.x -= this.speed;
  }


  /**
   * plays an array of images 
   * @param {*} images the set of images that should be played in order
   */
  playAnimation(images) {
    let i = this.currentImage % images.length;
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }


  /**
   * creates the movement for jumping and falling
   */
  applyGravity() {
    setInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.accelaration;
      }
    }, 1000 / 25);
  }


  /**
   *  checks if character is above ground
   * @returns true if is above else false
   */
  isAboveGround() {
    if(this instanceof ThrowableObject){ 
      return true
    }else{
      return this.y < 140;
    }
  }

  jump() {
    this.speedY = 30;
  }

  

     /**
     * this functions checks the collision
     * @param {class} mo -movable object for which collision is being checked
     * @returns - returns the hit box
     */
     isColliding(mo) {
      return this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
          this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
          this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
          this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom;
  }

  /**
   * character gets hit and loses energy
   */
  hit() {
    this.energy -= 2;
    if (this.energy < 0) {
      this.energy = 0;
    } else {
      this.lastHit = new Date().getTime();
    }
  }

  /**
   * checks when the character did get hurt so he isnt getting hurt the whole time
   * @returns  true if character didnt get hit in some time else false
   */
  isHurt() {
    let timepassed = new Date().getTime() -this.lastHit; 
    timepassed = timepassed / 1000; 
    if (timepassed <= 1) {
      return true;
    } else {
      return false;
    }
  }

  /**
   * 
   * @returns true when characters energy is 0
   */
  isDead() {
    return this.energy == 0;
  }
}
