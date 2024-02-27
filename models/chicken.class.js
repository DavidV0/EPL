class Chicken extends MoveableObject{
  width = 80
  height = 60
  y = 380

    constructor() {
        super().loadImage("../img/3_enemies_chicken/chicken_normal/1_walk/1_w.png");
        this.x = 200 + Math.random()*500;
      }

}