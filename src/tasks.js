let id = 0;
let allTasks = [];

class Task {
    constructor(name, priority, dueDate, notes, project, complete) {
        this.name = name;
        this.priority = priority;
        this._dueDate = new Date(dueDate);
        this.notes = notes;
        this._id = id;
        this.complete = false;
        this.project = project;
        this.complete = complete;
        id++;
        allTasks.push(this);
    }

    get dueDate() {
        return this._dueDate.toDateString();
    }

    set dueDate(value) {
        console.log('I AM SETTING THE DUEDATE');
        let date = new Date(value);
        let offset = date.getTimezoneOffset();
        date.setMinutes(offset);
        this._dueDate = date;
    }

    changeCompletion() {
        this.complete === false ? this.complete = true : this.complete = false;
    }
}

export { allTasks, Task };