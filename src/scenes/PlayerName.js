import * as storage from "../utils/storage";

export class PlayerName extends Phaser.Scene {
  constructor() {
    super("PlayerName");
    this.store = {};
  }

  init(data) {
    this.store = {
      rexFire: data.rexFire
    };
  }

  preload() {}

  create() {
    this.createBg();

    this.createForm();
  }

  createBg() {
    let bg = this.add.image(0, 0, "sky");

    bg.displayHeight = this.sys.game.config.height;
    bg.scaleX = bg.scaleY;

    bg.y = this.game.config.height / 2;
    bg.x = this.game.config.width / 2;

    bg.x = bg.displayWidth * 0.4;
  }

  createForm() {
    let me = this,
      width,
      height,
      nameText,
      username = document.getElementById("username");

    width = this.cameras.main.width;
    height = this.cameras.main.height;

    nameText = this.make.text({
      x: width / 2,
      y: height / 2 - 20,
      text: "Name:",
      style: {
        font: "20px monospace",
        fill: "#fffff"
      }
    });
    nameText.setOrigin(0.5, 0.5);

    this.createOkButton();
    username.style.display = "block";
    username.value = storage.getUsername();
  }

  createOkButton() {
    this.okButton = this.add.image(700, 500, "yesImage");

    this.okButton.setScale(0.4);
    this.okButton.setInteractive();
    this.okButton.on("pointerdown", this.onSubmit.bind(this));
  }

  onSubmit() {
    if (storage.getUsername() !== username.value) {
      storage.setUsername(username.value);
    }
    username.style.display = "none";
    this.scene.start("Menu", { rexFire: this.store.rexFire });
  }
}
