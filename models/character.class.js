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
  offset = {
    top: 70,
    left: 40,
    right: 30,
    bottom: 30,
  };
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

  IMAGES_IDLE = [
    "./img/2_character_pepe/1_idle/idle/I-1.png",
    "./img/2_character_pepe/1_idle/idle/I-2.png",
    "./img/2_character_pepe/1_idle/idle/I-3.png",
    "./img/2_character_pepe/1_idle/idle/I-4.png",
    "./img/2_character_pepe/1_idle/idle/I-5.png",
    "./img/2_character_pepe/1_idle/idle/I-6.png",
    "./img/2_character_pepe/1_idle/idle/I-7.png",
    "./img/2_character_pepe/1_idle/idle/I-8.png",
    "./img/2_character_pepe/1_idle/idle/I-9.png",
    "./img/2_character_pepe/1_idle/idle/I-10.png",
  ];

  IMAGES_LONG_IDLE = [
    "./img/2_character_pepe/1_idle/long_idle/I-11.png",
    "./img/2_character_pepe/1_idle/long_idle/I-12.png",
    "./img/2_character_pepe/1_idle/long_idle/I-13.png",
    "./img/2_character_pepe/1_idle/long_idle/I-14.png",
    "./img/2_character_pepe/1_idle/long_idle/I-15.png",
    "./img/2_character_pepe/1_idle/long_idle/I-16.png",
    "./img/2_character_pepe/1_idle/long_idle/I-17.png",
    "./img/2_character_pepe/1_idle/long_idle/I-18.png",
    "./img/2_character_pepe/1_idle/long_idle/I-19.png",
    "./img/2_character_pepe/1_idle/long_idle/I-20.png",
  ];

  walkingSound = new Audio("./audio/walking.mp3");
  hitSound = new Audio("./audio/hit.mp3");

  constructor() {
    super().loadImage("../img/2_character_pepe/2_walk/W-21.png");
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_JUMPING);
    this.loadImages(this.IMAGES_DEAD);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_IDLE);
    this.loadImages(this.IMAGES_LONG_IDLE);

    this.applyGravity();
    this.animate();
  }
    /**
   * mutes the sounds in the character class
   */
    muteSounds() {
      this.walkingSound.muted = true;
      this.hitSound.muted = true;
    }
  
    /**
     * unmutes the sounds in the character class
     */
    unmuteSounds() {
      this.walkingSound.muted = false;
      this.hitSound.muted = false;
    }

  animate() {
    setInterval(() => {
      this.walkingSound.pause();

      //lässt den Character nach links laufen
      if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
        this.moveRight();
        this.walkingSound.play();
        this.otherDirection = false;
      }

      //lässt den Character nach rechts laufen
      if (this.world.keyboard.LEFT && this.x > 0) {
        this.moveLeft();
        this.walkingSound.play();
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
        if (!this.hasLost) {
          setTimeout(() => {
            this.hasLost = true;
            displayLose();
          }, 1000);
        }
      } else if (this.isAboveGround()) {
        this.playAnimation(this.IMAGES_JUMPING);
      } else if (this.isHurt()) {
        this.hitSound.play();
        this.playAnimation(this.IMAGES_HURT);
      } else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
        //Walk animation
        this.playAnimation(this.IMAGES_WALKING);
      }
    },50);

    //check for idle
    let i;
    setInterval(() => {
      i++;
      if (
        this.world.keyboard.LEFT ||
        this.world.keyboard.RIGHT ||
        this.world.keyboard.SPACE ||
        this.world.keyboard.D
      ) {
        i = 0;
      }
    }, 100);

    setInterval(() => {
      if (i > 25) {
        this.playAnimation(this.IMAGES_LONG_IDLE);
      } else if (i < 10 && i > 5) {
        this.playAnimation(this.IMAGES_IDLE);
      }
    }, 1000);
  }


}
