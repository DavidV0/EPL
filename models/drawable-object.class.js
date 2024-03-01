class DrawAbleObject {
    img;
    imageCache = {};
    currentImage = 0;
    x = 150;
    y = 300;
    height = 150;
    width = 100;
    percentage;

    
  /**
   * loads the image of the object
   * @param {*} path the image path
   */
  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

/**
   * loads all images of the object
   * @param {*} arr the image Cache
   */
loadImages(arr) {
    arr.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imageCache[path] = img;
    });
  }

  draw(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }


  /**
   * draws a frame of the character and the enemies
   * @param {*} ctx context of the canvas
   */
  drawFrame(ctx) {
    if (this instanceof Character || this instanceof Chicken) {
      ctx.beginPath();
      ctx.lineWidth = "6";
      ctx.strokeStyle = "blue";
      ctx.rect(this.x, this.y, this.width, this.height);
      ctx.stroke();
    }
  }

  /**
   * sets the right image of the statusBar
   * @param {*} percentage calculates the right image
   */

  setPercentage(percentage) {
    this.percentage = percentage; // => 0 ... 5
    let path = this.IMAGES[this.resovleImageIndex()];
    this.img = this.imageCache[path];
  }


  /**
   * calculates to set the right image
   * @returns the right number for the image
   */
  resovleImageIndex() {
    if (this.percentage >= 100) return 5;
    else if (this.percentage > 80) return 4;
    else if (this.percentage > 60) return 3;
    else if (this.percentage > 40) return 2;
    else if (this.percentage > 20) return 1;
    else {
      return 0;
    }
  }
}