import { Todo } from "../models/todo.js";

class TodoManager {
  #todos = new Map();

  createTodo(title, description, dueDate, priority, completed) {
    const todo = new Todo(
      title,
      description,
      dueDate,
      priority,
      completed
    );

    this.#todos.set(todo.id, todo);
    return todo;
  }

  getTodoById(todoId) {
    if (typeof todoId !== "string") throw new Error("ID must be a string");

    return this.#todos.get(todoId) || null;
  }

  getAllTodos() {
    return Array.from(this.#todos.values());
  }
}
