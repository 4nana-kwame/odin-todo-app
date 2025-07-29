import { ProjectManager } from "./projectManager.js";

class TodoManager {
  #projectManager;

  constructor (projectManager) {
    if (projectManager instanceof ProjectManager) {
      this.#projectManager = projectManager;
    } else {
      throw new Error("Invalid projectManager instance");
    }
  }
}
