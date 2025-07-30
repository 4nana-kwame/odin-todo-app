import { Todo } from "../models/todo.js";

class TodoManager {
  #todos;

  constructor(initialTodos = []) {
    this.#todos = [];

    if (Array.isArray(initialTodos)) {
      initialTodos.forEach(todoData => {
        if (todoData instanceof Todo) {
          this.#todos.push(todoData);
        } else if (typeof todoData === "object" && todoData !== null) {
          const restored = Todo.fromJSON(todoData);
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
    const todo = this.getTodoById(id)
    if (!todo) return null;

    const allowedProps = ["title", "description", "dueDate", "priority", "notes", "checklist", "completed"];

    for (let prop of allowedProps) {
      if (prop in todo) {
        todo[prop] = data[prop];
      }
    }

    return todo;
  }

  deleteTodo(id) {
    const index = this.#todos.findIndex(todo => todo.id === id);

    if (index !== -1) {
      const removedItem = this.#todos.splice(index, 1)[0];
      return removedItem;
    }
    
    return null;
  }

  getAllTodos() {
    return this.#todos.slice();
  }

  toggleTodoCompleted(id) {
    const todo = this.#todos.find(item => item.id === id);
    if (!todo) return null;
    
    return todo.toggleTodoCompleted();
  }

  addChecklistItem(todoId, text) {
    const todo = this.getTodoById(todoId);
    if (!todo) return null;
    
    return todo.addChecklist(text);
  }
}
