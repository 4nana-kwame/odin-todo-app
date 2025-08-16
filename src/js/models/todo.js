class Todo {

  constructor (title, description, dueDate, priority) {
    this.id = crypto.randomUUID();
    this.completed = false;
    this.title = title || "Untitled";
    this.description = description || "";
    this.dueDate = dueDate || new Date().toISOString().split("T")[0];
    this.priority = priority || "low";
  }

  updateDueDate(newDueDate) {
    this.dueDate = newDueDate || this.dueDate;
  }

  toggleCompleted() {
    this.completed = !this.completed;
    return this;
  }

  updatePriority(newPriority) {
    const allowed = ["low", "medium", "high"];
    this.priority = allowed.includes(newPriority) ? newPriority : this.priority;
  }
}
