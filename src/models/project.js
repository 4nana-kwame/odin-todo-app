import { Todo } from "./todo.js"

class Project {
  #id;
  #name;
  #todos;
  #createdAt;

  constructor (name = "Untitled Project", todos = [], createdAt = null) {
    this.#id = crypto.randomUUID();
    this.name = name;
    this.todos = todos;   
    this.#createdAt = createdAt instanceof Date && !isNaN(createdAt.getTime()) ? createdAt : new Date();
  }

  get id() { return this.#id; }

  get name() { return this.#name; }

  get todos() { return this.#todos.slice(); }

  get createdAt() { return this.#createdAt; }

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
      newTodos.forEach(todo => {
        if (todo instanceof Todo) {
          this.#todos.push(todo);
        } else if (typeof todo === "object" && todo !== null) {
          const restored = Todo.fromJSON(todo);
          if (restored) {
            this.#todos.push(restored);
          }
        }
      });
    }
  }

  addTodo(todo) {
    if (todo instanceof Todo) {
      this.#todos.push(todo);
      return todo;
    }
    throw new Error("Expected instance of Todo when calling addTodo()");
  }

  removeTodo(id) {
    let index = this.#todos.findIndex(item => item.id === id);

    if (index !== -1) {
      const removedItems = this.#todos.splice(index, 1)[0];
      return removedItems;
    }

    return null;
  }

  findTodoById(id) {
    return this.#todos.find(item => item.id === id) || null;
  }

  findTodoByPriority(priority) {
    return this.#todos.filter(todo => todo.priority === priority);
  }

  findTodosByDueDate(date) {
    if (!(date instanceof Date) || isNaN(date.getTime())) return []; 
    return this.#todos.filter(
      todo => todo.dueDate && todo.dueDate.toDateString() === date.toDateString()
    );
  }

  toJSON() {
    return {
      id: this.#id,
      name: this.#name,
      todos: this.#todos.map(todo => todo.toJSON()),
      createdAt: this.#createdAt.toISOString(),
    };
  }

  static fromJSON(data) {
    if (!data || typeof data !== "object") return null;

    const project =  new Project (
      data.name,
      data.todos,
      data.createdAt ? new Date(data.createdAt) : null
    );
    project.#id = data.id;

    return project;
  }
}

export { Project };
