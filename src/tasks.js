let id = 0;
let allTasks = [];

class Task {
    constructor(name, priority, dueDate, notes, project) {
        this.name = name;
        this.priority = priority;
        this._dueDate = new Date(dueDate);
        this.notes = notes;
        this._id = id;
        this.complete = false;
        this.project = project;
        id++;
        allTasks.push(this);
    }

    get dueDate() {
        return this._dueDate.toDateString();
    }

    set dueDate(value) {
        let date = new Date(value);
        let offset = date.getTimezoneOffset();
        date.setMinutes(offset);
        this._dueDate = date;
    }

    changeCompletion() {
        this.complete === false ? this.complete = true : this.complete = false;
    }
}

new Task('Clean Bedroom', 2, '7/27/25', 'needs to be done');
new Task('Wash Dishes', 3, '7/27/25', '');
new Task('Buy birthday card for Dad', 1, '7/11/25', 'I need to send this out today if I want it to get there by his birthday.');
new Task('Call Jerry about job', 2, '7/15/25', 'Good lead, possibly');
new Task('Fix the PS5 controller', 4, '7/31/25', 'for Billys birthday');

allTasks[0].changeCompletion();

allTasks[0].project = 'Test One';
allTasks[1].project = 'Work';
allTasks[2].project = 'Home';

export { allTasks, Task };