export class Donate extends Phaser.Scene {
  constructor() {
    super("Donate");
    this.store = {};
  }

  init(data) {
    this.store = {};
  }

  preload() {}

  create() {
    this.createBg();
    this.createOkButton();
    this.createDonate();
  }

  createDonate() {
    this.picpayimage = this.add.image(570, 400, "picpayImage");
    this.picpayimage.setScale(0.3);

    this.add.text(
      230,
      50,
      "Doe qualquer valor, pode ser 1 real, que ja vai me motivar a continuar",
      {
        fontSize: "12px",
        fill: "#fffff",
      }
    );
    this.add.text(230, 80, "melhorando o jogo e criando novos para você.", {
      fontSize: "12px",
      fill: "#fffff",
    });
    this.add.text(230, 100, "Doadores podem sujerir criação de skins.", {
      fontSize: "12px",
      fill: "#fffff",
    });
    this.add.text(180, 200, "Top doadores:", {
      fontSize: "12px",
      fill: "#fffff",
    });
    this.add.text(180, 250, "- 2 reais // Henrique ", {
      fontSize: "12px",
      fill: "#fffff",
    });
    this.add.text(180, 270, "- 1 real // calvinath pereira ", {
      fontSize: "12px",
      fill: "#fffff",
    });
    this.add.text(180, 290, "- 1 real // jehh ", {
      fontSize: "12px",
      fill: "#fffff",
    });
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
