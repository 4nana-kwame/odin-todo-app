class Todo {
  #id;
  #title;
  #description;
  #dueDate;
  #priority;
  #completed;

  constructor (
    title = "New todo",
    description = "",
    dueDate,
    priority = "low",
    completed = false,
  ) {
    this.#id = crypto.randomUUID();
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.completed = completed;
  }

  get id() { return this.#id; }

  get title() { return this.#title; }

  get description() { return this.#description; }

  get dueDate() { return this.#dueDate; }

  get priority() { return this.#priority; }

  get completed() { return this.#completed; }

  set title(titleValue) {
    if (typeof titleValue !== "string") {
      throw new Error("Todo title must be a string");
    }

    const trimmed = titleValue.trim();

    this.#title = trimmed.length === 0 ? "New Todo" : trimmed;
  }

  set description(descriptionValue) {
    if (typeof descriptionValue !== "string") {
      throw new Error("Todo description must be a string");
    }

    const trimmed = descriptionValue.trim();

    this.#description = trimmed.length === 0 ? "" : trimmed;
  }

  set dueDate(dateValue) {
    if (typeof dateValue === "string") {
      const trimmed = dateValue.trim();
      const dateObject = new Date(trimmed);

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

    const trimmed = priorityValue.trim().toLowerCase();

      if (allowedValues.includes(trimmed)) {
        this.#priority = trimmed;
        return;
    }

    throw new Error("Priority must be low, medium or high");
  }

  set completed(completedValue) {
    if (typeof completedValue !== "boolean") {
      throw new Error("Completed must be a boolean");
    }

    this.#completed = completedValue;
  }

  toggleTodoCompleted() {
    return this.#completed = !this.#completed;
  }

  toJSON() {
    return {
      id: this.#id,
      title: this.title,
      description: this.description,
      dueDate: this.dueDate?.toISOString(),
      priority: this.priority,
      completed: this.completed,
    };
  }

  static fromJSON(data) {
    const todo = new Todo(
      data.title,
      data.description,
      data.dueDate ? new Date(data.dueDate) : undefined,
      data.priority,
      data.completed
    );

    todo.#id = data.id;

    return todo;
  }
}

export { Todo };
