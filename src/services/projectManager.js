import { Project } from "../models/project.js";

class ProjectManager {
  #projects;

  constructor (projects) {
    this.projects = projects;
  }
}

export { ProjectManager };
