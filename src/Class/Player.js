const getSkinData = (skin) => {
	let skinLeft, skinIdle, skinRight;

	if (!skin || skin === "classicSkin") {
		skinLeft = { image: "classic" + "SkinLeft", frameInit: 0, frameEnd: 15 };
		skinIdle = { image: "classic" + "SkinIdle", frameInit: 0, frameEnd: 1 };
		skinRight = { image: "classic" + "SkinRight", frameInit: 0, frameEnd: 15 };
	}

	if (skin === "bombadoSkin") {
		skinLeft = { image: "bombado" + "SkinLeft", frameInit: 0, frameEnd: 15 };
		skinIdle = { image: "bombado" + "SkinIdle", frameInit: 0, frameEnd: 1 };
		skinRight = { image: "bombado" + "SkinRight", frameInit: 0, frameEnd: 15 };
	}

	if (skin === "helmetSkin") {
		skinLeft = { image: "helmet" + "SkinLeft", frameInit: 0, frameEnd: 5 };
		skinIdle = { image: "helmet" + "SkinIdle", frameInit: 6, frameEnd: 9 };
		skinRight = { image: "helmet" + "SkinRight", frameInit: 10, frameEnd: 15 };
	}

	return {
		skinLeft,
		skinIdle,
		skinRight
	};
};

export default class Player extends Phaser.Physics.Arcade.Sprite {
	constructor(scene, x = 100, y = 450, skinName) {
		super(scene, x, y, skinName + "Idle");

		scene.physics.world.enableBody(this, 0);

		this.setTexture(skinName + "Idle");
		this.setPosition(x, y);
		this.create(scene, skinName);
	}

	create(scene, skinName) {
		this.setCustomGravity();
		//  Player physics properties. Give the little guy a slight bounce.
		this.setBounce(0.2);
		this.setCollideWorldBounds(true);

		this.changeSkin(scene, skinName);
	}

	changeSkin(scene, skinName) {
		let left, turn, right, skinLeft, skinIdle, skinRight;

		({ skinLeft, skinIdle, skinRight } = getSkinData(skinName));

		scene.anims.anims.delete("left");
		scene.anims.anims.delete("turn");
		scene.anims.anims.delete("right");

		scene.anims.create({
			key: "left",
			frames: scene.anims.generateFrameNumbers(skinLeft && skinLeft.image, {
				start: skinLeft && skinLeft.frameInit,
				end: skinLeft && skinLeft.frameEnd
			}),
			frameRate: 10,
			repeat: -1
		});
		scene.anims.create({
			key: "turn",
			frames: scene.anims.generateFrameNumbers(skinIdle && skinIdle.image, {
				start: skinIdle && skinIdle.frameInit,
				end: skinIdle && skinIdle.frameEnd
			}),
			frameRate: 10,
			repeat: -1
		});
		scene.anims.create({
			key: "right",
			frames: scene.anims.generateFrameNumbers(skinRight && skinRight.image, {
				start: skinRight && skinRight.frameInit,
				end: skinRight && skinRight.frameEnd
			}),
			frameRate: 10,
			repeat: -1
		});
	}

	setCustomGravity(gravity = 500) {
		this.setGravityY(gravity);
	}
}
