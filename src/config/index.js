import scenes from './scenes'

export default {
	type: Phaser.AUTO,
	width: 800,
	height: 600,
	scale: {
		mode: Phaser.Scale.FIT,
		autoCenter: Phaser.Scale.CENTER_BOTH
	},
	parent: "phaser-example",
	physics: {
		default: "arcade",
		arcade: {
			gravity: { y: 300 },
			debug: false
		}
	},
	scene: scenes
};