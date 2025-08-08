import { Todo } from "./todo.js";

class Project {
  #id;
  #name;
  #description;
  #todos;
  #completed;

  constructor (name = "New Project", description = "", todos = [], completed = false) {
    this.#id = crypto.randomUUID();
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

  set name(nameValue) {
    if (typeof nameValue !== "string") {
      throw new Error("Project name must be a string");
    }

    const trimmed = nameValue.trim();

    this.#name = trimmed.length === 0 ? "New Project" : trimmed;
  }

  set description(descriptionValue) {
    if (typeof descriptionValue !== "string") {
      throw new Error("Description must be a string");
    }

    const trimmed = descriptionValue.trim();

    this.#description = trimmed.length === 0 ? "" : trimmed;
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
      throw new Error("Completed must be a boolean");
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
    if (typeof name !== "string") {
      throw new Error("Name must be a string");
    }

    const trimmed = name.trim();
    const todo = this.#todos.find(item => item.name === trimmed);
    if (!todo) return null;

    return todo;
  }

  renameTodo(todoId, newName) {
    const todo = this.#todos.find(item => item.id === todoId);
    if (!todo) return null;

    if (typeof newName !== "string") {
      throw new Error("Name must be a string");
    }

    const trimmed = newName.trim();
    todo.name = trimmed;
    
    return todo;
  }

  toggleProjectCompleted() {
    return this.#completed = !this.#completed;
  }

  toJSON() {
    return {
      id: this.#id,
      name: this.#name,
      description: this.#description,
      todos: this.#todos.map(item => item.toJSON()),
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

    return project;
  }
}

export { Project };
