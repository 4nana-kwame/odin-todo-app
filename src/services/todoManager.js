import { Project } from "./models/project.js";

class ProjectManager {
  #projects

  constructor (projects) {
    this.#projects = [];

    if (Array.isArray(projects)) {
      for (let project of projects) {
        if (project instanceof Project) {
          this.#projects.push(project);
        } else if (typeof project === "object") {
          this.#projects.push(new Project(project.id, project.name, project.todos, project.createdAt));
        }
      }
    }
  }
}
