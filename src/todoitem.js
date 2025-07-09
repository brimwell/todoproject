// ITEM CREATION AND ALTERATION
class ToDoItem {
    constructor(title, dueDate, priority, notes, projectTag) {
        this.title = title;
        this.dueDate = new Date(dueDate);
        this.priority = priority;
        this.notes = notes;
        this.projectTag = projectTag;
        this.complete = false;
        this.id = crypto.randomUUID();
        this.timeStamp = Date.now();
    }

    set dueDate(value) {
        this._dueDate = new Date(value);
    }

    assignToProject(projectName) {
        for (let project of listOfAllProjects) {
            if (this.projectTag === project.title) {
                project.removeFromList(this);
                this.projectTag = '';
            }
        }
        for (let project of listOfAllProjects) {
            if (projectName === project.title) {
              project.addToList(this);
              this.projectTag = projectName;
              return;
            }
            }
        }

    changeCompletion() {
        this.complete === false ? this.complete = true : this.complete = false;
    }
}

const allToDoList = [];

function createNewToDo(title, dueDate, priority, notes, projectTag) {
    let newItem = new ToDoItem(title, dueDate, priority, notes, projectTag);
   
   allToDoList.push(newItem);

}

export { createNewToDo, allToDoList };