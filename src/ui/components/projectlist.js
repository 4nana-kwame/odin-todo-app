import { ProjectManager } from "../services/projectmanager.js";

class ProjectList {
  #projectManager;
  #activateProjectId = null;

  constructor (projectManager) {
    this.#projectManager = projectManager;
  }

  render() {}

  setActivateProject() {}

  bindEvents() {}
}
