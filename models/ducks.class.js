class Duck extends MoveableObject{
    width = 50;
    height = 40;
    y = 375;
    alive = true;
    killAble = true;
    offset = {
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
  };
    
    IMAGES_WALKING = [
      "../img/3_enemies_chicken/chicken_small/1_walk/1_w.png",
      "../img/3_enemies_chicken/chicken_small/1_walk/2_w.png",
      "../img/3_enemies_chicken/chicken_small/1_walk/3_w.png",
    ];
    IMAGES_DEAD = ["../img/3_enemies_chicken/chicken_small/2_dead/dead.png"];

    
    constructor() {
      super().loadImage("../img/3_enemies_chicken/chicken_small/1_walk/1_w.png");
      this.loadImages(this.IMAGES_DEAD);
      this.x = 800 + Math.random() * 1600;
      this.loadImages(this.IMAGES_WALKING);
      this.speed = 0.45 + Math.random() * 0.75;
      this.animate();
    }
  
     /**
     * plays the right animation for the chicken
     */
    animate() {
      setInterval(() => {
        if (this.alive) {
          this.moveLeft();
        }
      }, 1000 / 60);
  
      setInterval(() => {
        if (this.alive) {
          this.playAnimation(this.IMAGES_WALKING);
        }
      }, 1000 / 10);
    }
  
    /**
     * sets the chicken to dead and plays animation
     */
    killChicken() {
      this.alive = false;
      this.playAnimation(this.IMAGES_DEAD);
    }
  }