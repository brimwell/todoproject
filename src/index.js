import './style.css';
import { createNewToDo, allToDoList } from './todoitem.js';
import { listOfAllProjects, deleteAProject } from './projects.js';




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

        listItem.appendChild(completeContainer);

        listContainer.appendChild(listItem);


        // Mark Complete Functionality??
        
        completeBox.addEventListener('click', function() {
            let dataID = event.target.parentElement.parentElement.getAttribute('data-id');
            let chosenItem;
            for (let project of listOfAllProjects) {
                if (project.title === chosenProject.title) {
                    for (let item of project.list) {
                        if (item.id === dataID) {
                            item.complete === false ? item.complete = true : item.complete = false;
                            console.log(item);
                        }
                        // THE ABOVE CHANGES COMPLETION ON ITEM< BUT NOT VISUALLY...
                    }
                }
            }

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


allToDoList[1].dueDate = '7/7/25';
allToDoList[2].changeCompletion();
allToDoList[0].title = 'I am a new todo!';
console.log(allToDoList);

console.log(listOfAllProjects[0]);
listOfAllProjects[0].updateList();
console.log(listOfAllProjects[0]);














