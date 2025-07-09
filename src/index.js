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




// DISPLAY THINGS
function displayList(projectName) {
    const container = document.querySelector('.container');
    container.textContent = '';

    let chosenProject;
    for (let project of listOfAllProjects) {
        if (project.title === projectName) {
            chosenProject = project;
        }
    }

    const listTitle = document.createElement('h2');
    listTitle.textContent = chosenProject.title;
    container.appendChild(listTitle);

    const listContainer = document.createElement('div');
    for (let item of chosenProject.list) {
        const listItem = document.createElement('div');
        listItem.classList.add('todoitem');
        listItem.setAttribute('data-id', item.id);

        const itemTitle = document.createElement('h3');
        itemTitle.textContent = item.title;
        listItem.appendChild(itemTitle);

        const itemNotes = document.createElement('p');
        itemNotes.textContent = item.notes;
        listItem.appendChild(itemNotes);

        const itemDueDate = document.createElement('p');
        itemDueDate.textContent = item._dueDate.toDateString();
        if (itemDueDate.textContent === 'Invalid Date') {
            itemDueDate.textContent = 'No due date';
        }
        listItem.appendChild(itemDueDate);

        let priorityLevel = 'priority' + item.priority;
        listItem.classList.add(priorityLevel);

        // Create ability to mark complete
        const completeContainer = document.createElement('div');
        const completeBox = document.createElement('div');
        completeBox.classList.add('completebox');
        const completeText = document.createElement('p');
        completeText.classList.add('inlinep');
        completeText.textContent = 'Complete?';
        completeContainer.appendChild(completeBox);
        completeContainer.appendChild(completeText);

        listItem.appendChild(completeContainer);

        listContainer.appendChild(listItem);


        // Mark Complete Functionality??
        
        completeBox.addEventListener('click', function() {
            console.log(event.target.parentElement.parentElement);
        })
    }

    container.appendChild(listContainer);

}
// displayList('InBox');

// Mark Complete Functionality
// const completeBox = document.querySelector('.completebox');
// completeBox.addEventListener('click', function() {

// })






// PROJECT SWITCHER

function createProjectBtns() {
    const projectTab = document.querySelector('.projecttab');
    projectTab.textContent = '';

    for (let project of listOfAllProjects) {
        let switcher = document.createElement('button');
        switcher.classList.add('switcherbtn');
        switcher.textContent = project.title;
        switcher.id = project.title;

        projectTab.appendChild(switcher);
    }
}
createProjectBtns();

// Project Switcher Functionality

function activateBtns() {
    const projectBtns = document.querySelectorAll('.switcherbtn');

    for (let btn of projectBtns) {
        let tempTitle = btn.id;
        
        btn.addEventListener('click', function() {
            displayList(tempTitle);
        })
    }
}

activateBtns();

// 'Create ToDo and Create Project Buttons
const createContainer = document.querySelector('.creation');

const createItemBtn = document.createElement('button');
createItemBtn.classList.add('createitembtn');
createItemBtn.classList.add('creationbtn');
createItemBtn.textContent = 'Add a To-Do';
createContainer.appendChild(createItemBtn);

const createProjectBtn = document.createElement('button');
createProjectBtn.classList.add('createprojectbtn');
createProjectBtn.classList.add('creationbtn');
createProjectBtn.textContent = 'Add a New Project';
createContainer.appendChild(createProjectBtn);

// Create ToDo Functionality

createItemBtn.addEventListener('click', function() {
    const newToDoForm = document.querySelector('.newtodoform');
    newToDoForm.classList.remove('hidden');

    const projectSelector = document.querySelector('#todoproject');
    projectSelector.textContent = '';
    
    for (let project of listOfAllProjects) {
        let newProjectChoice = document.createElement('option');
        newProjectChoice.value = project.title;
        newProjectChoice.textContent = project.title;
        projectSelector.appendChild(newProjectChoice);    
    }

    // Work Submit Button
    const submitToDoBtn = document.querySelector('#submittodo');
    submitToDoBtn.addEventListener('click', function() {
        event.preventDefault();
        let newToDoName = document.querySelector('#todoname');
        let newToDoDate = document.querySelector('#tododate');
        let newToDoPriority = document.querySelector('#todopriority');
        let newToDoNotes = document.querySelector('#todonotes');
        let newToDoProject = document.querySelector('#todoproject');

        createNewToDo(newToDoName.value, newToDoDate.value, newToDoPriority.value, newToDoNotes.value, newToDoProject.value);

        newToDoName.value = '';
        newToDoDate.value = '';
        newToDoPriority.value = '1';
        newToDoNotes.value = '';
        newToDoProject.value = 'InBox';

        newToDoForm.classList.add('hidden');

    })
})

createProjectBtn.addEventListener('click', function() {
    const newProjectForm = document.querySelector('.newprojectform');
    newProjectForm.classList.remove('hidden');

    const submitProjectBtn = document.querySelector('#submitproject');
    submitProjectBtn.addEventListener('click', function() {
        event.preventDefault();
        
        let newProjectName = document.querySelector('#projectname');
        let newProject = new Project(newProjectName.value);

        createProjectBtns();
        activateBtns();

        newProjectName.value = '';
        newProjectForm.classList.add('hidden');
    })
})


// Checkbox Work
let checkBox = document.querySelector('.checkbox');

checkBox.addEventListener('click', function() {
    checkBox.classList.contains('checked') ? checkBox.classList.remove('checked') : checkBox.classList.add('checked');
    // checkBox.classList.add('checked');
})














