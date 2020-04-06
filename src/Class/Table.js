import ScrollablePanel from "phaser3-rex-plugins/templates/ui/scrollablepanel/ScrollablePanel.js";

const COLOR_PRIMARY = 0x4e342e;
const COLOR_LIGHT = 0x7b5e57;
const COLOR_DARK = 0x260e04;
const COLOR_WHITE = 0xffffff;

const createGrid = (scene, rank) => {
  var sizer = scene.rexUI.add.gridSizer({
    column: 2,
    row: rank.length,
    columnProportions: 1
  });

  rank.forEach((player, index) => {
    sizer.add(
      createItem(scene, 0, index, player.userName), // child
      0, // columnIndex
      index, // rowIndex
      "center", // align
      0, // paddingConfig
      true // expand
    );
    sizer.add(
      createItem(scene, 1, index, player.score), // child
      1, // columnIndex
      index, // rowIndex
      "center", // align
      0, // paddingConfig
      true // expand
    );
  });

  return sizer;
};

const createItem = (scene, colIdx, rowIdx, text) => {
  var item = scene.rexUI.add
    .label({
      background: scene.rexUI.add
        .roundRectangle(0, 0, 0, 0, 0, undefined)
        .setStrokeStyle(2, COLOR_DARK, 1),
      text: scene.add.text(0, 0, text, {
        fontSize: 18,
        fill: "#000"
      }),
      space: {
        left: 10,
        right: 10,
        top: 10,
        bottom: 10,
        icon: 10
      }
    })
    .setDepth(3);
  var press = scene.rexUI.add.press(item).on("pressstart", function() {
    console.log(`press ${text}`);
  });
  return item;
};

export default class Table extends ScrollablePanel {
  constructor(scene, x, y, width, height, rank) {
    let config = {
      x: x,
      y: y,
      width: width,
      height: height,
      scrollMode: 0,
      background: scene.rexUI.add.roundRectangle(0, 0, 2, 2, 10, COLOR_WHITE),
      panel: {
        child: createGrid(scene, rank),
        mask: {
          mask: true,
          padding: 1
        }
      },
      slider: {
        track: scene.rexUI.add.roundRectangle(0, 0, 20, 10, 10, COLOR_LIGHT),
        thumb: scene.rexUI.add.roundRectangle(0, 0, 0, 0, 13, COLOR_DARK)
      },
      space: {
        left: 10,
        right: 10,
        top: 10,
        bottom: 10,
        panel: 10,
        header: 10,
        footer: 10
      }
    };

    super(scene, config);

    // this.create(scene, x, y, width, height, rank);
  }

  create(scene, x, y, width, height, rank) {
    var scrollablePanel = this.rexUI.add
      .scrollablePanel({
        x: x,
        y: y,
        width: width,
        height: height,
        scrollMode: 0,
        background: this.rexUI.add.roundRectangle(0, 0, 2, 2, 10, COLOR_WHITE),
        panel: {
          child: createGrid(this, rank),
          mask: {
            mask: true,
            padding: 1
          }
        },
        slider: {
          track: this.rexUI.add.roundRectangle(0, 0, 20, 10, 10, COLOR_LIGHT),
          thumb: this.rexUI.add.roundRectangle(0, 0, 0, 0, 13, COLOR_DARK)
        },
        space: {
          left: 10,
          right: 10,
          top: 10,
          bottom: 10,
          panel: 10,
          header: 10,
          footer: 10
        }
      })
      .layout();
  }
}
