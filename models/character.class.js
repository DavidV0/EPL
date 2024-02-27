class Character extends MoveableObject {
  
  height = 300
 width = 150
  x = 30
  y = 150

  constructor() {
    super().loadImage("../img/2_character_pepe/2_walk/W-21.png");
  }

  jump() {}
}
