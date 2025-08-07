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
}
