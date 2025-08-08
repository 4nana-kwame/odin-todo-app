import { Todo } from "../models/todo.js";

class TodoManager {

  createTodo(title, description, dueDate, priority, completed) {
    const todo = new Todo(
      title,
      description,
      dueDate,
      priority,
      completed
    );
    
    return todo;
  }
}
