import Player from "../Class/Player";

export class Menu extends Phaser.Scene {
  constructor() {
    super("Menu");
  }

  createBg() {
    let bg = this.add.image(0, 0, "sky");

    bg.displayHeight = this.sys.game.config.height;
    bg.scaleX = bg.scaleY;

    bg.y = this.game.config.height / 2;
    bg.x = this.game.config.width / 2;

    bg.x = bg.displayWidth * 0.4;
  }

  createPlayer() {
    let player;

    // The player and its settings
    player = this.add.existing(new Player(this, 0));

    player.setVelocityX(-200);
    player.anims.play("left", true);
  }

  getRecordScore() {
    return window.localStorage.getItem("recordScore");
  }

  createRecordScore() {
    if (this.getRecordScore()) {
      this.add.text(300, 200, "Best: " + this.getRecordScore(), {
        fontSize: "32px",
        fill: "#000"
      });
    }
  }

  create() {
    this.createBg();
    // middleground = this.add.tileSprite(0, 0, gameWidth, gameHeight, "middleground");
    this.title = this.add.image(400, 100, "titleImage");

    this.createRecordScore();

    this.createPlayer();

    this.pressEnter = this.add.image(700, 500, "jogarImage");
    this.pressEnter.setInteractive();
    this.pressEnter.on("pointerover", this.startGame);

    this.createSoundButton();

    // var startKey = this.input.keyboard.addKey("ENTER");
    // startKey.onDown.add(this.startGame, this);
    this.state = 1;

    this.sound.mute = this.getIsMuted();

    // this.time.addEvent({ delay: 700, callback: this.blinkText, callbackScope: this, loop: true });
  }

  startGame() {
    if (this.state == 1) {
      this.state = 2;
      this.title2 = this.add.image(
        this.width / 2,
        this.height / 2,
        "instructionsImage"
      );
      this.title2.anchor.setTo(0.5);
      this.title.destroy();
    } else {
      this.scene.scene.start("Play");
    }
  }

  blinkText() {
    if (this.pressEnter.alpha) {
      this.pressEnter.alpha = 0;
    } else {
      this.pressEnter.alpha = 1;
    }
  }

  update() {}

  createSoundButton() {
    this.soundButton = this.add.image(700, 350, this.getIsMuted() ? "soundOffImage" : "soundOnImage");
    this.soundButton.setInteractive();
    this.soundButton.on("pointerover", this.setSoundState.bind(this));
  }

  setSoundState() {
    this.setIsMuted(!this.getIsMuted());
    this.createSoundButton();
  }

  getIsMuted() {
    return window.localStorage.getItem("isMuted") === "true" || window.localStorage.getItem("isMuted") == undefined;
  }

  setIsMuted(val) {
    this.sound.mute = val;
    window.localStorage.setItem("isMuted", val);
  }
}
