import * as storage from "../utils/storage";

export class ChangeSkin extends Phaser.Scene {
  constructor() {
    super("ChangeSkin");
    this.store = {};
  }

  init(data) {
    this.store = {};
  }

  preload() {}

  create() {
    this.createBg();
    this.createOkButton();
    this.createSkins();
  }

  createSkins() {
    const selectedSkin = storage.getSelectedSkin();

    this.createClassicSkin(selectedSkin);

    this.createBombadoSkin(selectedSkin);

    this.createMarujoSkin(selectedSkin);
  }

  createClassicSkin(selectedSkin) {
    this.add.text(240, 180, "Tio Nico Raiz", {
      fontSize: "12px",
      fill: "#000",
    });

    this.store.classicSkinSelected = this.add
      .sprite(300, 100, "classicSkinRight", 0)
      .setScale(2.2)
      .setTintFill(
        selectedSkin === "classicSkin" || !selectedSkin ? 0x00ff00 : 0xffffff
      );
    this.store.classicSkin = this.add
      .sprite(300, 100, "classicSkinRight", 0)
      .setScale(2);

    this.store.classicSkin.setInteractive();
    this.store.classicSkin.on(
      "pointerdown",
      this.setSelectedSkin.bind(this, "classicSkin")
    );
  }

  createBombadoSkin(selectedSkin) {
    this.add.text(230, 380, "Tio Nico Bombado", {
      fontSize: "12px",
      fill: "#fff",
    });
    this.add.text(230, 390, "Custo: 1000 de score", {
      fontSize: "12px",
      fill: "#fff",
    });
    this.store.bombadoSkinSelected = this.add
      .sprite(300, 300, "bombadoSkinRight", 0)
      .setScale(2.2)
      .setTintFill(selectedSkin === "bombadoSkin" ? 0x00ff00 : 0xffffff);
    this.store.bombadoSkin = this.add
      .sprite(300, 300, "bombadoSkinRight", 0)
      .setScale(2);

    this.store.bombadoSkin.setInteractive();
    this.store.bombadoSkin.on(
      "pointerdown",
      this.setSelectedSkin.bind(this, "bombadoSkin")
    );
  }

  createMarujoSkin(selectedSkin) {
    this.add.text(430, 380, "Tio Nico Marujo", {
      fontSize: "12px",
      fill: "#fff",
    });
    this.add.text(430, 390, "Custo: 1500 de score", {
      fontSize: "12px",
      fill: "#fff",
    });
    this.store.marujoSkinSelected = this.add
      .sprite(500, 300, "marujoSkinRight", 0)
      .setScale(2.2)
      .setTintFill(selectedSkin === "marujoSkin" ? 0x00ff00 : 0xffffff);
    this.store.marujoSkin = this.add
      .sprite(500, 300, "marujoSkinRight", 0)
      .setScale(2);

    this.store.marujoSkin.setInteractive();
    this.store.marujoSkin.on(
      "pointerdown",
      this.setSelectedSkin.bind(this, "marujoSkin")
    );
  }

  setSelectedSkin(skin) {
    const record = storage.getRecordScore();

    if (skin === "bombadoSkin" && record > 999) {
      storage.setSelectedSkin(skin);
    }

    if (skin === "marujoSkin" && record > 1499) {
      storage.setSelectedSkin(skin);
    }

    if (skin === "classicSkin") {
      storage.setSelectedSkin(skin);
    }
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
    this.okButton.on("pointerup", this.goToMenuScene.bind(this));
  }

  goToMenuScene() {
    this.scene.start("Menu");
  }
}
