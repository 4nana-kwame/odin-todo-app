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

  renameProject(id, newName) {
    const project = this.#projects.find(item => item.id === id);
    if (!project) return null;

    if (project.name === "Inbox") return null;

    project.name = newName;
    return newName;
  }

  getDefaultProject() {
    const defaultProject = this.#projects.find(item => item.name === "Inbox");
    if (defaultProject) return defaultProject;

    const createDefault = new Project("Inbox", []);
    this.#projects.push(createDefault);
    return createDefault;
  }

  getProjectById(id) {
    const project = this.#projects.find(item => item.id === id);
    if (!project) return null;
    
    return project;
  }

  getprojectByName(name) {
    if (typeof name !== "string") return null;

    const trimmedName = name.trim();
    const project = this.#projects.find(item => item.name === trimmedName);
    if(!project) return null;

    return project;
  }

  toJSON() {
    return {
      projects: this.#projects.map(project => project.toJSON())
    };
  }

  static fromJSON(projectData) {
    if (!projectData || typeof projectData !== "object") {
      return new ProjectManager();
    }
    
    const projectsArray = Array.isArray(projectData.projects) ? 
    projectData.projects.map(project => Project.fromJSON(project)) : [];

    return new ProjectManager(projectsArray)
  }

  save() {
    const data = this.toJSON();
    const dataString = JSON.stringify(data);

    localStorage.setItem("projects", dataString);
  }

  load() {
    const retrieved = localStorage.getItem("projects");
    
    if (!retrieved) {
      return new ProjectManager();
    }

    const parsed = JSON.parse(retrieved);
    
    return ProjectManager.fromJSON(parsed);
  }
}

export { ProjectManager };
