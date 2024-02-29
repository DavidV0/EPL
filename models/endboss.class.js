class Endboss extends MoveableObject {
  height = 400;
  width = 250;
  y = 55;
  firstContact = false;
  world;
  IMAGES_WALKING = [
    "./img/4_enemie_boss_chicken/2_alert/G5.png",
    "./img/4_enemie_boss_chicken/2_alert/G6.png",
    "./img/4_enemie_boss_chicken/2_alert/G7.png",
    "./img/4_enemie_boss_chicken/2_alert/G8.png",
    "./img/4_enemie_boss_chicken/2_alert/G9.png",
    "./img/4_enemie_boss_chicken/2_alert/G10.png",
    "./img/4_enemie_boss_chicken/2_alert/G11.png",
    "./img/4_enemie_boss_chicken/2_alert/G12.png",
    "./img/4_enemie_boss_chicken/2_alert/G5.png",
  ];

  IMAGES_SPAWNING = [
    "./img/4_enemie_boss_chicken/2_alert/G5.png",
    "./img/4_enemie_boss_chicken/2_alert/G6.png",
    "./img/4_enemie_boss_chicken/2_alert/G7.png",
    "./img/4_enemie_boss_chicken/2_alert/G8.png",
    "./img/4_enemie_boss_chicken/2_alert/G9.png",
    "./img/4_enemie_boss_chicken/2_alert/G10.png",
    "./img/4_enemie_boss_chicken/2_alert/G11.png",
    "./img/4_enemie_boss_chicken/2_alert/G12.png",
  ];

  constructor(world) {
    super().loadImage("../img/4_enemie_boss_chicken/2_alert/G5.png");
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_SPAWNING);
    this.x = 2000;
    this.animate();
    this.world = world;
  }

  animate() {
    let i = 0;
    setInterval(() => {
      if (i < 10) {
        this.playAnimation(this.IMAGES_SPAWNING);
      } else {
        this.playAnimation(this.IMAGES_WALKING);
      }
      if (world.character.x> 1500 && this.hadFirstContact === false) {
        i = 0;
        hadFirstContact = true;
      }
    }, 1000 / 10);
  }
}
