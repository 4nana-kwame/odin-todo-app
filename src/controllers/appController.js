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
}

export { AppController };
