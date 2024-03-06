class Bottle extends MoveableObject {
  y = 370;
  width = 50;
  height = 65;
  energy = 10;

  IMAGES_ON_GROUND = [
    "./img/6_salsa_bottle/1_salsa_bottle_on_ground.png",
    "./img/6_salsa_bottle/2_salsa_bottle_on_ground.png",

  ]

  IMAGES_SPLASH = [
    "./img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png",
    "./img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png",
    "./img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png",
    "./img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png",
    "./img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png",
  ]

  constructor() {
    super().loadImage("./img/6_salsa_bottle/2_salsa_bottle_on_ground.png");
    this.loadImages(this.IMAGES_SPLASH)
    this.loadImages(this.IMAGES_ON_GROUND)

    this.x = Math.random() * 1700;
    this.animate();
    this.applyGravity();
  }


  animate() {
    setInterval(() => {
      this.playAnimation(this.IMAGES_ON_GROUND);
    }, 700);


    setInterval(() => {

      if(this.energy == 0 || this.y < 365){
      this.playAnimation(this.IMAGES_SPLASH);
      }
    }, 1000/15);
  }
}
