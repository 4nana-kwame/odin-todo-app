class CheckListItem {
  #id;
  #text;
  #done;

  constructor (text, done = false) {
    this.#id = crypto.randomUUID();

    if (typeof text === "string") {
      const trimmedText = text.trim();
      this.#text = trimmedText.length === 0 ? "" : trimmedText;
    } else {
      throw new Error("ChecklistItem text must be a string");
    }

    this.#done = typeof done === "boolean" ? done : false;
  }

  get id() { return this.#id; }

  get text() { return this.#text; }

  get done() { return this.#done; }

  set text(newText) {
    if (typeof newText === "string") {
      const trimmedText = newText.trim();

      this.#text = trimmedText.length === 0 ? "" : trimmedText;
    } else {
      console.warn("ChecklistItem text must be a string");
    }
  }
  
  set done(newDone) {
    this.#done = typeof newDone === "boolean" ? newDone : false;
  }

  toggleDone() {
    this.#done = !this.#done;
    return this.#done;
  }

  toJSON() {
    return {
      id: this.#id,
      text: this.#text,
      done: this.#done
    };
  }
}
