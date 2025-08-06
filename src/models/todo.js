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

  get id() { return this.#id; }

  get title() { return this.#title; }

  get description() { return this.#description; }

  get dueDate() { return this.#dueDate; }

  get priority() { return this.#priority; }

  get notes() { return this.#notes; }

  get checklist() { return this.#checklist.slice(); }

  get completed() { return this.#completed; }

  get createdAt() { return this.#createdAt; }
}
