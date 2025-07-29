import { Todo } from "./todo.js"

class Project {
  _id;
  #name;
  #todos;
  #createdAt;
  #completed = false;

  constructor (name = "Untitled Project", todos = [], createdAt = null) {
    this._id = crypto.randomUUID();
    this.name = name;
    this.todos = todos;   
    this.#createdAt = createdAt instanceof Date && !isNaN(createdAt.getTime()) ? createdAt : new Date();
  }

  get id() { return this._id; }

  get name() { return this.#name; }

  get todos() { return this.#todos.slice(); }

  get createdAt() { return this.#createdAt; }

  get completed() { return this.#completed; }

  set name(newName) {
    if (typeof newName === "string") {
      const trimmedName = newName.trim();
      this.#name = trimmedName.length === 0 ? "Untitled Project" : trimmedName;
    } else {
      this.#name = "Untitled Project";
    }
  }

  set todos(newTodos) {
    this.#todos = [];
    
    if (Array.isArray(newTodos)) {
      
    }
  }

  addTodo(todo) {
    
    this.markAsComplete();
  }

  removeTodo(id) {
    let todoIndex = this.#todos.findIndex(todo => String(todo.id) === String(id));

    if (todoIndex !== -1) {
      this.#todos.splice(todoIndex, 1);
      this.markAsComplete();
      return true;
    }

    return false;
  }

  findTodoById(id) {
    return this.#todos.find(todo => String(todo.id) === String(id)) || null;
  }

  findTodoByPriority(priority) {
    if (typeof priority === "string") {
      const trimPriority = priority.trim();

      return this.#todos.filter(todo => todo.priority === trimPriority);
    }

    return [];
  }

  findTodosByDueDate(date) {
    const dateObj = new Date(date);
    
    return this.#todos.filter(todo => todo.dueDate && dateObj.toDateString() === todo.dueDate.toDateString());
  }

  markAsComplete() {
    this.#completed = this.#todos.length > 0 && this.#todos.every(todo => todo.completed);
    return this.#completed;
  }

  toJSON() {
    return {
      id: this._id,
      name: this.#name,
      todos: this.#todos.map(todo => todo.toJSON()),
      createdAt: this.#createdAt.toISOString(),
      completed: this.#completed
    }
  }

  static fromJSON(data) {
    const project =  new Project (
      data.id,
      data.name,
      data.todos.map(todo => Todo.fromJSON(todo)),
      data.createdAt ? new Date(data.createdAt) : undefined
    );
    if (typeof data.completed === "boolean") {
      project.#completed = data.completed;
    }

    return project;
  }
}

export { Project };
