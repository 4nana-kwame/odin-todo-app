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
}