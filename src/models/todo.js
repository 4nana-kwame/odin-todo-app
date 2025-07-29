import { ChecklistItem } from "./checklistitem.js";

class Todo {
  _id;
  #title;
  #description;
  #dueDate;
  #priority;
  #notes;
  #checklist;
  #completed;
  #createdAt

  constructor (
    title = "Untitled",
    description = "",
    dueDate = null,
    priority = "low",
    notes = "",
    checklist = [],
    completed = false,
    createdAt = null
  ) {
    this._id = crypto.randomUUID();
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.notes = notes;
    this.checklist = checklist;
    this.completed = completed,
    this.createdAt = createdAt instanceof Date && !isNaN(createdAt.getTime()) ? createdAt : new Date();
  } 

  get id() { return this._id; }

  get title() { return this.#title; }

  get description() { return this.#description; }

  get dueDate() { return this.#dueDate; }

  get priority() { return this.#priority; }

  get notes() { return this.#notes; }

  get checklist() { return this.#checklist.slice(); }

  get completed() { return this.#completed; }

  get createdAt() { return this.#createdAt; }

  set title(newTitle) {
    if (typeof newTitle === "string") {
      const trimmedtitle = newTitle.trim();
      this.#title = trimmedtitle.length === 0 ? "Untitled" : trimmedtitle;
    } else {
      this.#title = "Untitled";
    }
  }

  set description(newDescription) {
    this.#description = typeof newDescription === "string" ? newDescription.trim() : "";
  }

  set dueDate(newDate) {
    if (typeof newDate === "string") {
      const trimmedDate = newDate.trim();

      if (!trimmedDate) {
        this.#dueDate = null;
      } else {
        const parsed = new Date(trimmedDate);
        this.#dueDate = !isNaN(parsed.getTime()) ? parsed : null;
      }
    } else if (newDate instanceof Date && !isNaN(newDate.getTime())) {
      this.#dueDate = newDate;
    } else {
      this.#dueDate = null;
    }
  }

  set priority(newPriority) {
    const allowedValues = ["low", "medium", "high"];
    const trimPriority = typeof newPriority === "string" ? newPriority.trim() : "";
    this.#priority = allowedValues.includes(trimPriority) ? trimPriority : "low";
  }

  set notes(newNotes) {
    this.#notes = typeof newNotes === "string" ? newNotes.trim() : "";
  }

  set checklist(newChecklist) {
    this.#checklist = [];

    if (Array.isArray(newChecklist)) {
      newChecklist.forEach(item => {
        if (item instanceof ChecklistItem) {
          this.#checklist.push(item);
        } else if (typeof item === "object" && item !== null) {
          const restored = ChecklistItem.fromJSON(item);
          if (restored) this.#checklist.push(restored);
        } else if (typeof item === "string") {
          this.#checklist.push(new ChecklistItem(item));
        }
      });
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

  toggleChecklistDone(id) {
    const listItem = this.#checklist.find(item => String(item.id) === String(id));

    if (listItem) {
      return listItem.done = !listItem.done;
    }

    return false;
  }

  toggleTodoCompleted() {
    return this.#completed = !this.#completed;
  }

  toJSON() {
    return {
      id: this._id,
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
