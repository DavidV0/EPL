class World {
  character = new Character();
  enemies = [new Chicken(), new Chicken(), new Chicken()];
  clouds = [new Clouds(), new Clouds(),new Clouds(),]
  ctx;
  canvas;
  constructor(canvas) {
    this.canvas = canvas;
    // diese Variable greift auf das Canvas zu lässt drauf malen
    this.ctx = canvas.getContext("2d");
    this.draw();
  }

  draw() {
    this.ctx.clearRect(0,0, this.canvas.width, this.canvas.height)

    this.ctx.drawImage(
      this.character.img,
      this.character.x,
      this.character.y,
      this.character.height,
      this.character.width
    );

    this.enemies.forEach(enemy => {
        this.ctx.drawImage(
            enemy.img,
            enemy.x,
            enemy.y,
            enemy.height,
            enemy.width
          );
    })
    this.clouds.forEach(clouds => {
        this.ctx.drawImage(
            clouds.img,
            clouds.x,
            clouds.y,
            clouds.height,
            clouds.width
          );
    })
    //FDraw() wird immer wieder ausgeführt
    let self = this;
    requestAnimationFrame(function () {
      self.draw();
    });
  }
}
