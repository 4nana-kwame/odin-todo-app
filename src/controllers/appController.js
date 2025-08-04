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
}

export { AppController };
