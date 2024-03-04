class Bottle extends MoveableObject {
  y = 350;
  width = 50;
  height = 85;

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
    this.x = Math.random() * 1700;
    
  }


  animate() {
    setInterval(() => {
      this.playAnimation(this.IMAGES_SPLASH);
    }, 60);
  }
}
