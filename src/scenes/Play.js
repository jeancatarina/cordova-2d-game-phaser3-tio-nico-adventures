import nipplejs from "nipplejs";

import Player from "../Class/Player";

let platforms,
  player,
  cursors,
  papers,
  heresys,
  score = 0,
  gameOver = false,
  scoreText,
  recordScoreText,
  jesus,
  deaths = 0;

export class Play extends Phaser.Scene {
  constructor() {
    super("Play");

    this.store = {};
  }

  resetStates() {
    gameOver = false;
    score = 0;
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
      mode: "dynamic",
      position: { left: "25%", top: "80%" },
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
    this.paperSound = this.sound.add("paperSound");
    this.gameOverSound = this.sound.add("gameOverSound");
  }

  createPlatforms() {
    platforms = this.physics.add.staticGroup();

    platforms
      .create(200, 568, "ground")
      .setScale(2)
      .refreshBody();
    platforms
      .create(480, 568, "ground2")
      .setScale(2)
      .refreshBody();
    platforms
      .create(670, 568, "ground2")
      .setScale(2)
      .refreshBody();
    platforms
      .create(550, 300, "ground2")
      .setScale(0.5)
      .refreshBody();
    platforms.create(400, 400, "ground2");
    platforms.create(120, 250, "ground");
    platforms.create(700, 220, "ground");
  }

  createJesus() {
    jesus = this.physics.add.staticGroup();

    //left low
    jesus.create(300, 480, "jesus");
    // left high
    jesus.create(200, 180, "jesus");
    // right high
    jesus.create(650, 150, "jesus");
    // right low
    jesus.create(650, 480, "jesus");
  }

  createButtons() {
    let jumpButton;

    jumpButton = this.add.sprite(
      700,
      500,
      "buttonHorizontal",
      null,
      this,
      0,
      1,
      0,
      1
    );
    jumpButton.setInteractive();
    jumpButton.on("pointerover", this.doJump);
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
    this.physics.add.collider(heresys, jesus);
    this.physics.add.collider(papers, platforms);
    this.physics.add.collider(heresys, platforms);

    //  Checks to see if the player overlaps with any of the papers, if he does call the collectPaper function
    this.physics.add.overlap(player, papers, this.collectPaper, null, this);

    this.physics.add.collider(player, heresys, this.hitHeresy, null, this);
  }

  create() {
    this.resetStates();

    this.createJoystick();

    this.bindJoystick();

    this.input.addPointer(2);

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
      this.doJump();
    }
  }

  goLeft() {
    player.setVelocityX(-200);

    player.anims.play("left", true);
  }

  goRight() {
    player.setVelocityX(200);

    player.anims.play("right", true);
  }

  doStop() {
    player.setVelocityX(0);

    player.anims.play("turn");
  }

  doJump() {
    if (player.body.touching.down) {
      player.setVelocityY(-550);
    }
  }

  collectPaper(player, paper) {
    let heresyArray = ["heresy", "center", "law", "perfect"],
      randomNumber = Math.floor(Math.random() * heresyArray.length);

    this.paperSound.play();

    paper.disableBody(true, true);

    //  Add and update the score
    score += 10;
    scoreText.setText("Score: " + score);

    if (papers.countActive(true) === 0) {
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
    }
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

    if (this.getRecordScore() <= score) {
      this.setRecordScore(score);
    }

    this.store.joystick.destroy();

    // this.scene.restart();
    this.scene.start("Menu");
  }

  hitHeresy() {
    this.doDeath(player);
  }

  getRecordScore() {
    return window.localStorage.getItem("recordScore");
  }

  setRecordScore(val) {
    window.localStorage.setItem("recordScore", val);
  }
}
