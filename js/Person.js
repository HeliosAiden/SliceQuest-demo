class Person extends GameObject {
  constructor(config) {
    super(config);
    this.movementProgressRemaining = 0;

    this.isPlayerControlled = config.isPlayerControlled || false;

    this.directionUpdate = {
      up: ["y", -1],
      down: ["y", 1],
      left: ["x", -1],
      right: ["x", 1],
    };
  }

  update(state) {
    if (this.movementProgressRemaining > 0) {
      this.updatePosition();
    } else {
      // More cases for starting to walk will come here
      //
      //

      // Cause: keyboard ready & and arrow key pressed
      if (this.isPlayerControlled && state.arrow) {
        this.startBehavior(state, {
          type: "walk",
          direction: state.arrow,
        });
      }
      this.updateSprite(state);
    }
  }

  startBehavior(state, behavior) {
    // Set character direction to whatever behavior has
    this.direction = behavior.direction;

    // Stop here if space is not free
    if (behavior.type === "walk") {
      if (state.map.isSpaceTaken(this.x, this.y, this.direction)) {
        return;
      }
    }

    // Ready to walk
    state.map.moveWall(this.x, this.y, this.direction);
    this.movementProgressRemaining = 16;
  }

  updatePosition() {
    const [property, change] = this.directionUpdate[this.direction];
    this[property] += change;
    this.movementProgressRemaining -= 1;

    if (this.movementProgressRemaining == 0) {
      // We finished the walk
      utils.emitEvent("PersonWalkingComplete", {
        whoId: this.id,
      });
    }
  }

  updateSprite() {
    if (this.movementProgressRemaining > 0) {
      this.sprite.setAnimation("walk-" + this.direction);
      return;
    }
    this.sprite.setAnimation("idle-" + this.direction);
  }
}
