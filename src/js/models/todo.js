class Todo {

  constructor (title, description, dueDate, priority) {
    this.id = crypto.randomUUID();
    this.completed = false;
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
  }

  toggleCompleted() {
    return this.completed = !this.completed;
  }
}
