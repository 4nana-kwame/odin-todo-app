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

  loadProjects() {
    const retrieved = localStorage.getItem("projects");
    
    if (!retrieved) {
      return new ProjectManager();
    }

    try {
      const parsed = JSON.parse(retrieved);
      if (typeof parsed !== "object" || !Array.isArray(parsed.projects)) {
        return new ProjectManager();
      }
      const parsedInstance = ProjectManager.fromJSON(parsed); 
      return parsedInstance;
    } catch (error) {
      console.error("Failed to load projects", error);
      return new ProjectManager();
    }
  }

  clearProjects() {
    try {
      localStorage.removeItem("projects");
      return true;
    } catch (error) {
      console.error("Failed to clear projects", error);
      return false;
    }
  }
}
