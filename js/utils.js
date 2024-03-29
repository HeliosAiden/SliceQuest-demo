const utils = {
  widthGrid(n) {
    return n * 16;
  },
  asGridCoord(x, y) {
    return `${x * 16},${y * 16}`;
  },
  nextPosition(initialX, initialY, direction) {
    let x = initialX;
    let y = initialY;
    const size = 16;
    if (direction == "left") {
      x -= size;
    }
    if (direction == "right") {
      x += size;
    }
    if (direction == "up") {
      y -= size;
    }
    if (direction == "down") {
      y += size;
    }
    return { x, y };
  },

  oppositeDirection(direction) {
    if (direction == "left") return "right";
    if (direction == "right") return "left";
    if (direction == "up") return "down";
    return "up";
  },

  emitEvent(name, detail) {
    const event = new CustomEvent(name, {
      detail,
    });
    document.dispatchEvent(event);
  },
};
