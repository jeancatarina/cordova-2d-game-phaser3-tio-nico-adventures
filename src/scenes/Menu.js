import Player from "../Class/Player";
import * as storage from "../utils/storage";

const COLOR_PRIMARY = 0x4e342e;
const COLOR_LIGHT = 0x7b5e57;
const COLOR_DARK = 0x260e04;
const COLOR_WHITE = 0xffffff;

export class Menu extends Phaser.Scene {
  constructor() {
    super("Menu");
  }

  init(data) {
    this.store = {
      rexFire: data.rexFire,
    };
  }

  create() {
    this.createBg();
    this.title = this.add.image(400, 100, "titleImage");

    this.createLeaderboard();

    this.createRecordScore();

    this.createLastScore();

    // this.createPlayer();

    this.createPlayButton();

    this.createChangeSkinBtn();

    this.createFollowMeBtn();

    this.createSoundButton();

    this.createDonateButton();

    this.state = 1;

    this.sound.mute = storage.getIsMuted();
  }

  update() {}

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

  createRecordScore() {
    if (storage.getRecordScore()) {
      this.add.text(440, 210, storage.getRecordScore(), {
        fontSize: "32px",
        fill: "#000",
      });
    }
  }

  createLastScore() {
    if (storage.getLastScore()) {
      this.add.text(250, 210, storage.getLastScore(), {
        fontSize: "32px",
        fill: "#000",
      });
    }
  }

  createLeaderboard() {
    let me = this;

    this.add.image(390, 350, "rankingImage");

    if (!this.store.leaderBoard) {
      this.store.leaderBoard = this.store.rexFire.add.leaderBoard({
        root: "leaderboard-test",
        // timeFilters: true,
        pageItemCount: 100,
      });
    }

    this.store.leaderBoard
      .loadFirstPage()
      // leaderBoard.getRank(userID)
      .then(function (rank) {
        me.createTable(rank);
      })
      .catch(function (error) {});
  }

  createTable(rank) {
    var scrollablePanel = this.rexUI.add
      .scrollablePanel({
        x: 390,
        y: 410,
        width: 350,
        height: 220,
        scrollMode: 0,
        background: this.rexUI.add.roundRectangle(0, 0, 2, 2, 10, COLOR_WHITE),
        panel: {
          child: this.createGrid(this, rank),
          mask: {
            mask: true,
            padding: 1,
          },
        },
        slider: {
          track: this.rexUI.add.roundRectangle(0, 0, 20, 10, 10, COLOR_LIGHT),
          thumb: this.rexUI.add.roundRectangle(0, 0, 0, 0, 13, COLOR_DARK),
        },
        space: {
          left: 10,
          right: 10,
          top: 10,
          bottom: 10,
          panel: 10,
          header: 10,
          footer: 10,
        },
      })
      .layout();
  }

  createGrid(scene, rank) {
    var sizer = scene.rexUI.add.gridSizer({
      column: 2,
      row: rank.length,
      columnProportions: 1,
    });

    rank.forEach((player, index) => {
      sizer.add(
        this.createItem(scene, 0, index, player.userName), // child
        0, // columnIndex
        index, // rowIndex
        "center", // align
        0, // paddingConfig
        true // expand
      );
      sizer.add(
        this.createItem(scene, 1, index, player.score), // child
        1, // columnIndex
        index, // rowIndex
        "center", // align
        0, // paddingConfig
        true // expand
      );
    });

    return sizer;
  }

  createItem(scene, colIdx, rowIdx, text) {
    var item = scene.rexUI.add
      .label({
        background: scene.rexUI.add
          .roundRectangle(0, 0, 0, 0, 0, undefined)
          .setStrokeStyle(2, COLOR_DARK, 1),
        text: scene.add.text(0, 0, text, {
          fontSize: 18,
          fill: "#000",
        }),
        space: {
          left: 10,
          right: 10,
          top: 10,
          bottom: 10,
          icon: 10,
        },
      })
      .setDepth(3);
    var press = scene.rexUI.add.press(item).on("pressstart", function () {
      console.log(`press ${text}`);
    });
    return item;
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

  createSoundButton() {
    this.soundButton = this.add.image(
      700,
      350,
      storage.getIsMuted() ? "soundOffImage" : "soundOnImage"
    );

    this.soundButton.setScale(0.5);
    this.soundButton.setInteractive();
    this.soundButton.on("pointerup", this.setSoundState.bind(this));
  }

  createPlayButton() {
    this.pressEnter = this.add.image(700, 500, "playImage");
    this.pressEnter.setScale(0.5);
    this.pressEnter.setInteractive();
    this.pressEnter.on("pointerup", this.startGame.bind(this));
  }

  createChangeSkinBtn() {
    this.pressEnter = this.add.image(100, 500, "changeSkinBtn");
    this.pressEnter.setScale(0.5);
    this.pressEnter.setInteractive();
    this.pressEnter.on("pointerup", this.goToChangeSkinScene.bind(this));
  }

  createDonateButton() {
    this.donateBtn = this.add.image(700, 200, "donateBtn");
    this.donateBtn.setScale(0.5);
    this.donateBtn.setInteractive();
    this.donateBtn.on("pointerup", this.goToDonateScene.bind(this));
  }

  createFollowMeBtn() {
    this.pressEnter = this.add.image(100, 350, "followMeBtn");
    this.pressEnter.setScale(0.5);
    this.pressEnter.setInteractive();
    this.pressEnter.on("pointerdown", () =>
      window.open("https://twitter.com/jeanscatarina", "_blank")
    );
  }

  goToChangeSkinScene() {
    this.scene.start("ChangeSkin");
  }

  goToDonateScene() {
    this.scene.start("Donate");
  }

  setSoundState() {
    this.setIsMuted(!storage.getIsMuted());
    this.createSoundButton();
  }

  setIsMuted(val) {
    this.sound.mute = val;
    storage.setIsMuted(val);
  }
}
