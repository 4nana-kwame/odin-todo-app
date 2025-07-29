import { Todo } from "../models/todo.js";

class TodoManager {
  #todos;

  constructor(initialTodos = []) {
    this.#todos = [];

    if (Array.isArray(initialTodos)) {
      initialTodos.forEach(todoData => {
        if (todoData instanceof Todo) {
          this.#todos.push(todoData);
        } else if (typeof initialTodos === "object" && initialTodos !== null) {
          const restored = Todo.fromJSON(initialTodos);
          this.#todos.push(restored);
        }
      });
    }
  }
}
