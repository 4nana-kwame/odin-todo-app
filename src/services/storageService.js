import { ProjectManager } from "./projectManager.js";

class StorageService {
  
  saveProjects(projectManager) {
    if (!projectManager || typeof projectManager.toJSON !== "function") {
      throw new Error("saveProjects() expects a ProjectManager instance");
    }

    try {
      const data = projectManager.toJSON();
      const jsonString = JSON.stringify(data);
      localStorage.setItem("projects", jsonString);
    } catch (error) {
      console.error("Failed to save projects", error);
    }
  }
}
