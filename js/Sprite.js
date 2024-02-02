class Sprite {
  constructor(config) {
    //Setup new Image
    this.image = new Image();
    this.image.src = config.src;
    this.image.onload = () => {
      this.isLoaded = true;
    };

    // Shadow
    this.shadow = new Image();
    this.useShadow = true; //config.useShadow || false
    if (this.useShadow) {
      this.shadow.src = "/images/characters/shadow.png";
    }
    this.shadow.onload = () => {
      this.isShadowLoaded = true;
    };

    // Configuring animations & inital state
    this.animation = config.animation || {
      idleDown: [[0, 0]],
      //   walkDown: [
      //     [0, 0],
      //     [1, 0],
      //     [2, 0],
      //     [3, 0],
      //   ],
    };
    this.currentAnimation = config.currentAnimation || "idleDown";
    this.currentAnimationFrame = 0;

    // Reference to the game object
    this.gameObject = config.gameObject;
  }

  draw(ctx) {
    const x = this.gameObject.x - 7;
    const y = this.gameObject.y - 16;

    this.isShadowLoaded && ctx.drawImage(this.shadow, x, y);
    // if isLoaded = true then draw Image
    this.isLoaded && ctx.drawImage(this.image, 0, 0, 32, 32, x, y, 32, 32);
  }
}
