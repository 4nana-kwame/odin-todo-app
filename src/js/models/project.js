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

  deleteTodo(todoId) {
    const todoIndex = this.todos.findIndex(item => item.id === todoId);

    if (todoIndex !== -1) {
      const deleted = this.todos.splice(todoIndex, 1)[0];
      return deleted;
    }

    return null;
  }
}
