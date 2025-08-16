import { Project } from "./project.js";

class ProjectManager {
  constructor () {
    this.projects = [];
    this.currentProjectId = null;
  }

  addProject(name) {
    const project = new Project(name);
    this.projects.push(project);

    return project;
  }

  getProject(projectId) {
    const project = this.projects.find(item => item.id === projectId);
    if (!project) return null;

    return project;
  }
}
