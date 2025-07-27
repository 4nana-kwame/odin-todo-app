class Project {
  #id;
  #name;
  #todos;
  #createdAt;

  constructor (id, name, todos, createdAt) {
    this.#id = id || crypto.randomUUID();
    
    if (typeof name === "string") {
      const trimmedName = name.trim();

      this.#name = trimmedName.length === 0 ? "" : trimmedName;
    }

    this.#todos = [];
    if (Array.isArray(todos)) {
      todos.forEach(value => {
        if (typeof value === "object" && value !== null) {
          if (
            typeof value.id === "string" &&
            typeof value.text === "string" &&
            typeof value.done === "boolean"
          ) {
            this.#todos.push(value);
          }
        } else if (typeof value === "string") {
          const trimmedValue = value.trim();

          this.#todos.push({
            id: crypto.randomUUID(),
            text: trimmedValue.length === 0 ? "" : trimmedValue,
            done: false
          });
        }
      });
    }

    this.#createdAt = createdAt || new Date();
  }

  get id() {return this.#id;}

  get name() {return this.#name;}

  get todos() {return this.#todos;}

  get createdAt() {return this.#createdAt;}
}
