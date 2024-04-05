class Endboss extends MoveableObject {
  world;
  height = 400;
  width = 175;
  y = 65;
  firstContact = false;
  speed = 10;
  energy = 100;
  alive = true;

  offset = {
    top: 50,
    left: 20,
    right: 20,
    bottom: 5,
  };

  bossSound = new Audio("audio/boss_sound.mp3");

  IMAGES_WALKING = [
    "img/4_enemie_boss_chicken/1_walk/G1.png",
    "img/4_enemie_boss_chicken/1_walk/G2.png",
    "img/4_enemie_boss_chicken/1_walk/G3.png",
    "img/4_enemie_boss_chicken/1_walk/G4.png",
  ];

  IMAGES_SPAWNING = [
    "img/4_enemie_boss_chicken/2_alert/G5.png",
    "img/4_enemie_boss_chicken/2_alert/G6.png",
    "img/4_enemie_boss_chicken/2_alert/G8.png",
    "img/4_enemie_boss_chicken/2_alert/G9.png",
    "img/4_enemie_boss_chicken/2_alert/G10.png",
    "img/4_enemie_boss_chicken/2_alert/G11.png",
    "img/4_enemie_boss_chicken/2_alert/G12.png",
  ];

  IMAGES_ATTACK = [
    "img/4_enemie_boss_chicken/3_attack/G13.png",
    "img/4_enemie_boss_chicken/3_attack/G14.png",
    "img/4_enemie_boss_chicken/3_attack/G15.png",
    "img/4_enemie_boss_chicken/3_attack/G16.png",
    "img/4_enemie_boss_chicken/3_attack/G17.png",
    "img/4_enemie_boss_chicken/3_attack/G19.png",
    "img/4_enemie_boss_chicken/3_attack/G20.png",
  ];

  IMAGES_HURT = [
    "img/4_enemie_boss_chicken/4_hurt/G21.png",
    "img/4_enemie_boss_chicken/4_hurt/G22.png",
    "img/4_enemie_boss_chicken/4_hurt/G23.png",
  ];

  IMAGES_DEAD = [
    "img/4_enemie_boss_chicken/5_dead/G24.png",
    "img/4_enemie_boss_chicken/5_dead/G25.png",
    "img/4_enemie_boss_chicken/5_dead/G26.png",
  ];

  constructor() {
    super().loadImage("img/4_enemie_boss_chicken/2_alert/G5.png");
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_SPAWNING);
    this.loadImages(this.IMAGES_ATTACK);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_DEAD);
    this.x = 2300;
  }
  /**
   * mutes the sounds in the character class
   */
  muteSounds() {
    this.bossSound.muted = true;
  }

  /**
   * unmutes the sounds in the character class
   */
  unmuteSounds() {
    this.bossSound.muted = false;
  }

  /**
   * lets the boss attack
   */
  bossAttack() {
    this.speed = 20;
    this.playAnimation(this.IMAGES_ATTACK);
    this.moveLeft();
    this.moveLeft();
    this.moveLeft();
  }

  /**
   * lets the boss move to the left
   */
  bossMoveLeft() {
    this.bossSound.volume = 0.2
    this.bossSound.play();
    this.speed = 15;
    this.playAnimation(this.IMAGES_WALKING);
    this.moveLeft();
  }

  animate() {
    let i = 0;
    setInterval(() => {
      i++;
      if (this.alive) {
        if (this.world.character.x > 1720 && this.hadFirstContact === false) {
          this.spawnBossAnimation();
         
        } else if (this.hadFirstContact === true && i == 14) {
     
          this.bossAttack();
        } else if (this.hadFirstContact === true) {
          i = i % 15;
          if (this.world.character.x > this.x + 180) {
            this.world.character.energy = 0;
          }
          this.bossMoveLeft();
        }
      } else if (!this.alive) {
        this.killedEndboss();
      }
    }, 1000 / 10);
  }

  /**
   * lets spawn the boss
   */
  spawnBossAnimation() {
    this.playAnimation(this.IMAGES_SPAWNING);
    this.hadFirstContact = true;
    this.createBossStatusBar();
  }

  /**
   * spawn boss status bar
   */
  createBossStatusBar() {
    this.world.spawnEndbossStatusBar = true;
  }

  /**
   * kills the boss
   */
  killedEndboss() {
    setTimeout(() => {
      this.playAnimation(this.IMAGES_DEAD);
    }, 3000);
    displayWin();
  }
}
