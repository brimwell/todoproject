import './style.css';


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

    showItem() {
        console.log(`The task ${this.title} is due on ${this.dueDate.toDateString()} and has a priority level of ${this.priority}.  It also has the following notes: "${this.notes}"`);
    }

    changeCompletion() {
        this.complete === false ? this.complete = true : this.complete = false;
    }
}

function createNewToDo(title, dueDate, priority, notes, projectTag) {
    if (title === undefined || title === '') {
            console.log('No item created');
            return;
        }
    if (projectTag === undefined || projectTag === '') {
        projectTag = 'InBox';
    }
    if (priority === undefined || priority === '') {
        priority = 4;
    }
  
    let newItem = new ToDoItem(title, dueDate, priority, notes, projectTag);
   
    for (let project of listOfAllProjects) {
        if (newItem.projectTag === project.title) {
            project.list.push(newItem);
            return;
        }
    }
    // Covers if projecttag input is not an existing list
    inBox.addToList(newItem);
}

// PROJECT CREATION AND ALTERATION
// Should this be its own module? I have zero idea what I am doing here

const listOfAllProjects = [];

function deleteAProject (projectTitle) {
    for (let i = 0; i < listOfAllProjects.length; i++) {
        if (projectTitle === listOfAllProjects[i].title) {
            for (let j = 0; j < listOfAllProjects[i].list.length; j++) {
                listOfAllProjects[i].list[j].assignToProject('InBox');
                j--;
            }

            let index = listOfAllProjects.findIndex(thing => thing.title === listOfAllProjects[i].title);
            listOfAllProjects.splice(index, 1);
        }
    }

}

class Project {
    constructor(title) {
        this.title = title;
        this.list = [];
        listOfAllProjects.push(this);
    }

    addToList(item) {
        this.list.push(item);
    }

    removeFromList(item) {
        for (let i = 0; i < this.list.length; i++) {
            if (item.id === this.list[i].id) {
                this.list.splice([i], 1);
            }
        }
    }
}


// TEST SECTION
let inBox = new Project('InBox');
new Project('Test List');


createNewToDo('Call Mom', '2/26/2025', 1, '');
createNewToDo('Take Coding Test', '', 2, 'I technically have until July but would like to speed things up a bit here');
createNewToDo('Work Out', '2/25/25', '', 'I may need to punt this to next week if things pick up. Keeping here just in case as a low priority.');




console.log(inBox);
console.log(listOfAllProjects[1]);

inBox.list[1].assignToProject('Test List');
inBox.list[1].assignToProject('Test List');




deleteAProject('Test List');

console.log(listOfAllProjects);











