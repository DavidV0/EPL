class MoveableObject {
  x = 120;
  y = 280;
  height = 150;
  width = 100;
  img;
  imageCache = {};
  currentImage = 0;
  speed = 0.15;
otherDirection = false
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

  moveRight() {
    console.log("moving right");
  }

  moveLeft() {
    setInterval(() => {
        this.x -= this.speed;
      }, 1000/60);
  }
}
