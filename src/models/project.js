import { Todo } from "./todo.js";

class Project {
  #id;
  #name;
  #description;
  #todos;
  #createdAt;
  #completed;

  constructor (name = "New Project", description = "", todos = [], completed = false) {
    this.#id = crypto.randomUUID();
    this.#name = name;
    this.#description = description;
    this.#todos = todos;
    this.#createdAt = new Date();
    this.completed = completed;
  }

  get id() { return this.#id; }

  get name() { return this.#name; }

  get description() { return this.#description; }

  get todos() { return this.#todos; }

  get createdAt() { return this.#createdAt; }

  get completed() { return this.#completed; }

  set name(nameValue) {
    const nameString = String(nameValue);
    const trimmedName = nameString.trim();

    this.#name = trimmedName.length === 0 ? "New Project" : trimmedName;
  }

  set description(descriptionValue) {
    const descriptionString = String(descriptionValue);
    const trimmedDescription = descriptionString.trim();

    this.#description = trimmedDescription.length === 0 ? "" : trimmedDescription;
  }

  set todos(todosArray) {
    this.#todos = [];

    if (Array.isArray(todosArray)) {
      todosArray.forEach(item => {
        const stringItem = String(item);
        const trimmedItem = stringItem.trim();

        this.#todos = trimmedItem.length === 0 ? "New Todo" : trimmedItem;
      });
    } else {
      throw new Error("Todo must be an array");
    }
  }

  set completed(completedValue) {
    if (typeof completedValue !== "boolean") {
      throw new Error("Completed value must be a boolean");
    }

    this.#completed = completedValue;
  }

  addTodo(todo) {
    const todoString = String(todo);
    const trimmedTodo = todoString.trim();

    this.#todos.push(
      trimmedTodo.length === 0 ? "New Todo" : trimmedTodo
    );
  }
}
