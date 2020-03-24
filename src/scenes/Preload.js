// Menu
import titleImage from "../assets/sprites/title-screen.png";
import enterImage from "../assets/sprites/press-enter-text.png";
import creditsImage from "../assets/sprites/credits-text.png";
import instructionsImage from "../assets/sprites/instructions.png";

// Play
import heresyImage from "../assets/images/quemMaisLeao.png";
import centerImage from "../assets/images/centro.png";
import lawImage from "../assets/images/lei.png";
import perfectImage from "../assets/images/perfeitos.png";
import dudeImage from "../assets/sprites/nicoBigSprite.png";
import platformImage from "../assets/images/ground.png";
import ground2Image from "../assets/images/ground2.png";
import skyImage from "../assets/images/bg2.png";
import paperImage from "../assets/images/bible.png";
import jesusImage from "../assets/images/jesus.png";
import buttonHorizontalImage from "../assets/images/button-horizontal.png";
// sounds
import paperSound from "../assets/sounds/paper.mp3";
import bgSound from "../assets/sounds/mainMusic.mp3";
import gameOverSound from "../assets/sounds/gameOver.mp3";

export class Preload extends Phaser.Scene {
  constructor() {
    super("Preload");
  }

  preload() {
    this.loadImages();
    this.loadSounds();
  }

  loadImages() {
    // Menu
    this.load.image("titleImage", "assets/sprites/title-screen.png");
    this.load.image("jogarImage", "assets/sprites/Jogar.png");
    this.load.image("creditsImage", "assets/sprites/credits-text.png");
    this.load.image("instructionsImage", "assets/sprites/instructions.png");

    // Play
    this.load.image("sky", skyImage);
    this.load.image("ground", platformImage);
    this.load.image("ground2", ground2Image);
    this.load.image("jesus", jesusImage);
    this.load.image("paper", paperImage);
    this.load.image("heresy", heresyImage);
    this.load.image("center", centerImage);
    this.load.image("law", lawImage);
    this.load.image("perfect", perfectImage);
    this.load.spritesheet("dude", dudeImage, {
      frameWidth: 50,
      frameHeight: 70
    });
    this.load.spritesheet("buttonHorizontal", buttonHorizontalImage, {
      frameWidth: 96,
      frameHeight: 64
    });
  }

  loadSounds() {
    this.load.audio("musicSound", bgSound);
    this.load.audio("paperSound", paperSound);
    this.load.audio("gameOverSound", gameOverSound);
  }

  create() {
    this.scene.start("Menu");
  }
}
