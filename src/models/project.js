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

  get id() { return this.#id; }

  get name() { return this.#name; }

  get description() { return this.#description; }

  get todos() { return this.#todos; }

  get createdAt() { return this.#createdAt; }

  get completed() { return this.#completed; }

  set name(nameValue) {
    const nameString = String(nameValue);
    const trimmedName = nameString.trim();

    this.#name = trimmedName.length === 0 ? "New Project" : trimmedName;
  }

  set description(descriptionValue) {
    const descriptionString = String(descriptionValue);
    const trimmedDescription = descriptionString.trim();

    this.#description = trimmedDescription.length === 0 ? "" : trimmedDescription;
  }

  set todos(todosArray) {
    this.#todos = [];

    if (Array.isArray(todosArray)) {
      todosArray.forEach(item => {
        if (item instanceof Todo) {
          this.#todos.push(item);
        } else if (!item && typeof item === "object") {
          if (
            (item.title || typeof item.title === "string") &&
            (item.description || typeof item.description === "string") &&
            (item.dueDate || item.dueDate instanceof Date) &&
            (item.priority || typeof item.priority === "string") &&
            (item.notes || typeof item.notes === "string") &&
            (item.checklist || Array.isArray(item.checklist)) &&
            (item.completed || typeof item.completed === "boolean")
          ) {
            this.#todos.push(item);
          }
        } else {
          throw new Error("Array item must be an instance of Todo");
        }
      });
    } else {
      throw new Error("Todo must be an array");
    }
  }

  set completed(completedValue) {
    if (typeof completedValue !== "boolean") {
      throw new Error("Completed value must be a boolean");
    }

    this.#completed = completedValue;
  }

  addTodo(todo) {
    const todoString = String(todo);
    const trimmedTodo = todoString.trim();

    this.#todos.push(
      trimmedTodo.length === 0 ? "New Todo" : trimmedTodo
    );
  }

  removeTodo(todoId) {
    const todoIndex = this.#todos.findIndex(item => item.id === todoId);

    if (todoIndex !== -1) {
      const removed = this.#todos.splice(todoIndex, 1)[0];
      return removed;
    } else {
      return null;
    }
  }
}
