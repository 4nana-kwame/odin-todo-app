import { Todo } from "./todo.js";

class Project {
  #id;
  #name;
  #description;
  #todos;
  #completed;
  #createdAt;

  constructor (name = "New Project", description = "", todos = [], completed = false) {
    this.#id = crypto.randomUUID();
    this.#createdAt = new Date();
    this.#name = name;
    this.#description = description;
    this.#todos = todos;
    this.completed = completed;
  }

  get id() { return this.#id; }

  get name() { return this.#name; }

  get description() { return this.#description; }

  get todos() { return this.#todos.slice(); }

  get completed() { return this.#completed; }

  get createdAt() { return this.#createdAt; }

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
        } else {
          throw new Error("Array items must be Todo instances");
        }
      });
    } else {
      throw new Error("Project expects an array of Todo instances");
    }
  }

  set completed(completedValue) {
    if (typeof completedValue !== "boolean") {
      throw new Error("Completed value must be a boolean");
    }

    this.#completed = completedValue;
  }

  addTodo(todo) {
    if (todo instanceof Todo) {
      return this.#todos.push(todo);
    } else {
      throw new Error("addTodo expects a Todo instance");
    }
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

  getTodoById(todoId) {
    const todo = this.#todos.find(item => item.id === todoId);
    if (!todo) return null;

    return todo;
  }

  getTodoByName(name) {
    const todo = this.#todos.find(item => item.name === String(name));
    if (!todo) return null;

    return todo;
  }

  renameTodo(todoId, newName) {
    const todo = this.#todos.find(item => item.id === todoId);
    if (!todo) return null;

    todo.name = String(newName);
    return todo;
  }

  toJSON() {
    return {
      id: this.#id,
      name: this.#name,
      description: this.#description,
      todos: this.#todos.map(item => item.toJSON()),
      createdAt: this.#createdAt.toISOString(),
      completed: this.#completed
    };
  }

  static fromJSON(data) {
    const project = new Project(
      data.name,
      data.description,
      data.todos?.map(item => item instanceof Todo ? item : Todo.fromJSON(item)) || [],
      data.completed
    );

    project.#id = data.id;
    project.#createdAt = new Date(data.createdAt);

    return project;
  }
}

export { Project };
