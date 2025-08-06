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

    this.#title = trimmedTitle.length === 0 ? "New Todo" : trimmedTitle;
  }

  set description(descriptionValue) {
    if (typeof descriptionValue !== "string") {
      throw new Error("Todo description must be a string");
    }

    const trimmedDescription = descriptionValue.trim();

    this.#description = trimmedDescription.length === 0 ? "" : trimmedDescription;
  }

  set dueDate(dateValue) {
    if (typeof dateValue === "string") {
      const trimmedDate = dateValue.trim();
      const dateObject = new Date(trimmedDate);

      if (!isNaN(dateObject.getTime())) {
        this.#dueDate = dateObject;
        return;
      }
    } else if (dateValue instanceof Date && !isNaN(dateValue.getTime())) {
      this.#dueDate = dateValue;
      return;
    } 
    
    throw new Error("Invalid Date instance");
  }

  set priority(priorityValue) {
    const allowedValues = ["low", "medium", "high"];

    if (typeof priorityValue !== "string") {
      throw new Error("Priority must be a string");
    }

    const trimmedPriority = priorityValue.trim().toLowerCase();

    for (let value of allowedValues) {
      if (allowedValues.includes(trimmedPriority)) {
        this.#priority = trimmedPriority;
        return;
      }
    }

    throw new Error("Priority must be low, medium or high");
  }

  set notes(notesValue) {
    if (typeof notesValue !== "string") {
      throw new Error("Notes must be a string");
    }

    const trimmedNotes = notesValue.trim();

    this.#notes = trimmedNotes.length === 0 ? "" : trimmedNotes;
  }

  set checklist(checklistValues) {
    this.#checklist = [];

    if (Array.isArray(checklistValues)) {
      for (let value of checklistValues) {
        const stringValue = String(value);
        const trimmed = stringValue.trim();
        this.#checklist.push(trimmed);
      }
    } else {
      throw new Error("Checklist must be an array");
    }
  }

  set completed(completedValue) {
    if (typeof completedValue !== "boolean") {
      throw new Error("Completed value must be a boolean");
    }

    this.#completed = completedValue;
  }

  addChecklistItem(item) {
    const stringItem = String(item);
    const trimmed = stringItem.trim();

    if (trimmed.length === 0) return null;

    return this.#checklist.push(trimmed);
  }
}

export { Todo };
