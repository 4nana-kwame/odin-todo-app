import { Project } from "../models/project.js";

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

    if (this.#projects.length === 0) {
      this.addProject(new Project(undefined, "Inbox", []));
    }
  }

  get projects() {return this.#projects.slice();}

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
      typeof project.id === "string" &&
      typeof project.name === "string" &&
      Array.isArray(project.todos)
    ) {
      projectInstance = new Project(project.id, project.name, project.todos, project.createdAt);
    } else {
      throw new Error("Parameter must be a plain obj with ID, name, and todos or an instance of Project");
    }

    const projectIndex = this.#projects.findIndex(item => String(item.id) === String(projectInstance.id));

    if (projectIndex !== -1) {
      this.#projects[projectIndex] = projectInstance;
    } else {
      this.#projects.push(projectInstance);
    }

    this.save();
  }

  removeProject(id) {
    const projectIndex = this.#projects.findIndex(item => String(item.id) === String(id));

    if (projectIndex !== -1) {
      this.#projects.splice(projectIndex, 1);
      this.save();
      return true;
    }

    return false;
  }

  findProjectById(id) {
    return this.#projects.find(item => String(item.id) === String(id)) || null;
  }

  findProjectByName(name) {
    if (typeof name !== "string") return null;

    const trimmedName = name.trim();
    return this.#projects.find(item => trimmedName === item.name) || null;
  }

  renameProject(id, newName) {
    if (typeof newName !== "string") return null;

    const trimmedName = newName.trim();
    const project = this.#projects.find(item => String(item.id) === String(id));

    if (project) {
      project.name = trimmedName;
      this.save();
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
    const projectsArray = Array.isArray(projectData.projects) ? projectData.projects : [];
    return new ProjectManager(projectsArray.map(project => Project.fromJSON(project)));
  }

  save() {
    const saveData = JSON.stringify(this.toJSON());
    localStorage.setItem("projects", saveData);
  }

  static load() {
    const loadData = localStorage.getItem("projects");

    if (!loadData) return new ProjectManager();

    const parsedData = JSON.parse(loadData);

    return ProjectManager.fromJSON(parsedData);
  }
}

export { ProjectManager };
