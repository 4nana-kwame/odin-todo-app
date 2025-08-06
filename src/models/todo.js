class Todo {
  #id;
  #title;
  #description;
  #dueDate;
  #priority;
  #notes
  #checklist;
  #completed;
  #createdAt;

  constructor (
    title = "New todo",
    description = "",
    dueDate,
    priority = "low",
    notes = "",
    checklist = [],
    completed = false,
  ) {
    this.#id = crypto.randomUUID();
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.notes = notes;
    this.checklist = checklist;
    this.completed = completed;
    this.#createdAt = new Date();
  }
}
