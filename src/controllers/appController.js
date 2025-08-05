import { StorageService } from "../services/storageService.js";

class AppController {


  init() {
    const data = new StorageService();
    const loadedData = data.loadProjects();
    this.projectManager = loadedData;
  }

  save() {
    const savedData = new StorageService();
    savedData.saveProjects(this.projectManager);
  }

  getProjects() {
    return this.projectManager.projects;
  }

  getProjectById(id) {
    return this.projectManager.getProjectById(id) || null;
  }

  createProject(name, todos, createdAt) {
    return this.projectManager.createProject(name, todos, createdAt);
  }

  deleteProject(id) {
    return this.projectManager.deleteProject(id) || null;
  }

  renameProject(id, name) {
    return this.projectManager.renameProject(id, name) || null;
  }

  getDefaultProject() {
    return this.projectManager.getDefaultProject();
  }

  getProjectByName(name) {
    return this.projectManager.getProjectByName(name) || null;
  }

  getAllTodos(projectId) {
    const project = this.projectManager.getProjectById(projectId);
    return project ? project.todos : null;
  }

  getTodoById(projectId, todoId) {
    const project = this.projectManager.getProjectById(projectId);
    if (!project) return null;

    const todo = project.findTodoById(todoId);
    if (!todo) return null;

    return todo;
  }

  createTodo(projectId, todo) {
    const project = this.projectManager.getProjectById(projectId);
    if (!project || !(todo instanceof Todo)) return null;

    return project.addTodo(todo);
  }

  deleteTodo(projectId, todoId) {
    const project = this.projectManager.getProjectById(projectId);
    if (!project) return null;

    const todo = project.removeTodo(todoId);
    if (!todo) return null;

    return todo;
  }

  updateTodo(projectId, todoId, data) {
    const project = this.projectManager.getProjectById(projectId);
    if (!project) return null;

    const todo = project.findTodoById(todoId);
    if (!todo) return null;

    const allowedValues = ["title", "description", "dueDate", "priority", "completed"];

    for (let prop in data) {
      if (allowedValues.includes(prop)) {
        todo[prop] = data[prop];
      }
    }

    return todo;
  }

  toggleTodoCompletion(projectId, todoId) {
    const project = this.projectManager.getProjectById(projectId);
    if (!project) return null;

    const todo = project.findTodoById(todoId);
    if (!todo) return null;

    return todo.toggleTodoCompleted();
  }

  getTodosByPriority(projectId, priority) {
    const project = this.projectManager.getProjectById(projectId);
    if (!project) return null;

    return project.findTodoByPriority(priority);
  }

  getTodosByDueDate(projectId, dueDate) {
    const project = this.projectManager.getProjectById(projectId);
    if (!project) return null;

    return project.findTodosByDueDate(dueDate);
  }

  getOverdueTodos(projectId) {
    const project = this.projectManager.getProjectById(projectId);
    if (!project) return null;

    const currentDate = new Date();

    return project.todos.filter(todo => {
      let todoDueDate = todo.dueDate;

      if (typeof todoDueDate === "string") {
        todoDueDate = new Date(todo.dueDate);
      }

      return todoDueDate < currentDate && !todo.completed;
    });
  }

  getCompletedTodos(projectId) {
    const project = this.projectManager.getProjectById(projectId);
    if (!project) return null;

    return project.todos.filter(todo => todo.completed);
  }

  getTodosByStatus(projectId, status) {
    const project = this.projectManager.getProjectById(projectId);
    if (!project) return null;
    
    if (status !== "completed" && status !== "incomplete") return null;

    return project.todos.filter(todo => 
      status === "completed" ? todo.completed : !todo.completed
    );
  }
}

export { AppController };
