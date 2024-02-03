class OverworldMap {
  constructor(config) {
    this.gameObjects = config.gameObjects;

    this.walls = config.walls || {};
    this.lowerImage = new Image();
    this.lowerImage.src = config.lowerSrc;

    this.upperImage = new Image();
    this.upperImage.src = config.upperSrc;

    this.isCutscenePlaying = false;
  }

  drawLowerImage(ctx, cameraPerson) {
    ctx.drawImage(
      this.lowerImage,
      utils.widthGrid(10.5) - cameraPerson.x,
      utils.widthGrid(6) - cameraPerson.y
    );
  }
  drawUpperImage(ctx, cameraPerson) {
    ctx.drawImage(
      this.upperImage,
      utils.widthGrid(10.5) - cameraPerson.x,
      utils.widthGrid(6) - cameraPerson.y
    );
  }

  isSpaceTaken(currentX, currentY, direction) {
    const { x, y } = utils.nextPosition(currentX, currentY, direction);
    return this.walls[`${x},${y}`] || false;
  }

  mountObjects() {
    Object.keys(this.gameObjects).forEach((key) => {
      // TODO: determine if this object should actually mounted

      let object = this.gameObjects[key];
      object.id = key;

      object.mount(this);
    });
  }

  addWall(x, y) {
    this.walls[`${x},${y}`] = true;
  }
  removeWall(x, y) {
    delete this.walls[`${x},${y}`];
  }
  moveWall(wasX, wasY, direction) {
    this.removeWall(wasX, wasY);
    const { x, y } = utils.nextPosition(wasX, wasY, direction);
    this.addWall(x, y);
  }
}

window.OverworldMap = {
  DemoRoom: {
    lowerSrc: "/images/maps/DemoLower.png",
    upperSrc: "/images/maps/DemoUpper.png",
    gameObjects: {
      hero: new Person({
        isPlayerControlled: true,
        x: utils.widthGrid(3),
        y: utils.widthGrid(5),
      }),
      npc1: new Person({
        x: utils.widthGrid(7),
        y: utils.widthGrid(9),
        src: "/images/characters/people/npc1.png",
        behaviorLoop: [
          { type: "walk", direction: "left" },
          { type: "walk", direction: "down" },
          { type: "walk", direction: "right" },
          { type: "walk", direction: "down" },
        ],
      }),
      npc2: new Person({
        x: utils.widthGrid(5),
        y: utils.widthGrid(4),
        src: "/images/characters/people/npc2.png",
        behaviorLoop: [
          { type: "walk", direction: "left" },
          { type: "stand", direction: "up", time: 2000 },
          { type: "walk", direction: "up" },
          { type: "walk", direction: "down" },
          { type: "walk", direction: "right" },
        ],
      }),
    },
    walls: {
      // "16,16": true
      [utils.asGridCoord(7, 6)]: true,
      [utils.asGridCoord(8, 6)]: true,
      [utils.asGridCoord(7, 7)]: true,
      [utils.asGridCoord(8, 7)]: true,
    },
  },
  Kitchen: {
    lowerSrc: "/images/maps/KitchenLower.png",
    upperSrc: "/images/maps/KitchenUpper.png",
    gameObjects: {
      hero: new Person({
        isPlayerControlled: true,
        x: utils.widthGrid(3),
        y: utils.widthGrid(7),
      }),
      npc1: new Person({
        x: utils.widthGrid(4),
        y: utils.widthGrid(5),
        src: "/images/characters/people/npc2.png",
      }),
      npc2: new Person({
        x: utils.widthGrid(6),
        y: utils.widthGrid(8),
        src: "/images/characters/people/npc3.png",
      }),
    },
  },
  Street: {},
};
