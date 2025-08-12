import { ProjectManager } from "../src/services/projectmanager.js";

class ProjectList {
  #projectManager;
  #activateProjectId = null;

  constructor (projectManager) {
    this.#projectManager = projectManager;
  }
}
