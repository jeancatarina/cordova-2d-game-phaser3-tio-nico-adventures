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
      frames: [{ key: "dude", frame: 6 }],
      frameRate: 20,
    });
    scene.anims.create({
      key: "right",
      frames: scene.anims.generateFrameNumbers(playerImage, {
        start: 7,
        end: 12,
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

    left.addFrame(
      scene.anims.generateFrameNumbers(playerImage, {
        start: 0,
        end: 5,
      })
    );
    left.removeFrameAt(0);
    left.removeFrameAt(0);
    left.removeFrameAt(0);
    left.removeFrameAt(0);
    left.removeFrameAt(0);
    left.removeFrameAt(0);

    turn.addFrame([{ key: playerImage, frame: 6 }]);
    turn.removeFrameAt(0);

    right.addFrame(
      scene.anims.generateFrameNumbers(playerImage, {
        start: 7,
        end: 12,
      })
    );
    right.removeFrameAt(0);
    right.removeFrameAt(0);
    right.removeFrameAt(0);
    right.removeFrameAt(0);
    right.removeFrameAt(0);
    right.removeFrameAt(0);
  }

  setCustomGravity(gravity = 500) {
    this.setGravityY(gravity);
  }
}
