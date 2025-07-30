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

  createTodo(title, description, dueDate, priority, notes, checklist, completed, createdAt) {
    const todo = new Todo(
      title,
      description,
      dueDate,
      priority,
      notes,
      checklist,
      completed,
      createdAt
    );

    this.#todos.push(todo);

    return todo;
  }

  getTodoById(id) {
    return this.#todos.find(todo => todo.id === id) || null;
  }

  updateTodo(id, data) {
    const todo = this.#todos.find(item => item.id === id) || null;

    for (let prop in data) {
      if (prop in todo) {
        todo[prop] = data[prop];
      }
    }

    return todo;
  }
}
