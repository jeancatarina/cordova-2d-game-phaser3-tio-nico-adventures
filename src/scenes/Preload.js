import bombImage from "../assets/images/quemMaisLeao.png";
import centerImage from "../assets/images/centro.png";
import lawImage from "../assets/images/lei.png";
import perfectImage from "../assets/images/perfeitos.png";
import dudeImage from "../assets/images/nicoBigSprite.png";
import platformImage from "../assets/images/ground.png";
import ground2Image from "../assets/images/ground2.png";
import skyImage from "../assets/images/bg2.png";
import starImage from "../assets/images/bible.png";
import jesusImage from "../assets/images/jesus.png";
import buttonHorizontalImage from "../assets/images/button-horizontal.png";

export class Preload extends Phaser.Scene {
	constructor() {
		super("Preload");
	}

	preload() {
		this.load.image("sky", skyImage);
		this.load.image("ground", platformImage);
		this.load.image("ground2", ground2Image);
		this.load.image("jesus", jesusImage);
		this.load.image("star", starImage);
		this.load.image("bomb", bombImage);
		this.load.image("center", centerImage);
		this.load.image("law", lawImage);
		this.load.image("perfect", perfectImage);
		this.load.spritesheet("dude", dudeImage, {
			frameWidth: 50,
			frameHeight: 70
		});
		this.load.spritesheet('buttonHorizontal', buttonHorizontalImage, {
			frameWidth: 96,
			frameHeight: 64
		});
	}

	create() {
		this.scene.start("Play");
	}
}
