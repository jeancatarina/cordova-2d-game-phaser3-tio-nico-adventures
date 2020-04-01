// Menu
import titleImage from "../assets/sprites/title-screen.png";
import creditsImage from "../assets/sprites/credits-text.png";
import instructionsImage from "../assets/sprites/instructions.png";
import jogarImage from "../assets/sprites/Jogar.png";
import soundOffImage from "../assets/sprites/soundOff.png";
import soundOnImage from "../assets/sprites/soundOn.png";

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
import potionImage from "../assets/sprites/potion.png";
import xBtnImage from "../assets/images/xBtn.png";

// sounds
import paperSound from "../assets/sounds/paper.mp3";
import bgSound from "../assets/sounds/mainMusic.mp3";
import gameOverSound from "../assets/sounds/gameOver.mp3";
import akuAkuMusicSound from "../assets/sounds/akuAkuMusic.mp3";

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
    this.load.image("titleImage", titleImage);
    this.load.image("jogarImage", jogarImage);
    this.load.image("creditsImage", creditsImage);
    this.load.image("instructionsImage", instructionsImage);
    this.load.image("soundOffImage", soundOffImage);
    this.load.image("soundOnImage", soundOnImage);

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
    this.load.image("buttonHorizontal", xBtnImage);
    this.load.spritesheet("dude", dudeImage, {
      frameWidth: 50,
      frameHeight: 70
    });
    // this.load.spritesheet("buttonHorizontal", buttonHorizontalImage, {
    //   frameWidth: 96,
    //   frameHeight: 64
    // });
    this.load.spritesheet("potionImage", potionImage, {
      frameWidth: 32,
      frameHeight: 32
    });
  }

  loadSounds() {
    this.load.audio("musicSound", bgSound);
    this.load.audio("paperSound", paperSound);
    this.load.audio("gameOverSound", gameOverSound);
    this.load.audio("akuAkuMusicSound", akuAkuMusicSound);
  }

  create() {
    this.scene.start("Menu");
  }
}
