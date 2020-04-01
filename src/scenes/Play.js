import nipplejs from "nipplejs";

import Player from "../Class/Player";
import { getDifferenceBetweenDatesSeconds } from "../utils/utils";

let platforms,
  player,
  cursors,
  papers,
  heresys = { countActive: () => 0 },
  score = 0,
  gameOver = false,
  scoreText,
  recordScoreText,
  jesus,
  deaths = 0;

export class Play extends Phaser.Scene {
  constructor() {
    super("Play");
  }

  resetStates() {
    this.input.addPointer(4);

    gameOver = false;
    score = 0;
    this.store = {
      level: 0,
      lastJumpTime: 0
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

  createJoystick() {
    this.store.joystick = nipplejs.create({
      zone: document.getElementById("joystickContainer"),
      color: "gray",
      restJoystick: true,
      restOpacity: 0.5,
      lockX: true,
      mode: "static",
      position: { left: "30%", top: "80%" },
      size: 80
    });
  }

  bindJoystick() {
    let position,
      me = this;

    this.store.joystick.on("move", function(evt, data) {
      position = data && data.direction && data.direction.x;

      if (position === "left") {
        me.goLeft();
      } else if (position === "right") {
        me.goRight();
      }
    });

    this.store.joystick.on("end", function(evt, data) {
      me.doStop();
    });
  }

  startMusicHappy() {
    this.musicHappy.loop = true;

    this.musicHappy.play();
  }

  addSounds() {
    this.musicHappy = this.sound.add("musicSound");
    this.paperSound = this.sound.add("paperSound", { volume: 0.8 });
    this.gameOverSound = this.sound.add("gameOverSound");
    this.akuAkuMusicSound = this.sound.add("akuAkuMusicSound", { volume: 1 });
  }

  createPlatforms() {
    platforms = this.physics.add.staticGroup();

    // left bottom
    platforms
      .create(200, 568, "ground")
      .setScale(2)
      .refreshBody();
    // bottom middle
    platforms
      .create(490, 568, "ground2")
      .setScale(2)
      .refreshBody();
    // bottom right
    platforms
      .create(690, 568, "ground2")
      .setScale(2)
      .refreshBody();
    // small in middle
    platforms
      .create(500, 300, "ground2")
      .setScale(0.5)
      .refreshBody();
    // middle middle
    platforms.create(350, 400, "ground2");
    // top left
    platforms.create(150, 250, "ground");
    // top right
    platforms.create(650, 220, "ground");
  }

  createJesus() {
    jesus = this.physics.add.staticGroup();

    //left low
    jesus.create(200, 480, "jesus");
    // left high
    jesus.create(200, 180, "jesus");
    // right high
    jesus.create(650, 150, "jesus");
    // right low
    jesus.create(650, 480, "jesus");
  }

  createButtons() {
    let jumpButton;

    jumpButton = this.add.sprite(700, 450, "buttonHorizontal", null);
    jumpButton.setInteractive();
    jumpButton.on("pointerover", () => {
      this.store.lastJumpTime = new Date();
    });
  }

  createPapers() {
    //  Some papers to collect, 12 in total, evenly spaced 70 pixels apart along the x axis
    papers = this.physics.add.group({
      key: "paper",
      repeat: 11,
      setXY: { x: 12, y: 0, stepX: 70 }
    });

    papers.children.iterate(function(child) {
      //  Give each paper a slightly different bounce
      child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
    });
  }

  createPotion() {
    this.anims.create({
      key: "changePotion",
      frames: this.anims.generateFrameNames("potionImage"),
      frameRate: 4,
      repeat: -1
    });

    this.store.potion = this.physics.add
      .group()
      .playAnimation("changePotion", 0);
  }

  createHeresy() {
    heresys = this.physics.add.group();
  }

  createScore() {
    //  The score
    scoreText = this.add.text(16, 16, "score: 0", {
      fontSize: "32px",
      fill: "#000"
    });

    if (this.getRecordScore()) {
      recordScoreText = this.add.text(
        16,
        42,
        "Best: " + this.getRecordScore(),
        {
          fontSize: "32px",
          fill: "#000"
        }
      );
    }
  }

  createCollide() {
    //  Collide the player and the papers with the platforms
    this.physics.add.collider(player, platforms);
    this.physics.add.collider(papers, jesus);
    this.physics.add.collider(papers, platforms);
    this.physics.add.collider(heresys, jesus);
    this.physics.add.collider(heresys, platforms);
    this.physics.add.collider(this.store.potion, platforms);
    this.physics.add.collider(this.store.potion, papers);
    this.physics.add.collider(this.store.potion, jesus);

    //  Checks to see if the player overlaps with any of the papers, if he does call the collectPaper function
    this.physics.add.overlap(player, papers, this.collectPaper, null, this);

    this.physics.add.collider(player, heresys, this.hitHeresy, null, this);

    this.physics.add.overlap(
      player,
      this.store.potion,
      this.collectPotion,
      null,
      this
    );
  }

  create() {
    this.resetStates();

    this.createJoystick();

    this.bindJoystick();

    //  A simple background for our game
    this.createBg();

    this.addSounds();

    this.startMusicHappy();

    this.createPlatforms();

    this.createJesus();

    // this.createPlayer();
    player = this.add.existing(new Player(this));

    this.createButtons();

    //  Input Events
    cursors = this.input.keyboard.createCursorKeys();

    this.createPapers();

    this.createPotion();

    this.createHeresy();

    this.createScore();

    this.createCollide();
  }

  update() {
    if (gameOver) {
      return;
    }

    if (cursors.left.isDown) {
      this.goLeft();
    } else if (cursors.right.isDown) {
      this.goRight();
    }

    if (cursors.up.isDown) {
      this.store.lastJumpTime = new Date();
    }

    if (player.body.touching.down) {
      if (
        this.store.lastJumpTime !== 0 &&
        getDifferenceBetweenDatesSeconds(this.store.lastJumpTime, new Date()) <
          0.5
      ) {
        this.store.lastJumpTime = 0;
        this.doJump();
      }
    }
  }

  goLeft() {
    player.setVelocityX(this.store.aku ? -500 : -200);

    player.anims.play("left", true);
  }

  goRight() {
    player.setVelocityX(this.store.aku ? 500 : 200);

    player.anims.play("right", true);
  }

  doStop() {
    player.setVelocityX(0);

    player.anims.play("turn");
  }

  doJump() {
    player.setVelocityY(this.store.aku ? -800 : -550);
  }

  collectPaper(player, paper) {
    let heresyArray = ["heresy", "center", "law", "perfect"],
      randomNumber = Math.floor(Math.random() * heresyArray.length),
      randomPotionChance = Math.random() * 100;

    this.paperSound.play();

    paper.disableBody(true, true);

    //  Add and update the score
    score += 10;
    scoreText.setText("Score: " + score);

    if (papers.countActive(true) === 0) {
      this.store.level++;
      //  A new batch of papers to collect
      papers.children.iterate(function(child) {
        child.enableBody(true, child.x, 0, true, true);
      });

      var x =
        player.x < 400
          ? Phaser.Math.Between(400, 800)
          : Phaser.Math.Between(0, 400);

      var heresy = heresys.create(x, 16, heresyArray[randomNumber]);
      heresy.setBounce(1);
      heresy.setCollideWorldBounds(true);
      heresy.setVelocity(Phaser.Math.Between(-200, 200), 20);
      heresy.allowGravity = false;

      if (this.store.level > 2 && randomPotionChance < 30) {
        this.store.potionChild = this.store.potion.create(x, 16, "potionImage");
        this.store.potionChild.setScale(1.5);
      }
    }
  }

  akuEnd() {
    this.akuAkuMusicSound.pause();
    this.musicHappy.play();
    player.setTint(undefined);

    this.store.aku = false;
  }

  collectPotion(player, potion) {
    console.log("pego");
    this.musicHappy.pause();
    this.akuAkuMusicSound.play();
    this.store.aku = true;
    potion.disableBody(true, true);
    player.setTint(Math.random() * 0xffffff);

    this.time.delayedCall(3000, this.akuEnd, [], this);
  }

  doDeath() {
    deaths++;
    if (deaths === 4) {
      //	only works on mobile
      if (typeof admob !== "undefined") {
        admob.requestInterstitialAd();
      }
      deaths = 0;
    }

    this.gameOverSound.play();

    this.musicHappy.pause();

    this.physics.pause();

    player.setTint(0xff0000);

    player.anims.play("turn");

    gameOver = true;

    this.setLastScore(score);

    if (this.getRecordScore() <= score) {
      this.setRecordScore(score);
    }

    this.store.joystick.destroy();

    // this.scene.restart();
    this.scene.start("Menu");
  }

  hitHeresy(player, heresy) {
    if (!this.store.aku) {
      this.doDeath(player);
    } else {
      heresy.disableBody(true, true);
    }
  }

  getRecordScore() {
    return window.localStorage.getItem("recordScore");
  }

  setRecordScore(val) {
    window.localStorage.setItem("recordScore", val);
  }

  setLastScore(val) {
    window.localStorage.setItem("lastScore", val);
  }
}
