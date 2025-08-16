import { Project } from "./project.js";

class TodoListManager {
  constructor () {
    this.projects = [];
    this.currentProjectId = null;
  }

  addProject(name) {
    const project = new Project(name);
    this.projects.push(project);

    return project;
  }
}
