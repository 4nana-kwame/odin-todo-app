import { StorageService } from "../services/storageService.js";
import { ProjectManager } from "../services/projectManager.js";

class AppController {


  init() {
    const data = new StorageService();
    const loadedData = data.loadProjects();
    this.projectManager = loadedData;
  }
}

export { AppController };
