class Bottle extends MoveableObject {
  y = 350;
  width = 50;
  height = 85;

  constructor() {
    super().loadImage("./img/6_salsa_bottle/2_salsa_bottle_on_ground.png");
    this.x = Math.random() * 1700;
  }
}
