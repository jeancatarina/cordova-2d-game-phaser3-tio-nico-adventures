import loadingImage from "../assets/sprites/loading.png";

export class Boot extends Phaser.Scene {
  constructor() {
    super("Boot");
    this.store = {};
  }

  init() {}

  preload() {
    this.load.image("loadingImage", loadingImage);
  }

  create() {
    this.scene.start("Preload");
  }
}
