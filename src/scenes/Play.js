let platforms,
	player,
	cursors,
	stars,
	bombs,
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
		gameOver = false;
		score = 0;
	}

	create() {
		let jumpButton, rightButton, leftButton;

		this.input.addPointer(2);

		this.resetStates();

		//  A simple background for our game
		this.add.image(400, 300, "sky");

		//  The platforms group contains the ground and the 2 ledges we can jump on
		platforms = this.physics.add.staticGroup();
		jesus = this.physics.add.staticGroup();

		//  Here we create the ground.
		//  Scale it to fit the width of the game (the original sprite is 400x32 in size)
		platforms
			.create(400, 568, "ground")
			.setScale(2)
			.refreshBody();

		//  Now let's create some ledges
		platforms
			.create(500, 370, "ground")
			.setScale(0.5)
			.refreshBody();
		platforms.create(50, 250, "ground");
		platforms.create(750, 220, "ground");
		//left low
		jesus.create(300, 480, "jesus");
		// left high
		jesus.create(200, 180, "jesus");
		// right high
		jesus.create(650, 150, "jesus");
		// right low
		jesus.create(650, 480, "jesus");

		// The player and its settings
		player = this.physics.add.sprite(100, 450, "dude");

		player.setGravityY(500);

		//  Player physics properties. Give the little guy a slight bounce.
		player.setBounce(0.2);
		player.setCollideWorldBounds(true);

		//  Our player animations, turning, walking left and walking right.
		this.anims.create({
			key: "left",
			frames: this.anims.generateFrameNumbers("dude", {
				start: 0,
				end: 5
			}),
			frameRate: 10,
			repeat: -1
		});

		this.anims.create({
			key: "turn",
			frames: [{ key: "dude", frame: 6 }],
			frameRate: 20
		});

		this.anims.create({
			key: "right",
			frames: this.anims.generateFrameNumbers("dude", {
				start: 7,
				end: 12
			}),
			frameRate: 10,
			repeat: -1
		});

		jumpButton, rightButton, leftButton = this.add.sprite(100, 500, 'buttonHorizontal', null, this, 0, 1, 0, 1);
		jumpButton, rightButton, leftButton.setInteractive();
		jumpButton, rightButton, leftButton.on('pointerover', this.doJump);

		rightButton = this.add.sprite(740, 500, 'buttonHorizontal', null, this, 0, 1, 0, 1);
		rightButton.setInteractive();
		rightButton.on('pointerover', this.goRight);
		rightButton.on('pointerout', this.doStop);

		leftButton = this.add.sprite(600, 500, 'buttonHorizontal', null, this, 0, 1, 0, 1);
		leftButton.setInteractive();
		leftButton.on('pointerover', this.goLeft);
		leftButton.on('pointerout', this.doStop);
		
		//  Input Events
		cursors = this.input.keyboard.createCursorKeys();

		//  Some stars to collect, 12 in total, evenly spaced 70 pixels apart along the x axis
		stars = this.physics.add.group({
			key: "star",
			repeat: 11,
			setXY: { x: 12, y: 0, stepX: 70 }
		});

		stars.children.iterate(function(child) {
			//  Give each star a slightly different bounce
			child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
		});

		bombs = this.physics.add.group();

		//  The score
		scoreText = this.add.text(16, 16, "score: 0", {
			fontSize: "32px",
			fill: "#000"
		});
		if (this.getRecordScore()) {
			recordScoreText = this.add.text(
				16,
				42,
				"Record score: " + this.getRecordScore(),
				{
					fontSize: "32px",
					fill: "#000"
				}
			);
		}

		//  Collide the player and the stars with the platforms
		this.physics.add.collider(player, platforms);
		this.physics.add.collider(stars, jesus);
		this.physics.add.collider(bombs, jesus);
		this.physics.add.collider(stars, platforms);
		this.physics.add.collider(bombs, platforms);

		//  Checks to see if the player overlaps with any of the stars, if he does call the collectStar function
		this.physics.add.overlap(player, stars, this.collectStar, null, this);

		this.physics.add.collider(player, bombs, this.hitBomb, null, this);
	}

	update() {
		if (gameOver) {
			return;
		}

		if (cursors.left.isDown) {
			this.goLeft();
		} else if (cursors.right.isDown) {
			this.goRight();
		} else {
			// this.doStop();
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

	collectStar(player, star) {
		let heresy = ["bomb", "center", "law", "perfect"],
			randomNumber = Math.floor(Math.random() * heresy.length);

		star.disableBody(true, true);

		//  Add and update the score
		score += 10;
		scoreText.setText("Score: " + score);

		if (stars.countActive(true) === 0) {
			//  A new batch of stars to collect
			stars.children.iterate(function(child) {
				child.enableBody(true, child.x, 0, true, true);
			});

			var x =
				player.x < 400
					? Phaser.Math.Between(400, 800)
					: Phaser.Math.Between(0, 400);

			var bomb = bombs.create(x, 16, heresy[randomNumber]);
			bomb.setBounce(1);
			bomb.setCollideWorldBounds(true);
			bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
			bomb.allowGravity = false;
		}
	}

	hitBomb(player, bomb) {
		deaths++;
		if (deaths === 4) {
			//	only works on mobile
			if (typeof admob !== "undefined") {
				admob.requestInterstitialAd();
			}
			deaths = 0;
		};

		this.physics.pause();

		player.setTint(0xff0000);

		player.anims.play("turn");

		gameOver = true;

		if (this.getRecordScore() <= score) {
			this.setRecordScore(score);
		}

		this.scene.restart();
	}

	getRecordScore() {
		return window.localStorage.getItem("recordScore");
	}

	setRecordScore(val) {
		window.localStorage.setItem("recordScore", val);
	}
}
