class Bottle extends MoveableObject {
  y = 370;
  width = 50;
  height = 65;

  IMAGES_ON_GROUND = [
    "img/6_salsa_bottle/1_salsa_bottle_on_ground.png",
    "img/6_salsa_bottle/2_salsa_bottle_on_ground.png",

  ]

  

  constructor() {
    super().loadImage("img/6_salsa_bottle/2_salsa_bottle_on_ground.png");
    this.loadImages(this.IMAGES_ON_GROUND)
    this.x = Math.random() * 1700;
    this.animate();
    this.applyGravity();
  }


  animate() {
    setInterval(() => {
      this.playAnimation(this.IMAGES_ON_GROUND);
    }, 700);
  }
}
