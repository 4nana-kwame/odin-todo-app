import {Todo} from "./todo.js"

class Project {
  #id;
  #name;
  #todos;
  #createdAt;

  constructor (id, name, todos, createdAt) {
    this.#id = id || crypto.randomUUID();
    
    if (typeof name === "string") {
      const trimmedName = name.trim();

      this.#name = trimmedName.length === 0 ? "" : trimmedName;
    }

    this.#todos = [];
    
    if (Array.isArray(todos)) {
      todos.forEach(value => {
        if (value instanceof Todo) {
          this.#todos.push(value);
        } else if (
          typeof value === "object" &&
          value.id &&
          value.title
        ) {
          this.#todos.push(new Todo(value.id, value.title));
        } else {
          throw new Error("Projects should hold real todos, not plain strings");
        }
      });
    }

    this.#createdAt = createdAt || new Date();
  }

  get id() {return this.#id;}

  get name() {return this.#name;}

  get todos() {return this.#todos;}

  get createdAt() {return this.#createdAt;}

  set name(newName) {
    if (typeof newName === "string") {
      const trimmedNewName = newName.trim();

      this.#name = trimmedNewName.length === 0 ? "" : trimmedNewName;
    }
  }

  set todos(newTodos) {
    this.#todos = [];
    
    if (Array.isArray(newTodos)) {
      newTodos.forEach(value => {
        if (value instanceof Todo) {
          this.#todos.push(value);
        } else if (
          typeof value === "object" &&
          value.id &&
          value.title
        ) {
          this.#todos.push(new Todo(value.id, value.title));
        } else {
          throw new Error("Projects should hold real todos, not plain strings");
        }
      });
    }
  }

  removeTodo(id) {
    let itemIndex;
    this.#todos.forEach((value, index) => {
      if (id === value.id) {
        itemIndex = value[index];
      }
    });

    if (itemIndex !== -1) {
      this.#todos.splice(itemIndex, 1);
    }
  }

  findTodoById(id) {
    for (let value of this.#todos) {
      if (id === value.id) {
        return value;
      } else {
        return null;
      }
    }
  }

  findTodoByPriority(priority) {
    if (typeof priority === "string") {
      const trimPriority = priority.trim();

        for (let value of this.#todos) {
          if (trimPriority === value.priority) {
          return value;
        }
      }
    }
  }

  findByTodosDueDate(date) {
    const dateObj = new Date(date);

    for (let value of this.#todos) {
      if (dateObj.getDate() === value.dueDate.getDate()) {
        return value;
      } else {
        return null;
      }
    }
  }
}
