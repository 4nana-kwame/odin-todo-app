import { Project } from "../models/project.js";
import { TodoManager } from "./todomanager.js";

class ProjectManager {
  #projects = new Map();

  createProject(name, description, todos, completed) {
    const project = new Project(
      name,
      description,
      todos,
      completed
    );

    this.#projects.set(project.id, project);
    return project;
  }

  getProjectById(projectId) {
    const project = this.#projects.get(projectId);
    if (!project) return null;

    return project;
  }

  getAllProjects() {
    return Array.from(this.#projects.values());
  }
}
