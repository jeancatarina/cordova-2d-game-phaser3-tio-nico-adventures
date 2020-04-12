import * as storage from "../utils/storage";

export class ChangeSkin extends Phaser.Scene {
  constructor() {
    super("ChangeSkin");
    this.store = {};
  }

  init(data) {
    this.store = {
    };
  }

  preload() {}

  create() {
	this.createBg();
	this.createOkButton();
	this.createSkins();
  }

  createSkins() {
	const selectedSkin = storage.getSelectedSkin();

	this.store.classicSkinSelected = this.add.sprite(300, 100, "classicSkinRight", 0).setScale(2.2).setTintFill(selectedSkin === "classicSkin" || !selectedSkin ? 0x00FF00 : 0xffffff);
	this.store.classicSkin = this.add.sprite(300, 100, "classicSkinRight", 0).setScale(2);

	this.store.bombadoSkinSelected = this.add.sprite(300, 300, "bombadoSkinRight", 0).setScale(2.2).setTintFill(selectedSkin === "bombadoSkin" ? 0x00FF00 : 0xffffff);
	this.store.bombadoSkin = this.add.sprite(300, 300, "bombadoSkinRight", 0).setScale(2);

	this.store.classicSkin.setInteractive();
	this.store.classicSkin.on("pointerdown", this.setSelectedSkin.bind(this, "classicSkin"));
	
	this.store.bombadoSkin.setInteractive();
    this.store.bombadoSkin.on("pointerdown", this.setSelectedSkin.bind(this, "bombadoSkin"));
  }

  setSelectedSkin(skin) {
	storage.setSelectedSkin(skin);
	this.createSkins();
  }

  createBg() {
    let bg = this.add.image(0, 0, "sky");

    bg.displayHeight = this.sys.game.config.height;
    bg.scaleX = bg.scaleY;

    bg.y = this.game.config.height / 2;
    bg.x = this.game.config.width / 2;

    bg.x = bg.displayWidth * 0.4;
  }

  createOkButton() {
    this.okButton = this.add.image(100, 350, "yesImage");

    this.okButton.setScale(0.4);
    this.okButton.setInteractive();
    this.okButton.on("pointerdown", this.goToMenuScene.bind(this));
  }

  goToMenuScene() {
	this.scene.start("Menu");
  }
}
