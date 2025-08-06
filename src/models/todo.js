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

  set title(titleValue) {
    if (typeof titleValue !== "string") {
      throw new Error("Todo title must be a string");
    }

    const trimmedTitle = titleValue.trim();

    return this.#title = trimmedTitle.length === 0 ? "New Todo" : trimmedTitle;
  }

  set description(descriptionValue) {
    if (typeof descriptionValue !== "string") {
      throw new Error("Todo description must be a string");
    }

    const trimmedDescription = descriptionValue.trim();

    return this.#description = trimmedDescription.length === 0 ? "" : trimmedDescription;
  }

  set dueDate(dateValue) {
    if (typeof dateValue === "string") {
      const trimDate = dateValue.trim();
      const dateObject = new Date(trimDate);

      if (!dateObject) {
        throw new Error("Invalid date instance");
      }

      return this.#dueDate = dateObject;
    } else if (dateValue instanceof Date) {
      return this.#dueDate = dateValue;
    } else {
      throw new Error("Invalid date instance");
    }
  }

  set priority(priorityValue) {
    const allowedValues = ["low", "medium", "high"];

    if (typeof priorityValue !== "string") {
      throw new Error("Priority must be a string");
    }

    const trimmedPriority = priorityValue.trim().toLowerCase();

    for (let value of allowedValues) {
      if (value === trimmedPriority) {
        return this.#priority = trimmedPriority;
      } else {
        throw new Error("Priority must be low, medium or high");
      }
    }
  }

  set notes(notesValue) {
    if (typeof notesValue !== "string") {
      throw new Error("Notes must be a string");
    }

    const trimmedNotes = notesValue.trim();

    return this.#notes = trimmedNotes.length === 0 ? "" : trimmedNotes;
  }
}
