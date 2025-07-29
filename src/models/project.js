import { Todo } from "./todo.js"

class Project {
  _id;
  #name;
  #todos;
  #createdAt;
  #completed = false;

  constructor (id, name, todos, createdAt) {
    this._id = crypto.randomUUID();
    
    this.#name = typeof name === "string" ? name.trim() : "";

    this.#todos = [];
    
    if (Array.isArray(todos)) {
      todos.forEach(todo => this.#addTodoInstance(todo));
      this.markAsComplete();
    }

    this.#createdAt = createdAt || new Date();
  }

  #addTodoInstance(value) {
    if (value instanceof Todo) {
      this.#todos.push(value);
    } else if (
      typeof value === "object" &&
      value.id &&
      typeof value.title === "string"
    ) {
      this.#todos.push(new Todo(
        value.id,
        value.title,
        value.description,
        value.dueDate,
        value.priority,
        value.notes,
        value.checklist,
        value.completed,
        value.createdAt
      ));
    } else {
      throw new Error("Projects should hold valid Todo objects or Todo instances.");
    }
  }

  get id() {return this._id;}

  get name() {return this.#name;}

  get todos() {return this.#todos.slice();}

  get createdAt() {return this.#createdAt;}

  get completed() {return this.#completed;}

  set name(newName) {
    this.#name = typeof newName === "string" ? newName.trim() : "";
  }

  set todos(newTodos) {
    this.#todos = [];
    
    if (Array.isArray(newTodos)) {
      newTodos.forEach(todo => this.#addTodoInstance(todo));
    }
  }

  addTodo(todo) {
    this.#addTodoInstance(todo);
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
