import { Project } from "../models/project.js";

class ProjectManager {
  #projects;

  constructor (projects) {
    this.projects = projects;
  }

  get projects() { return this.#projects.slice(); }

  set projects(newProjects) {
    this.#projects = [];

    if (Array.isArray(newProjects)) {
      for (let newProject of newProjects) {
        if (newProject instanceof Project) {
          this.#projects.push(newProject);
        } else if (typeof newProject === "object" && newProject !== null) {
          this.#projects.push(Project.fromJSON(newProject));
        }
      }
    }

    if (this.#projects.length === 0) {
      this.#projects.push(new Project("Inbox", []));
    }
  }

  createProject(name, todos, createdAt) {
    const project  = new Project(name, todos, createdAt);
    this.#projects.push(project);
    return project;
  }

  addProject(project) {    
    let projectInstance;
    if (project instanceof Project) {
      projectInstance = project;
    } else if (typeof project === "object" && project !== null) {
      if (
        typeof project.name === "string" &&
        Array.isArray(project.todos)
      ) {
        projectInstance = Project.fromJSON(project);
      }
    } else {
      return null;
    }

    if(!projectInstance) return null;

    this.#projects.push(projectInstance);
    return projectInstance;
  }

  deleteProject(id) {
    const index = this.#projects.findIndex(item => item.id === id);
    if (index === -1) return null;

    const project = this.#projects[index];
    if (project.name === "Inbox") return null;

    const removed = this.#projects.splice(index, 1)[0];
    return removed;
  }
}

export { ProjectManager };
