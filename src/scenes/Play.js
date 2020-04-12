import nipplejs from "nipplejs";

import Player from "../Class/Player";
import { getDifferenceBetweenDatesSeconds } from "../utils/utils";
import * as storage from "../utils/storage";

let platforms,
  cursors,
  papers,
  heresys = { countActive: () => 0 },
  score = 0,
  gameOver = false,
  scoreText,
  recordScoreText,
  deaths = 0;

export class Play extends Phaser.Scene {
  constructor() {
    super("Play");
  }

  init(data) {
    this.input.addPointer(4);

    gameOver = false;
    score = 0;
    this.store = {
      level: 0,
      lastJumpTime: 0,
      leaderBoard: data.leaderBoard,
      potionDropLevel: 3,
      lifeActive: 0,
      imortal: false,
      aku: false,
      player: undefined,
    };
  }

  create() {
    this.createJoystick();

    this.bindJoystick();

    //  A simple background for our game
    this.createBg();

    this.addSounds();

    this.startMusicHappy();

    this.createPlatforms();

    this.createJesus();

    this.createPlayer();

    this.createButtons();

    //  Input Events
    cursors = this.input.keyboard.createCursorKeys();

    this.createPapers();

    this.createPotion();

    this.createLife();

    this.createHeresy();

    this.createScore();

    this.createHelmetCounter();

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

    if (this.store.player.body.touching.down) {
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

  createPlayer() {
	this.store.player = this.add.existing(
		new Player(
			this,
			100,
			450,
			storage.getSelectedSkin()
		)
	);
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
      size: 80,
    });
  }

  bindJoystick() {
    let position,
      me = this;

    this.store.joystick.on("move", function (evt, data) {
      position = data && data.direction && data.direction.x;

      if (position === "left") {
        me.goLeft();
      } else if (position === "right") {
        me.goRight();
      }
    });

    this.store.joystick.on("end", function (evt, data) {
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
    this.warScreamSound = this.sound.add("warScreamSound", { volume: 1 });
  }

  createPlatforms() {
    platforms = this.physics.add.staticGroup();

    // left bottom
    platforms.create(200, 568, "ground").setScale(2).refreshBody();
    // bottom middle
    platforms.create(490, 568, "ground2").setScale(2).refreshBody();
    // bottom right
    platforms.create(690, 568, "ground2").setScale(2).refreshBody();
    // small in middle
    this.store.floatPlatformSmallMiddle = this.physics.add
      .image(520, 300, "ground2")
      .setScale(0.5)
      .setImmovable(true)
      .setVelocity(0, -0);
    // middle middle
    this.store.floatPlatformMiddleMiddle = this.physics.add
      .image(350, 400, "ground2")
      .setImmovable(true)
      .setVelocity(0, -0);
    // top left
    this.store.floatPlatformTopLeft = this.physics.add
      .image(150, 250, "ground")
      .setImmovable(true)
      .setVelocity(0, -0);
    // top right
    this.store.floatPlatformTopRight = this.physics.add
      .image(650, 220, "ground")
      .setImmovable(true)
      .setVelocity(0, -0);

    this.store.floatPlatformSmallMiddle.body.setAllowGravity(false);
    this.store.floatPlatformMiddleMiddle.body.setAllowGravity(false);
    this.store.floatPlatformTopLeft.body.setAllowGravity(false);
    this.store.floatPlatformTopRight.body.setAllowGravity(false);
  }

  createJesus() {
    this.store.jesus = this.physics.add.group();

    //left low
    this.store.jesus.create(200, 480, "jesus");
    // left high
    this.store.jesus.create(200, 180, "jesus");
    // right high
    this.store.jesus.create(650, 150, "jesus");
    // right low
    this.store.jesus.create(650, 480, "jesus");

    this.store.jesus.children.iterate((child) => {
      child.setCollideWorldBounds(true);
      child.setBounce(0);
      //   child.setGravityY(10000);
      child.setImmovable(true);
      child.body.setAllowGravity(false);
    });
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
      setXY: { x: 12, y: 0, stepX: 70 },
    });

    papers.children.iterate(function (child) {
      //  Give each paper a slightly different bounce
      child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
    });
  }

  createPotion() {
    this.anims.create({
      key: "changePotion",
      frames: this.anims.generateFrameNames("potionImage"),
      frameRate: 4,
      repeat: -1,
    });

    this.store.potion = this.physics.add
      .group()
      .playAnimation("changePotion", 0);
  }

  createLife() {
    this.store.life = this.physics.add.group();
  }

  createHeresy() {
    heresys = this.physics.add.group();
  }

  createScore() {
    //  The score
    scoreText = this.add.text(16, 16, "score: 0", {
      fontSize: "32px",
      fill: "#000",
    });

    if (storage.getRecordScore()) {
      recordScoreText = this.add.text(
        16,
        42,
        "Best: " + storage.getRecordScore(),
        {
          fontSize: "32px",
          fill: "#000",
        }
      );
    }
  }

  createHelmetCounter() {
    //  The score
    this.add.image(740, 30, "helmImage");
    this.store.helmetCounterText = this.add.text(760, 16, "0", {
      fontSize: "32px",
      fill: "#000",
    });
  }

  addCollider(object, arrayObjects) {
    const me = this;

    arrayObjects.map((arrayObject) => {
      me.physics.add.collider(object, arrayObject);
    });
  }

  createCollide() {
    //  Collide the player and the papers with the platforms
    this.physics.add.collider(this.store.player, platforms);
    this.physics.add.collider(this.store.jesus, platforms);

    this.addCollider(this.store.life, [papers, this.store.jesus, platforms]);
    this.addCollider(this.store.potion, [papers, this.store.jesus, platforms]);
    this.addCollider(papers, [platforms]);
    this.addCollider(heresys, [platforms, this.store.jesus]);

    this.addCollider(this.store.floatPlatformSmallMiddle, [
      this.store.player,
      papers,
      heresys,
      this.store.potion,
      this.store.life,
      this.store.jesus,
    ]);

    this.addCollider(this.store.floatPlatformMiddleMiddle, [
      this.store.player,
      papers,
      heresys,
      this.store.potion,
      this.store.life,
      this.store.jesus,
    ]);

    this.addCollider(this.store.floatPlatformTopLeft, [
      this.store.player,
      papers,
      heresys,
      this.store.potion,
      this.store.life,
      this.store.jesus,
    ]);

    this.addCollider(this.store.floatPlatformTopRight, [
      this.store.player,
      papers,
      heresys,
      this.store.potion,
      this.store.life,
      this.store.jesus,
    ]);
    this.addCollider(this.store.floatPlatformTopLeft, [
      this.store.player,
      papers,
      heresys,
      this.store.potion,
      this.store.life,
      this.store.jesus,
    ]);

    //  Checks to see if the player overlaps with any of the papers, if he does call the collectPaper function
    this.physics.add.overlap(
      this.store.player,
      papers,
      this.collectPaper,
      null,
      this
    );

    this.physics.add.overlap(
      this.store.player,
      heresys,
      this.hitHeresy,
      null,
      this
    );

    this.physics.add.overlap(
      this.store.player,
      this.store.potion,
      this.collectPotion,
      null,
      this
    );

    this.physics.add.overlap(
      this.store.player,
      this.store.life,
      this.collectLife,
      null,
      this
    );
  }

  goLeft() {
    this.store.player.setVelocityX(this.store.aku ? -500 : -200);

    this.store.player.anims.play("left", true);
  }

  goRight() {
    this.store.player.setVelocityX(this.store.aku ? 500 : 200);

    this.store.player.anims.play("right", true);
  }

  doStop() {
    this.store.player.setVelocityX(0);

    this.store.player.anims.play("turn");
  }

  doJump() {
    this.store.player.setVelocityY(this.store.aku ? -1800 : -550);
  }

  movePlatforms() {
    switch (this.store.level) {
      case 5:
        this.tweens.timeline({
          targets: this.store.floatPlatformSmallMiddle.body.velocity,
          loop: -1,
          tweens: [
            { x: -40, y: 0, duration: 5000, ease: "Stepped" },
            { x: 0, y: 0, duration: 3000, ease: "Stepped" },
            { x: 40, y: 0, duration: 5000, ease: "Stepped" },
            { x: 0, y: 0, duration: 3000, ease: "Stepped" },
          ],
        });
        this.tweens.timeline({
          targets: this.store.floatPlatformMiddleMiddle.body.velocity,
          loop: -1,
          tweens: [
            { x: 30, y: 0, duration: 5000, ease: "Stepped" },
            { x: 0, y: 0, duration: 3000, ease: "Stepped" },
            { x: -30, y: 0, duration: 5000, ease: "Stepped" },
            { x: 0, y: 0, duration: 3000, ease: "Stepped" },
          ],
        });
        break;
      case 2:
        break;
      default:
        break;
    }
  }

  collectPaper(player, paper) {
    let heresyArray = ["heresy", "center", "law", "perfect"],
      randomNumber = Math.floor(Math.random() * heresyArray.length),
      randomLifeChance = Math.random() * 100;

    this.paperSound.play();

    paper.disableBody(true, true);

    //  Add and update the score
    score += 10;
    scoreText.setText("Score: " + score);

    if (papers.countActive(true) === 0) {
      this.store.level++;

      this.movePlatforms();

      //  A new batch of papers to collect
      papers.children.iterate(function (child) {
        child.enableBody(true, child.x, 0, true, true);
        child.setCollideWorldBounds(true);
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

      if (randomLifeChance < 15) {
        this.store.lifeChild = this.store.life.create(400, 16, "helmImage");
        this.store.lifeChild.setScale(1.5);
      }

      if (this.store.level === this.store.potionDropLevel) {
        this.store.potionDropLevel =
          this.store.level + this.store.potionDropLevel + 1;
        this.store.potionChild = this.store.potion.create(x, 60, "potionImage");
        this.store.potionChild.setScale(1.5);
      }
    }
  }

  akuEnd(player, potion) {
    this.akuAkuMusicSound.pause();
    this.musicHappy.play();
    this.store.player.setTint(undefined);
    player.setCustomGravity();

    this.store.aku = false;

    this.store.imortal = true;
    this.time.delayedCall(
      2000,
      () => {
        this.store.imortal = false;
      },
      [],
      this
    );
  }

  collectPotion(player, potion) {
    this.musicHappy.pause();
    this.akuAkuMusicSound.play();
    this.store.aku = true;
    potion.disableBody(true, true);
    player.setTint(Math.random() * 0xffffff);
    player.setCustomGravity(1000);

    this.time.delayedCall(
      3000,
      this.akuEnd.bind(this, player, potion),
      [],
      this
    );
  }

  collectLife(player, life) {
    if (!this.store.lifeActive) {
      player.changeSkin(this, "helmetSkin");
    }

    this.warScreamSound.play();
    this.store.lifeActive++;
    this.store.helmetCounterText.setText(this.store.lifeActive);
    life.disableBody(true, true);
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

    this.store.player.setTint(0xff0000);

    this.store.player.anims.play("turn");

    gameOver = true;

    storage.setLastScore(score);

    if (storage.getRecordScore() <= score) {
      this.setRecordScore(score);
    }

    this.store.joystick.destroy();

    // this.scene.restart();
    this.scene.start("Menu");
  }

  hitHeresy(player, heresy) {
    if (this.store.aku) {
      heresy.disableBody(true, true);
    } else if (this.store.imortal) {
    } else if (this.store.lifeActive) {
      this.store.lifeActive--;

      this.store.imortal = true;

      this.time.delayedCall(
        2000,
        () => {
          this.store.imortal = false;
        },
        [],
        this
      );

      this.store.helmetCounterText.setText(this.store.lifeActive);
      if (this.store.lifeActive === 0) {
        player.changeSkin(this, storage.getSelectedSkin());
      }
    } else {
      this.doDeath(player);
    }
  }

  setRecordScore(val) {
    this.store.leaderBoard.setUser(
      storage.getUsernameId(),
      storage.getUsername()
    );
    this.store.leaderBoard
      .post(val)
      .then(function (record) {})
      .catch(function (error) {});

    storage.setRecordStore(val);
  }
}
