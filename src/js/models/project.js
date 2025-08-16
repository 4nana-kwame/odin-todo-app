import { Todo } from "./todo.js";

class Project {
  constructor (name) {
    this.id = crypto.randomUUID();
    this.name = name || "Untitled Project";
    this.todos = [];
  }

  addTodo(todoData) {
    const todo = new Todo(...todoData);
    this.todos.push(todo);
    return todo;
  }
}
