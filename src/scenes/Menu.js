import Player from "../Class/Player";

export class Menu extends Phaser.Scene {
  constructor() {
    super("Menu");
  }

  init(data) {
    this.store = {
      rexFire: data.rexFire
    };
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
    this.time.delayedCall(
      14800,
      () => {
        player.setVelocityX(0);
        player.anims.play("turn");
      },
      [],
      this
    );
  }

  getRecordScore() {
    return window.localStorage.getItem("recordScore");
  }

  getLastScore() {
    return window.localStorage.getItem("lastScore");
  }

  createRecordScore() {
    if (this.getRecordScore()) {
      this.add.text(440, 210, this.getRecordScore(), {
        fontSize: "32px",
        fill: "#000"
      });
    }
  }

  createLastScore() {
    if (this.getLastScore()) {
      this.add.text(250, 210, this.getLastScore(), {
        fontSize: "32px",
        fill: "#000"
      });
    }
  }

  createLeaderboard() {
    let me = this,
      rankY;

    this.add.image(390, 350, "rankingImage");

    this.store.leaderBoard = this.store.rexFire.add.leaderBoard({
      root: "leaderboard-test",
      // timeFilters: true,
      pageItemCount: 7
    });

    rankY = 280;

    this.store.leaderBoard
      .loadFirstPage()
      // leaderBoard.getRank(userID)
      .then(function(rank) {
        rank.forEach((player, index) => {
          rankY = rankY + 30;
          me.add.text(
            215,
            rankY,
            `${index + 1}.${player.userName} ${player.score}`,
            {
              fontSize: "25px",
              fill: "#000"
            }
          );
        });
      })
      .catch(function(error) {});
  }

  create() {
    this.createBg();
    // middleground = this.add.tileSprite(0, 0, gameWidth, gameHeight, "middleground");
    this.title = this.add.image(400, 100, "titleImage");

    this.createLeaderboard();

    this.createRecordScore();

    this.createLastScore();

    this.createPlayer();

    this.createPlayButton();

    this.createSoundButton();

    // var startKey = this.input.keyboard.addKey("ENTER");
    // startKey.onDown.add(this.startGame, this);
    this.state = 1;

    this.sound.mute = this.getIsMuted();

    // this.time.addEvent({ delay: 700, callback: this.blinkText, callbackScope: this, loop: true });
  }

  startGame() {
    this.scene.start("Play", { leaderBoard: this.store.leaderBoard });
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
    this.soundButton = this.add.image(
      700,
      350,
      this.getIsMuted() ? "soundOffImage" : "soundOnImage"
    );

    this.soundButton.setScale(0.5);
    this.soundButton.setInteractive();
    this.soundButton.on("pointerdown", this.setSoundState.bind(this));
  }

  createPlayButton() {
    this.pressEnter = this.add.image(700, 500, "playImage");
    this.pressEnter.setScale(0.5);
    this.pressEnter.setInteractive();
    this.pressEnter.on("pointerover", this.startGame.bind(this));
  }

  setSoundState() {
    this.setIsMuted(!this.getIsMuted());
    this.createSoundButton();
  }

  getIsMuted() {
    return (
      window.localStorage.getItem("isMuted") === "true" ||
      window.localStorage.getItem("isMuted") == undefined
    );
  }

  setIsMuted(val) {
    this.sound.mute = val;
    window.localStorage.setItem("isMuted", val);
  }
}
