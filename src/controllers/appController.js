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
}

export { AppController };
