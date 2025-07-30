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
}
