class World {
  character = new Character();
  enemies = [new Chicken(), new Chicken(), new Chicken()];
  ctx;
  constructor(canvas) {
    // diese Variable greift auf das Canvas zu lässt drauf malen
    this.ctx = canvas.getContext("2d");
    this.draw();
  }

  draw() {
    this.ctx.drawImage(this.character.img, this.character.x, this.character.y, this.character.height, this.character.width );
  }
}
