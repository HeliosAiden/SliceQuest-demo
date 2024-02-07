class RevealingText {
  constructor(config) {
    this.element = config.element;
    this.text = config.text;
    this.speed = config.speed || 70;

    this.timeout = null;
    this.isDone = false;
  }

  reavealOneCharacter(list) {
    const next = list.splice(0, 1)[0];
    next.span.classList.add("reveal");

    if (list.length > 0) {
      this.timeout = setTimeout(() => {
        this.reavealOneCharacter(list);
      }, next.delayAfter);
    } else {
      this.isDone = true;
    }
  }

  warpToDone() {
    clearInterval(this.timeout);
    this.isDone = true;
    this.element.querySelectorAll("span").forEach((s) => {
      s.classList.add("reveal");
    });
  }

  init() {
    let characters = [];
    this.text.split("").forEach((character) => {
      // Create each span, add to element
      let span = document.createElement("span");
      span.textContent = character;
      this.element.appendChild(span);

      // Add this span to our internal state array
      characters.push({
        span,
        delayAfter: character === " " ? 0 : this.speed,
      });
    });

    this.reavealOneCharacter(characters);
  }
}
