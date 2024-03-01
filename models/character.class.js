class Character extends MoveableObject {
  height = 300;
  width = 110;
  x = 30;
  y = 150;
  world;
  speed = 10;
  coins = 0;
  bottles = 0;
  hasLost = false;
  IMAGES_WALKING = [
    "./img/2_character_pepe/2_walk/W-21.png",
    "./img/2_character_pepe/2_walk/W-22.png",
    "./img/2_character_pepe/2_walk/W-23.png",
    "./img/2_character_pepe/2_walk/W-24.png",
    "./img/2_character_pepe/2_walk/W-25.png",
    "./img/2_character_pepe/2_walk/W-26.png",
  ];

  IMAGES_JUMPING = [
    "./img/2_character_pepe/3_jump/J-31.png",
    "./img/2_character_pepe/3_jump/J-32.png",
    "./img/2_character_pepe/3_jump/J-33.png",
    "./img/2_character_pepe/3_jump/J-34.png",
    "./img/2_character_pepe/3_jump/J-35.png",
    "./img/2_character_pepe/3_jump/J-36.png",
    "./img/2_character_pepe/3_jump/J-37.png",
    "./img/2_character_pepe/3_jump/J-38.png",
    "./img/2_character_pepe/3_jump/J-39.png",
  ];

  IMAGES_DEAD = [
    "./img/2_character_pepe/5_dead/D-51.png",
    "./img/2_character_pepe/5_dead/D-52.png",
    "./img/2_character_pepe/5_dead/D-53.png",
    "./img/2_character_pepe/5_dead/D-54.png",
    "./img/2_character_pepe/5_dead/D-55.png",
    "./img/2_character_pepe/5_dead/D-56.png",
    "./img/2_character_pepe/5_dead/D-57.png",
  ];

  IMAGES_HURT = [
    "./img/2_character_pepe/4_hurt/H-41.png",
    "./img/2_character_pepe/4_hurt/H-42.png",
    "./img/2_character_pepe/4_hurt/H-43.png",
  ];

  walking_sound = new Audio("./audio/walking.mp3");

  constructor() {
    super().loadImage("../img/2_character_pepe/2_walk/W-21.png");
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_JUMPING);
    this.loadImages(this.IMAGES_DEAD);
    this.loadImages(this.IMAGES_HURT);

    this.applyGravity();
    this.animate();
  }

  animate() {
    setInterval(() => {
      this.walking_sound.pause();

      //lässt den Character nach links laufen
      if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
        this.moveRight();
        this.walking_sound.play();
        this.otherDirection = false;
      }

      //lässt den Character nach rechts laufen
      if (this.world.keyboard.LEFT && this.x > 0) {
        this.moveLeft();
        this.walking_sound.play();
        this.otherDirection = true;
      }

      //lässt den Character springen
      if (this.world.keyboard.SPACE && !this.isAboveGround()) {
        this.jump();
      }

      this.world.camera_x = -this.x + 100; // +100 setzt den Character weiter nach rechts beim Start
    }, 1000 / 60);

    setInterval(() => {
      if (this.isDead()) {
        this.playAnimation(this.IMAGES_DEAD);
        if(!this.hasLost){
          setTimeout(()=>{
            this.hasLost = true;
            // play lose sound
            displayLose();
          },1000)
        


        }
      } else if (this.isAboveGround()) {
        this.playAnimation(this.IMAGES_JUMPING);
      } else if (this.isHurt()) {
        this.playAnimation(this.IMAGES_HURT);
      }

      if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
        //Walk animation
        this.playAnimation(this.IMAGES_WALKING);
      }
    }, 1000 / 15);
  }
}
