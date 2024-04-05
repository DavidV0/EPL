class Coin extends DrawAbleObject {
    width = 65;
    height = 65;
    offset = {
      top: 10,
      left: 10,
      right: 10,
      bottom: 10,
  };
  constructor() {
    super().loadImage("img/7_statusbars/3_icons/icon_coin.png");
    this.x = 550 + Math.random() * 1700;
    this.y = 150 + Math.random() * 200;
  
  }
}
