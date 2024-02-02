class OverWorld {
  constructor(config) {
    this.element = config.element;
    this.canvas = this.element.querySelector(".game-canvas");
    this.ctx = this.canvas.getContext("2d");
  }

  init() {
    const image = new Image();
    image.onload = () => {
      this.ctx.drawImage(image, 0, 0);
    };
    image.src = "/images/maps/DemoLower.png";

    const x = 4;
    const y = 6;

    const shadow = new Image();
    shadow.onload = () => {
      this.ctx.drawImage(
        shadow,
        0, // X cordinate
        0, // Y cordinate
        32, // X cut cordinate
        32, // Y cut cordinate
        x * 16 - 8, // X move cordinate
        y * 16 - 16, // Y move cordinate
        32, // X scale cordinate
        32 // Y scale cordinate
      );
    };
    shadow.src = "/images/characters/shadow.png";

    const hero = new Image();
    hero.onload = () => {
      this.ctx.drawImage(
        hero,
        0, // X cordinate
        0, // Y cordinate
        32, // X cut cordinate
        32, // Y cut cordinate
        x * 16 - 8, // X move cordinate
        y * 16 - 16, // Y move cordinate
        32, // X scale cordinate
        32 // Y scale cordinate
      );
    };
    hero.src = "/images/characters/people/hero.png";
  }
}
