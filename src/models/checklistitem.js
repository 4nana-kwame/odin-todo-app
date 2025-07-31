class ChecklistItem {
  #id;
  #text;
  #done;

  constructor (text, done = false) {
    this.#id = crypto.randomUUID();
    this.text = text;
    this.done = done;
  }

  get id() { return this.#id; }

  get text() { return this.#text; }

  get done() { return this.#done; }

  set text(checklistText) {
    if (typeof checklistText === "string") {
      const trimmedText = checklistText.trim();

      if (trimmedText.length === 0) {
        throw new Error("ChecklistItem text cannot be empty");
      } else {
        this.#text = trimmedText;
      }
    } else {
      throw new Error("ChecklistItem text must be a string");
    }
  }
  
  set done(boolDone) {
    this.#done = typeof boolDone === "boolean" ? boolDone : false;
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

  static fromJSON(data) {
    if (
      data &&
      typeof data.id === "string" &&
      typeof data.text === "string" &&
      typeof data.done === "boolean"
    ) {
      const item = new ChecklistItem(data.text, data.done);
      item.#id = data.id;
      return item;
    }
    return null;
  }
}

export { ChecklistItem };
