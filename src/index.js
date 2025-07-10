import './style.css';

let id = 0;
let allTasks = [];

class Task {
    constructor(name, priority, dueDate, notes) {
        this.name = name;
        this.priority = priority;
        this._dueDate = new Date(dueDate);
        this.notes = notes;
        this._id = id;
        this.complete = false;
        id++;
        allTasks.push(this);
    }

    get dueDate() {
        return this._dueDate.toDateString();
    }

    set dueDate(value) {
        this._dueDate = new Date(value);
    }

    changeCompletion() {
        this.complete === false ? this.complete = true : this.complete = false;
    }
}

function deleteTask(idOfTask) {
    let index = findIndexOfTask(idOfTask);
    allTasks.splice(index, 1);
}

function findIndexOfTask(idOfTask) {
    let chosenTask;
    for (let task of allTasks) {
        if (idOfTask === task._id) {
            chosenTask = task;
        }
    }
    return allTasks.indexOf(chosenTask);
}

function seeCompleted() {
    let completed = [];
    for (let task of allTasks) {
        if (task.complete === true) {
            completed.push(task);
        }
    }
    console.log(completed);
}

function seeUncompleted() {
    let uncompleted = [];
    for (let task of allTasks) {
        if (task.complete === false) {
            uncompleted.push(task)
        }
    }
    console.log(uncompleted);
}

new Task('Clean Bedroom', 2, '7/27/25', 'needs to be done');
new Task('Wash Dishes', 3, '7/27/25', '');

console.log(allTasks);

allTasks[0].changeCompletion();


seeCompleted();
seeUncompleted();


