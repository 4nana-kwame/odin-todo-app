import { Todo } from "./todo.js";

class Project {
  #id;
  #name;
  #todos;
  #createdAt;

  constructor (name = "New Project", todos = []) {
    this.#id = crypto.randomUUID();
    this.#name = name;
    this.#todos = todos;
    this.#createdAt = new Date();
  }
}
