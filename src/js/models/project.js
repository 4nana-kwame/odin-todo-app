import { Todo } from "./todo.js";

class Project {
  constructor (name) {
    this.id = crypto.randomUUID();
    this.name = name || "Untitled Project";
    this.todos = [];
  }
}
