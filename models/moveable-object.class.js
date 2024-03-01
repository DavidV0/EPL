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
  
 

  

  moveRight() {
    this.x += this.speed;
  }

  moveLeft() {
    this.x -= this.speed;
  }

  playAnimation(images) {
    let i = this.currentImage % images.length;
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }

  applyGravity() {
    setInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.accelaration;
      }
    }, 1000 / 25);
  }

  isAboveGround() {
    if(this instanceof ThrowableObject){ //Throwable Objects should always fall
      return true
    }else{
      return this.y < 140;
    }
  }

  jump() {
    this.speedY = 30;
  }

  

  isColliding(obj) {
    return (
      this.x + this.width >= obj.x &&
      this.x <= obj.x + obj.width &&
      this.y + this.height >= obj.y &&
      this.x <= obj.y + obj.height
    );
  }

  hit() {
    this.energy -= 5;
    if (this.energy < 0) {
      this.energy = 0;
    } else {
      this.lastHit = new Date().getTime();
    }
  }

  isHurt() {
    let timepassed = new Date().getTime() -this.lastHit; // Difference in ms
    timepassed = timepassed / 1000; // Difference in s
    if (timepassed <= 1) {
      return true;
    } else {
      return false;
    }
  }

  isDead() {
    return this.energy == 0;
  }
}
