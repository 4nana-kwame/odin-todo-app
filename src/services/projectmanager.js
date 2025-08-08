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

  updateProject(projectId, updateData) {
    if (!this.#projects.has(projectId)) return null;
    if (typeof updateData !== "object" || updateData === null) return null;

    const project = this.#projects.get(projectId);

    if (updateData.name !== undefined) {
      project.name = updateData.name;
    }

    if (updateData.description !== undefined) {
      project.description = updateData.description;
    }

    if (updateData.todos !== undefined) {
      project.todos = updateData.todos;
    }

    if (updateData.completed !== undefined) {
      project.completed = updateData.completed;
    }

    return project;
  }

  deleteProject(projectId) {
    if (typeof projectId !== "string") return false;

    return this.#projects.delete(projectId);
  }
}
