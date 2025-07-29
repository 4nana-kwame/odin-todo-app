class Todo {
  #id;
  #title;
  #description;
  #dueDate;
  #priority;
  #notes;
  #checklist;
  #completed;
  #createdAt

  constructor(id, title, description = "", dueDate, priority = "low", notes = "", checklist, completed, createdAt) {
      this.#id = id || crypto.randomUUID();

    if (title) {
      const trimTitle = title.trim();

      this.#title = trimTitle.length === 0 ? "Untitled" : trimTitle;
    } else {
      this.#title = "Untitled";
    }

    this.#description = typeof description === "string" ? description.trim() : "";

    if (typeof dueDate === "string") {
      const trimDueDate = dueDate.trim();

      if (trimDueDate.length === 0) {
        this.#dueDate = null;
      } else {
        const tempDate = new Date(trimDueDate);

        this.#dueDate = !isNaN(tempDate.getTime()) ? tempDate : null;
      }
    } else if (Object.prototype.toString.call(dueDate) === "[object Date]") {
      this.#dueDate = !isNaN(dueDate.getTime()) ? dueDate : null;
    } else {
      this.#dueDate = null;
    }

    const allowedValues = ["low", "medium", "high"];
    const trimPriority = typeof priority === "string" ? priority.trim() : "";
    this.#priority = allowedValues.includes(trimPriority) ? trimPriority : "low";

    this.#notes = typeof notes === "string" ? notes.trim() : "";

    this.#checklist = [];

    if (Array.isArray(checklist)) {
      checklist.forEach(value => this.#addChecklistInstance(value));
    }

    this.#completed = typeof completed === "boolean" ? completed : false;

    this.#createdAt = createdAt || new Date();
  }

  #addChecklistInstance(listItem) {
    if (typeof listItem === "string") {
      const trimmedListItem = listItem.trim();
      this.#checklist.push({
        id: crypto.randomUUID(),
        text: trimmedListItem.length === 0 ? "" : trimmedListItem,
        done: false
      });
      return true;
    } else if (typeof listItem === "object" && listItem !== null) {
      if (
        typeof listItem.id === "string" &&
        typeof listItem.text === "string" &&
        typeof listItem.done === "boolean"
      ) {
        this.#checklist.push(listItem);
        return true;
      }
    }

    return false;
  }

  get id() {return this.#id;}

  get title() {return this.#title;}

  get description() {return this.#description;}

  get dueDate() {return this.#dueDate;}

  get priority() {return this.#priority;}

  get notes() {return this.#notes;}

  get checklist() {return this.#checklist.slice();}

  get completed() {return this.#completed;}

  get createdAt() {return this.#createdAt;}

  set title(newTitle) {
    if (newTitle) {
      const trimNewTitle = newTitle.trim();

      this.#title = trimNewTitle.length === 0 ? "Untitled" : trimNewTitle;
    } else {
      this.#title = "Untitled";
    }
  }

  set description(newDescription = "") {
    this.#description = typeof newDescription === "string" ? newDescription.trim() : "";
  }

  set dueDate(newDueDate) {
    if (typeof newDueDate === "string") {
      const trimNewDueDate = newDueDate.trim();

      if (trimNewDueDate.length === 0) {
        this.#dueDate = null;
      } else {
        const newTempDate = new Date(trimNewDueDate);

        this.#dueDate = !isNaN(newTempDate.getTime()) ? newTempDate : null;
      }
    } else if (Object.prototype.toString.call(newDueDate) === "[object Date]") {
      this.#dueDate = !isNaN(newDueDate.getTime()) ? newDueDate : null;
    } else {
      this.#dueDate = null;
    }
  }

  set priority(newPriority) {
    const newAllowedValues = ["low", "medium", "high"];
    const newTrimPriority = typeof newPriority === "string" ? newPriority.trim() : "";

    this.#priority = newAllowedValues.includes(newTrimPriority) ? newTrimPriority : "low";
  }

  set notes(newNotes) {
    this.#notes = typeof newNotes === "string" ? newNotes.trim() : "";
  }

  set checklist(newChecklist) {
    this.#checklist = [];

    if (Array.isArray(newChecklist)) {
      newChecklist.forEach(newValue => this.#addChecklistInstance(newValue));
    }
  }

  set completed(newCompleted) {
    this.#completed = typeof newCompleted === "boolean" ? newCompleted : false;
  }

  addChecklist(listItem) {
    this.#addChecklistInstance(listItem);
    return true;
  }

  removeChecklist(id) {
    const listItemIndex = this.#checklist.findIndex(item => String(item.id) === String(id));
    
    if (listItemIndex !== -1) {
      return this.#checklist.splice(listItemIndex, 1);
    }

    return false;
  }

  toJSON() {
    return {
      id: this.#id,
      title: this.#title,
      description: this.#description,
      dueDate: this.#dueDate ? this.#dueDate.toISOString() : null,
      priority: this.#priority,
      notes: this.#notes,
      checklist: this.#checklist,
      completed: this.#completed,
      createdAt: this.#createdAt.toISOString()
    };
  }

  static fromJSON(data) {
    return new Todo (
      data.id,
      data.title,
      data.description,
      data.dueDate ? new Date(data.dueDate) : null,
      data.priority,
      data.notes,
      data.checklist,
      data.completed,
      data.createdAt ? new Date(data.createdAt) : null
    );
  }
}

export { Todo };
