class Todo {
  constructor(id, title, description = "", dueDate, priority = "low", notes = "", checklist, completed, createdAt) {
    const allowed = ["low", "medium", "high"];

    this.id = id || crypto.randomUUID();

    if (title) {
      let trimTitle = title.trim();
      this.title = trimTitle.length === 0 ? "Untitled" : trimTitle;
    } else {
      this.title = "Untitled";
    }

    this.description = description;

   
    if (typeof dueDate === "string") {
      const trimDueDate = dueDate.trim();
      if (trimDueDate.length === 0) {
        this.dueDate = null;
      } else {
        const tempDate = new Date(trimDueDate);
        this.dueDate = !isNaN(tempDate.getTime()) ? tempDate : null;
      }
    } else if (Object.prototype.toString.call(dueDate) === "[object Date]") {
      this.dueDate = !isNaN(dueDate.getTime()) ? dueDate : null;
    } else {
      this.dueDate = null;
    }

    this.priority = allowed.includes(priority) ? priority : "low";

    this.notes = notes;
    this.checklist = Array.isArray(checklist) ? checklist : [];
    this.completed = completed !== undefined ? completed : false;
    this.createdAt = createdAt || new Date();
  }
}
