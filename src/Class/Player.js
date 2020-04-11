export default class Player extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x = 100, y = 450, playerImage = "dude") {
    super(scene, x, y, playerImage);

    scene.physics.world.enableBody(this, 0);

    this.setTexture(playerImage);
    this.setPosition(x, y);
    this.create(scene, playerImage);
  }

  create(scene, playerImage) {
    this.setCustomGravity();
    //  Player physics properties. Give the little guy a slight bounce.
    this.setBounce(0.2);
    this.setCollideWorldBounds(true);

    //  Our player animations, turning, walking left and walking right.
    scene.anims.create({
      key: "left",
      frames: scene.anims.generateFrameNumbers(playerImage, {
        start: 0,
        end: 5,
      }),
      frameRate: 10,
      repeat: -1,
    });
    scene.anims.create({
      key: "turn",
      frames: scene.anims.generateFrameNumbers(playerImage, {
        start: 6,
        end: 9,
      }),
	  frameRate: 10,
	  repeat: -1,
    });
    scene.anims.create({
      key: "right",
      frames: scene.anims.generateFrameNumbers(playerImage, {
        start: 10,
        end: 15,
      }),
      frameRate: 10,
      repeat: -1,
    });
  }

  changeSkin(scene, playerImage) {
    let left, turn, right;

    left = scene.anims.get("left");
    turn = scene.anims.get("turn");
    right = scene.anims.get("right");

	left.frames = [];
    left.addFrame(
      scene.anims.generateFrameNumbers(playerImage, {
        start: 0,
        end: 5,
      })
    );

	turn.frames = [];
    turn.addFrame(scene.anims.generateFrameNumbers(playerImage, {
        start: 6,
        end: 9,
    }));

	right.frames = [];
    right.addFrame(
      scene.anims.generateFrameNumbers(playerImage, {
        start: 10,
        end: 15,
      })
    );
  }

  setCustomGravity(gravity = 500) {
    this.setGravityY(gravity);
  }
}
