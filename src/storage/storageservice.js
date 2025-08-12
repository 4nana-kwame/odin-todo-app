class StorageService {
  #storageKey;

  constructor (storageKey = "todoAppData") {
    this.#storageKey = storageKey;
  }

  get storageKey() {
    return this.#storageKey;
  }

  save(data) {
    try {
      if (!this.#validateData(data)) {
        throw new Error("Invalid data format for storage");
      }

      const jsonString = JSON.stringify(data);
      localStorage.setItem(this.#storageKey, jsonString);
      return true;
    } catch (error) {
      console.error("Failed to save data:", error);
      throw error;
    }
  }

  load() {
    try {
      const jsonString = localStorage.getItem(this.#storageKey);
      if (jsonString === null) return null;

      const parsed = JSON.parse(jsonString);

      if (!this.#validateData(parsed)) {
        throw new Error("Loaded data failed validation");
      }
      
      return parsed;
    } catch (error) {
      console.error("Storage load failed:", error);
      throw error;
    }
  }

  clear() {
    try {
      localStorage.removeItem(this.#storageKey);
    } catch (error) {
      console.error("Failed to clear storage", error);
      throw error;
    }
  }

  #validateData(data) {
    if (!Array.isArray(data)) return false;

    return data.every(item => {
      const isValidProject = 
        typeof item?.id === "string" &&
        typeof item?.name === "string" &&
        Array.isArray(item.todos) &&
        item.todos.every(todo => 
          typeof todo?.id === "string" &&
          typeof todo?.title === "string"
        );

        return isValidProject && isValidTodos;
    });
  }
}

export { StorageService };
