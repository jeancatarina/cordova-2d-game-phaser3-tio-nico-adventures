// PlayerName
import yesImage from "../assets/sprites/button_yes.png";

// Menu
import titleImage from "../assets/sprites/title-screen.png";
import creditsImage from "../assets/sprites/credits-text.png";
import instructionsImage from "../assets/sprites/instructions.png";
import playImage from "../assets/sprites/play.png";
import soundOffImage from "../assets/sprites/soundOff.png";
import soundOnImage from "../assets/sprites/soundOn.png";
import rankingImage from "../assets/images/ranking.png";
import changeSkinBtn from "../assets/sprites/changeSkinBtn.png";

// Play
import heresyImage from "../assets/images/quemMaisLeao.png";
import centerImage from "../assets/images/centro.png";
import lawImage from "../assets/images/lei.png";
import perfectImage from "../assets/images/perfeitos.png";
import platformImage from "../assets/images/ground.png";
import ground2Image from "../assets/images/ground2.png";
import skyImage from "../assets/images/bg2.png";
import paperImage from "../assets/images/bible.png";
import jesusImage from "../assets/images/jesus.png";
import potionImage from "../assets/sprites/potion.png";
import xBtnImage from "../assets/images/xBtn.png";
import helmImage from "../assets/sprites/Helm.png";

import bombadoSkinLeft from "../assets/sprites/skins/bombado/left.png";
import bombadoSkinRight from "../assets/sprites/skins/bombado/right.png";

import classicSkinLeft from "../assets/sprites/skins/classic/left.png";
import classicSkinRight from "../assets/sprites/skins/classic/right.png";
import classicSkinIdle from "../assets/sprites/skins/classic/idle.png";

import helmetSkinLeft from "../assets/sprites/skins/helmet/left.png";
import helmetSkinRight from "../assets/sprites/skins/helmet/right.png";
import helmetSkinIdle from "../assets/sprites/skins/helmet/idle.png";

// sounds
import paperSound from "../assets/sounds/paper.mp3";
import bgSound from "../assets/sounds/mainMusic.mp3";
import gameOverSound from "../assets/sounds/gameOver.mp3";
import akuAkuMusicSound from "../assets/sounds/akuAkuMusic.mp3";
import warScreamSound from "../assets/sounds/warScream.wav";

import firebaseConfig from "../config/firebaseConfig.js";

export class Preload extends Phaser.Scene {
  constructor() {
    super("Preload");
    this.store = {};
  }

  init() {
    this.store.rexFire = this.plugins
      .get("rexFire")
      .initializeApp(firebaseConfig);
  }

  preload() {
    this.addProgressBar();

    this.loadImages();
    this.loadSounds();
  }

  create() {
    this.scene.start("PlayerName", { rexFire: this.store.rexFire });
  }

  loadImages() {
    // PlayerName
    this.load.image("yesImage", yesImage);

    // Menu
    this.load.image("titleImage", titleImage);
    this.load.image("playImage", playImage);
    this.load.image("creditsImage", creditsImage);
    this.load.image("instructionsImage", instructionsImage);
    this.load.image("soundOffImage", soundOffImage);
    this.load.image("soundOnImage", soundOnImage);
    this.load.image("rankingImage", rankingImage);
    this.load.image("changeSkinBtn", changeSkinBtn);

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
	// itens
	this.load.image("helmImage", helmImage);
	this.load.spritesheet("potionImage", potionImage, {
		frameWidth: 32,
		frameHeight: 32
	});

	// skins
    this.load.spritesheet("classicSkinIdle", classicSkinRight, {
      frameWidth: 77,
      frameHeight: 74
    });
    this.load.spritesheet("classicSkinRight", classicSkinRight, {
      frameWidth: 77,
      frameHeight: 74
    });
    this.load.spritesheet("classicSkinLeft", classicSkinLeft, {
      frameWidth: 77,
      frameHeight: 74
	});
	
    this.load.spritesheet("bombadoSkinLeft", bombadoSkinLeft, {
      frameWidth: 77,
      frameHeight: 74
    });
    this.load.spritesheet("bombadoSkinRight", bombadoSkinRight, {
      frameWidth: 77,
      frameHeight: 74
    });
    this.load.spritesheet("bombadoSkinIdle", bombadoSkinRight, {
      frameWidth: 77,
      frameHeight: 74
	});
	
    this.load.spritesheet("helmetSkinLeft", helmetSkinLeft, {
      frameWidth: 50,
      frameHeight: 70
    });
    this.load.spritesheet("helmetSkinRight", helmetSkinRight, {
      frameWidth: 50,
      frameHeight: 70
    });
    this.load.spritesheet("helmetSkinIdle", helmetSkinIdle, {
      frameWidth: 50,
      frameHeight: 70
    });
  }

  loadSounds() {
    this.load.audio("musicSound", bgSound);
    this.load.audio("paperSound", paperSound);
    this.load.audio("gameOverSound", gameOverSound);
    this.load.audio("akuAkuMusicSound", akuAkuMusicSound);
    this.load.audio("warScreamSound", warScreamSound);
  }

  addProgressBar() {
    const width = this.cameras.main.width;
    const height = this.cameras.main.height;

    const progressBar = this.add.graphics();
    const progressBox = this.add.graphics();
    progressBox.fillStyle(0x222222, 0.8);
    progressBox.fillRect(width / 4, height / 2 - 30, width / 2, 50);

    const loadingText = this.make.text({
      x: width / 2,
      y: height / 2 - 50,
      text: "Loading...",
      style: {
        font: "20px monospace",
        fill: "#ffffff"
      }
    });
    loadingText.setOrigin(0.5, 0.5);

    const percentText = this.make.text({
      x: width / 2,
      y: height / 2 - 5,
      text: "0%",
      style: {
        font: "18px monospace",
        fill: "#ffffff"
      }
    });
    percentText.setOrigin(0.5, 0.5);

    const assetText = this.make.text({
      x: width / 2,
      y: height / 2 + 50,
      text: "",
      style: {
        font: "18px monospace",
        fill: "#ffffff"
      }
    });

    assetText.setOrigin(0.5, 0.5);

    this.load.on("progress", value => {
      percentText.setText(parseInt(value * 100 + "", 10) + "%");
      progressBar.clear();
      progressBar.fillStyle(0xffffff, 1);
      progressBar.fillRect(
        width / 4 + 10,
        height / 2 - 30 + 10,
        (width / 2 - 10 - 10) * value,
        30
      );
    });

    this.load.on("fileprogress", file => {
      assetText.setText("Loading asset: " + file.key);
    });

    this.load.on("complete", () => {
      progressBar.destroy();
      progressBox.destroy();
      loadingText.destroy();
      percentText.destroy();
      assetText.destroy();
    });
  }
}
