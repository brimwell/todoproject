// INDEX.JS

import './style.css';
import { createNewToDo, allToDoList } from './todoitem.js';
import { listOfAllProjects, deleteAProject, createNewProject } from './projects.js';




// TEST SECTION



createNewToDo('Call Mom', '2/26/2025', 1, '', 'InBox');
createNewToDo('Take Coding Test', '', 2, 'I technically have until July but would like to speed things up a bit here', 'InBox');
createNewToDo('Work Out', '2/25/25', 4, 'I may need to punt this to next week if things pick up. Keeping here just in case as a low priority.', 'InBox');




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

    chosenProject.updateList();

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
        completeBox.setAttribute('data-id', item.id);
        if (item.complete === true) {
            completeBox.classList.add('completed');
        }
        listItem.appendChild(completeContainer);

        // Create Edit Button
        const editBtn = document.createElement('button');
        editBtn.classList.add('editbtn');
        editBtn.textContent = 'Edit a field';
        editBtn.setAttribute('data-id', item.id);
        listItem.appendChild(editBtn);

        // Create Delete Button
        const deleteBtn = document.createElement('button');
        deleteBtn.classList.add('deletbtn');
        deleteBtn.textContent = 'Delete To-Do';
        deleteBtn.setAttribute('data-id', item.id);
        listItem.appendChild(deleteBtn);

        listContainer.appendChild(listItem);


        // Mark Complete Functionality
        
        completeBox.addEventListener('click', function() {
            let chosenItem;
            for (let item of allToDoList) {
                if (event.target.getAttribute('data-id') === item.id) {
                    item.changeCompletion();
                    event.target.classList.contains('completed') ? event.target.classList.remove('completed') : event.target.classList.add('completed');
                }
            }
        })

        // Edit Btn Functionality
        editBtn.addEventListener('click', function() {
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

            let newToDoName = document.querySelector('#todoname');
            let newToDoDate = document.querySelector('#tododate');
            let newToDoPriority = document.querySelector('#todopriority');
            let newToDoNotes = document.querySelector('#todonotes');
            let newToDoProject = document.querySelector('#todoproject');

            console.log(item._dueDate);
            console.log(item.dueDate);
            newToDoName.value = item.title;
            newToDoDate.value = item._dueDate;
            newToDoPriority.value = item.priority;
            newToDoNotes.value = item.notes;
            newToDoProject.value = item.projectTag;


            // Work Submit Button
            const submitToDoBtn = document.querySelector('#submittodo');
            submitToDoBtn.addEventListener('click', function() {
                event.preventDefault();

                item.title = newToDoName.value;
                item.dueDate = newToDoDate.value;
                item.priority = newToDoPriority.value;
                item.notes = newToDoNotes.value;
                item.projectTag = newToDoProject.value;


                newToDoName.value = '';
                newToDoDate.value = '';
                newToDoPriority.value = '1';
                newToDoNotes.value = '';
                newToDoProject.value = 'InBox';

                newToDoForm.classList.add('hidden');

            })
        })

        // Delete ToDo Functionality
        deleteBtn.addEventListener('click', function() {
            for (let i = 0; i < allToDoList.length; i++) {
                if (event.target.getAttribute('data-id') === allToDoList[i].id) {
                    allToDoList[i].deleteToDo();
                }
            }
        })
    }

    container.appendChild(listContainer);

}


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
        btn.addEventListener('click', function() {
            displayList(btn.id);
        })
    }
}

activateBtns();

// 'Create ToDo and Create Project Buttons
// These may be able to live statically in the html doc
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
        createNewProject(newProjectName.value);

        createProjectBtns();
        activateBtns();

        newProjectName.value = '';
        newProjectForm.classList.add('hidden');
    })
})


// PROJECTS.JS

import { allToDoList } from "./todoitem";

// PROJECT CREATION AND ALTERATION

class Project {
    constructor(title) {
        this.title = title;
        this.list = [];
        listOfAllProjects.push(this);
    }

    get title() {
        return this._title;
    }

    set title(value) {
        for (let project of listOfAllProjects) {
            if (value === project.title) {
                console.log('This project name is taken, try again - project names must be unique.');
                return;
            }
        }
        this._title = value;
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

    updateList() {
        this.list = [];
        for (let item of allToDoList) {
            if (item.projectTag === this.title) {
                this.list.push(item);
            }
        }
    };
}

function createNewProject(title){
    new Project(title);
}

const listOfAllProjects = [];

createNewProject('InBox');
createNewProject('Test List');

// let inBox = new Project('InBox');
// new Project('Test List');

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


export { listOfAllProjects, deleteAProject, createNewProject };


// TODOITEM.JS

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

    deleteToDo() {

        for (let i = 0; i < allToDoList.length; i++) {
            if (this.id === allToDoList[i].id) {
                allToDoList.splice(i, 1);
                return;
            }
        }
    }
}

const allToDoList = [];

function createNewToDo(title, dueDate, priority, notes, projectTag) {
    let newItem = new ToDoItem(title, dueDate, priority, notes, projectTag);
   
   allToDoList.push(newItem);
}

export { createNewToDo, allToDoList };