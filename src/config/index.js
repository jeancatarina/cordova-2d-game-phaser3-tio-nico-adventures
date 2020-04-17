import scenes from "./scenes";
import FirebasePlugin from "phaser3-rex-plugins/plugins/firebase-plugin.js";
import UIPlugin from "phaser3-rex-plugins/templates/ui/ui-plugin.js";

export default {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  scale: {
    mode: Phaser.Scale.EXACT_FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  parent: "phaser-example",
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 300 },
      debug: false,
    },
  },
  scene: scenes,
  activePointers: 4,
  plugins: {
    scene: [
      {
        key: "rexUI",
        plugin: UIPlugin,
        mapping: "rexUI",
      },
    ],
    global: [
      {
        key: "rexFire",
        plugin: FirebasePlugin,
        start: true,
      },
    ],
  },
};
