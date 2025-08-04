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
      
      if (!this.#validateProjectData(parsed)) {
        return new ProjectManager();
      }

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

  hasSavedData() {
    const retrieved = localStorage.getItem("projects");

    if (!retrieved) {
      return false;
    }

    return true;
  }

  #validateProjectData(data) {
    if (typeof data === "object" && data !== null) {
      if (!data.projects || !Array.isArray(data.projects)) {
        return false;
      }

      for (let project of data.projects) {
        if (!project.id || typeof project.id !== "string") return false;
        if (!project.name || typeof project.name !== "string") return false;
        if (!project.todos || !Array.isArray(project.todos)) return false;

        for (let todo of project.todos) {
          if (!todo.id || typeof todo.id !== "string") return false;
          if (!todo.title || typeof todo.title !== "string") return false;
          if (!todo.description || typeof todo.description !== "string") return false;
          if (todo.dueDate !== null && typeof todo.dueDate !== "string") return false;
          if (!todo.priority || typeof todo.priority !== "string") return false;
          if (!todo.notes || typeof todo.notes !== "string") return false;
          if (!todo.checklist || !Array.isArray(todo.checklist)) return false;
          if (typeof todo.completed !== "boolean") return false;
          if (!todo.createdAt || typeof todo.createdAt !== "string") return false;
        }
      }

      return true;
    }
  }

  exportData(projectManager) {
    if (!projectManager || typeof projectManager.toJSON !== "function") return false;

    try {
      const projects = projectManager.toJSON();
      const projectsString = JSON.stringify(projects);
      return projectsString;
    } catch (error) {
      console.error("Failed to export data", error);
      return null;
    }
  }

  importData(jsonString) {
    if (typeof jsonString !== "string"|| jsonString.trim().length === 0) {
      return new ProjectManager();
    }

    try {
      const parsed = JSON.parse(jsonString);
      if (!this.#validateProjectData(parsed)) {
        return new ProjectManager();
      }
      const projectManagerInstance = ProjectManager.fromJSON(parsed);
      return projectManagerInstance;
    } catch (error) {
      console.error("Failed to import data", error);
      return new ProjectManager();
    }
  }
}

export { StorageService };
