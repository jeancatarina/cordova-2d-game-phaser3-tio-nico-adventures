import bombImage from "../assets/images/quemMaisLeao.png";
import centerImage from "../assets/images/centro.png";
import lawImage from "../assets/images/lei.png";
import perfectImage from "../assets/images/perfeitos.png";
import dudeImage from "../assets/images/nicoBigSprite.png";
import platformImage from "../assets/images/desertPlatform.png";
import skyImage from "../assets/images/desert.png";
import starImage from "../assets/images/bible.png";
import jesusImage from "../assets/images/jesus.png";

export class Preload extends Phaser.Scene {
	constructor() {
		super("Preload");
	}

	preload() {
		this.load.image("sky", skyImage);
		this.load.image("ground", platformImage);
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
	}

	create() {
		this.scene.start("Play");
	}
}
