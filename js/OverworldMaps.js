class OverworldMaps {
  constructor(config) {
    this.overworld = null;
    this.gameObjects = config.gameObjects;
    this.cutsceneSpaces = config.cutsceneSpaces || {};
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

  async startCutscene(events) {
    this.isCutscenePlaying = true;
    // Start a loop of async events then await each one
    for (let i = 0; i < events.length; i++) {
      const eventHandler = new OverworldEvent({
        event: events[i],
        map: this,
      });
      await eventHandler.init();
    }

    this.isCutscenePlaying = false;

    // Reset NPC to do idle behavior
    Object.values(this.gameObjects).forEach((object) =>
      object.doBehaviorEvent(this)
    );
  }

  checkForActionCutscene() {
    const hero = this.gameObjects["hero"];
    const nextCoords = utils.nextPosition(hero.x, hero.y, hero.direction);
    const match = Object.values(this.gameObjects).find((object) => {
      return `${object.x},${object.y}` === `${nextCoords.x},${nextCoords.y}`;
    });
    if (!this.isCutscenePlaying && match && match.talking.length) {
      this.startCutscene(match.talking[0].events);
    }
  }

  checkForFootStepCutscene() {
    const hero = this.gameObjects["hero"];
    const match = this.cutsceneSpaces[`${hero.x},${hero.y}`];
    if (!this.isCutscenePlaying && match) {
      this.startCutscene(match[0].events);
    }
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

window.OverworldMaps = {
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
          { type: "stand", direction: "left", time: 800 },
          { type: "stand", direction: "up", time: 800 },
          { type: "stand", direction: "right", time: 800 },
          { type: "stand", direction: "down", time: 800 },
        ],
        talking: [
          {
            events: [
              {
                type: "textMessage",
                text: "WHY HELLO THERE",
                faceHero: "npc1",
              },
              {
                type: "textMessage",
                text: "I'M TALKING ABOUT SOMETHING ELSE!",
              },
              { who: "hero", type: "walk", direction: "up" },
            ],
          },
          {
            events: [
              {
                type: "textMessage",
                text: "I'M TALKING ABOUT SOMETHING ELSE!",
              },
            ],
          },
        ],
      }),
      npc2: new Person({
        x: utils.widthGrid(8),
        y: utils.widthGrid(5),
        src: "/images/characters/people/npc2.png",
        behaviorLoop: [
          // { type: "walk", direction: "left" },
          // { type: "stand", direction: "down", time: 1000 },
          // { type: "walk", direction: "down" },
          // { type: "walk", direction: "up" },
          // { type: "walk", direction: "right" },
        ],
      }),
    },
    walls: {
      // "16,16": true
      [utils.asGridCoord(1, 3)]: true,
      [utils.asGridCoord(2, 3)]: true,
      [utils.asGridCoord(3, 3)]: true,
      [utils.asGridCoord(4, 3)]: true,
      [utils.asGridCoord(5, 3)]: true,
      [utils.asGridCoord(6, 4)]: true,
      [utils.asGridCoord(7, 3)]: true,
      [utils.asGridCoord(8, 4)]: true,
      [utils.asGridCoord(9, 3)]: true,
      [utils.asGridCoord(10, 3)]: true,
      [utils.asGridCoord(11, 4)]: true,
      [utils.asGridCoord(11, 5)]: true,
      [utils.asGridCoord(11, 6)]: true,
      [utils.asGridCoord(11, 7)]: true,
      [utils.asGridCoord(11, 8)]: true,
      [utils.asGridCoord(11, 9)]: true,
      [utils.asGridCoord(10, 10)]: true,
      [utils.asGridCoord(9, 10)]: true,
      [utils.asGridCoord(8, 10)]: true,
      [utils.asGridCoord(7, 10)]: true,
      [utils.asGridCoord(6, 10)]: true,
      [utils.asGridCoord(5, 11)]: true,
      [utils.asGridCoord(4, 10)]: true,
      [utils.asGridCoord(3, 10)]: true,
      [utils.asGridCoord(2, 10)]: true,
      [utils.asGridCoord(1, 10)]: true,
      [utils.asGridCoord(0, 9)]: true,
      [utils.asGridCoord(0, 8)]: true,
      [utils.asGridCoord(0, 7)]: true,
      [utils.asGridCoord(0, 6)]: true,
      [utils.asGridCoord(0, 5)]: true,
      [utils.asGridCoord(0, 4)]: true,
      [utils.asGridCoord(7, 6)]: true,
      [utils.asGridCoord(8, 6)]: true,
      [utils.asGridCoord(7, 7)]: true,
      [utils.asGridCoord(8, 7)]: true,
    },
    cutsceneSpaces: {
      [utils.asGridCoord(7, 4)]: [
        {
          events: [
            {
              who: "npc2",
              type: "walk",
              direction: "left",
            },
            {
              who: "npc2",
              type: "stand",
              direction: "up",
              time: 500,
            },
            { type: "textMessage", text: "You can't be in there!" },
            {
              who: "npc2",
              type: "walk",
              direction: "right",
            },
            {
              who: "hero",
              type: "walk",
              direction: "down",
            },
            {
              who: "hero",
              type: "walk",
              direction: "left",
            },
          ],
        },
      ],
      [utils.asGridCoord(5, 10)]: [
        { events: [{ type: "changeMap", map: "Kitchen" }] },
      ],
    },
  },
  Kitchen: {
    lowerSrc: "/images/maps/KitchenLower.png",
    upperSrc: "/images/maps/KitchenUpper.png",
    gameObjects: {
      hero: new Person({
        isPlayerControlled: true,
        x: utils.widthGrid(5),
        y: utils.widthGrid(5),
      }),
      npc1: new Person({
        x: utils.widthGrid(4),
        y: utils.widthGrid(5),
        src: "/images/characters/people/npc2.png",
        talking: [
          {
            events: [
              { type: "textMessage", text: "You made it!", faceHero: "npc1" },
            ],
          },
        ],
      }),
      // npc2: new Person({
      //   x: utils.widthGrid(6),
      //   y: utils.widthGrid(8),
      //   src: "/images/characters/people/npc3.png",
      // }),
    },
  },
  Street: {},
};
