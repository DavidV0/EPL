class Clouds extends MoveableObject {
  y = 10;
  width = 200;
  height = 250;
  speed = 0.05

  constructor() {
    super().loadImage("./img/5_background/layers/4_clouds/1.png");
    this.x = Math.random() * 500;

    this.animate();
  }

  animate() {
    this.moveLeft();
  }
}
