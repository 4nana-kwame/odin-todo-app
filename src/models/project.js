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
}
