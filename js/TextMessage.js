class TextMessage {
  constructor({ text, oncomplete }) {
    this.text = text;
    this.oncomplete = oncomplete;
    this.element = null;
  }

  createElement() {
    // Create the element
    this.element = document.createElement("div");
    this.element.classList.add("TextMessage");

    this.element.innerHTML = `
        <p class = "TextMessage_p">${this.text}</p>
        <button class="TextMessage_button">Next</button>`;

    this.element.querySelector("button").addEventListener("click", () => {
      // Close the text message
      this.done();
    });

    this.actionListener = new KeyPressListener("Enter", () => {
      this.actionListener.unbind();
      this.done();
    });
  }

  done() {
    this.element.remove();
    this.oncomplete();
  }

  init(container) {
    this.createElement();
    container.appendChild(this.element);
  }
}
