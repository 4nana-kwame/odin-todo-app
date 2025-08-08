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

  updateTodo(todoId, updateData) {
    if (!this.#todos.has(todoId)) return null;
    if (typeof updateData !== "object" || updateData === null) return null;

    const todo = this.#todos.get(todoId);

    if (updateData.title !== undefined) {
      todo.title = updateData.title;
    }

    if (updateData.description !== undefined) {
      todo.description = updateData.description;
    }

    if (updateData.dueDate !== undefined) {
      todo.dueDate = updateData.dueDate;
    }

    if (updateData.priority !== undefined) {
      todo.priority = updateData.priority;
    }

    if (updateData.completed !== undefined) {
      todo.completed = updateData.completed;
    }

    return todo;
  }
}
