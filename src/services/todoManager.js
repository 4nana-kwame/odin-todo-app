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

  get projects() {return this.#projects;}

  set projects(newProjects) {
    this.#projects = [];

    if (Array.isArray(newProjects)) {
      for (let newProject of newProjects) {
        if(newProject instanceof Project) {
          this.#projects.push(newProject);
        } else if (typeof newProject === "object") {
          this.#projects.push(new Project(newProject.id, newProject.name, newProject.todos, newProject.createdAt));
        }
      }
    }
  }

  addProject(project) {
    let projectInstance;

    if (project instanceof Project) {
      projectInstance = project;
    } else if (
      typeof project === "object" &&
      project.id &&
      typeof project.name === "string" &&
      Array.isArray(project.todos)
    ) {
      projectInstance = new Project(project.id, project.name, project.todos, project.createdAt);
    } else {
      throw new Error("Parameter must be an a plain obj with ID, name, and todos or an instance of Project");
    }

    const projectIndex = this.#projects.findIndex(item => item.id === projectInstance.id);

    if (projectIndex !== -1) {
      this.#projects[projectIndex] = projectInstance;
    } else {
      this.#projects.push(projectInstance);
    }
  }

  removeProject(id) {
    const projectIndex = this.#projects.findIndex(item => String(item.id) === String(id));

    if (projectIndex !== -1) {
      this.#projects.splice(projectIndex, 1);
      return true;
    }

    return false;
  }

  findProjectById(id) {
    return this.#projects.find(item => String(item.id) === String(id)) || null;
  }

  findProjectByName(name) {
    const trimmedName = name.trim();
    return this.#projects.find(item => trimmedName === item.name) || null;
  }

  findAllProjects() {
    return this.#projects.slice();
  }

  renameProject(id, newName) {
    const project = this.#projects.find(item => String(item.id) === String(id));

    if (project) {
      project.name = newName.trim();
      return true;
    }

    return false;
  }

  toJSON() {
    return {
      projects: this.#projects.map(project => project.toJSON())
    }
  }

  static fromJSON(projectData) {
    return new ProjectManager(projectData.projects.map(project => Project.fromJSON(project)));
  }

  save() {
    const saveObj = JSON.stringify(this.toJSON());
    localStorage.setItem("projects", saveObj);
  }
}
