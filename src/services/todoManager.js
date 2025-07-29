import { ProjectManager } from "./projectManager.js";
import { Todo } from "../models/todo.js";

class TodoManager {
  #projectManager;

  constructor (projectManager) {
    if (projectManager instanceof ProjectManager) {
      this.#projectManager = projectManager;
    } else {
      throw new Error("Invalid projectManager instance");
    }
  }

  createTodo(projectId, todoData) {
    const project = this.#projectManager.findProjectById(projectId);

    if (!project) throw new Error("Project not found");

    const todo = new Todo(
      todoData.id,
      todoData.title,
      todoData.description,
      todoData.dueDate,
      todoData.priority,
      todoData.notes,
      todoData.checklist,
      todoData.completed,
      todoData.createdAt
    );

    project.addTodo(todo);
    project.markAsComplete();
    this.#projectManager.save();
  }

  updateTodo(projectId, todoId, updates) {
    const project = this.#projectManager.findProjectById(projectId);
    if(!project) throw new Error("Project not found");

    const todo = project.findTodoById(todoId);
    if (!todo) throw new Error("Todo not found");

    for (let prop in updates) {
      if (Object.getOwnPropertyDescriptor(Object.getPrototypeOf(todo), prop)) {
        todo[prop] = updates[prop];
      }
    }
  }
}
