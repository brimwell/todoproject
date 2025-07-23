import './style.css';
import { allTasks, Task } from './tasks';


//  ON PAGE LOAD -- TEST ONLY
let allLists = ['Test One', 'Work', 'Home'];

// SIDENAV OPEN AND CLOSE FUNCTIONS
    // ON PAGE LOAD
function activateNavBtn() {
    const navOpenBtn = document.querySelector('.opennavbtn');
    navOpenBtn.addEventListener('click', openNav)
}

function openNav() {
    document.querySelector('.sidenav').style.width = '250px';
    document.querySelector('#main').style.marginLeft = '250px';
    populateSidebar();
}

function closeNav() {
    document.querySelector('.sidenav').style.width = '0';
    document.querySelector('#main').style.marginLeft = '0';
}

// SIDENAV MENU POPULATION
function populateSidebar() {
    let listContainer = document.querySelector('.createdprojectlist');
    listContainer.textContent = '';

    for (let list of allLists) {
        let listBtn = document.createElement('p');
        listBtn.classList.add('listbutton');
        listBtn.textContent = list;
        listBtn.id = list;

        listContainer.appendChild(listBtn);

        listBtn.addEventListener('click', function() {
            showList(event.target.id);
        })
    }
    const seeAllBtn = document.querySelector('#all');
    seeAllBtn.addEventListener('click', function() {
        showList();
    })

    const navCloseBtn = document.querySelector('.closenavbtn');
    navCloseBtn.addEventListener('click', closeNav);

    const createListBtn = document.querySelector('.createlistbtn');
    createListBtn.addEventListener('click', createNewList);

    const deleteListBtn = document.querySelector('.deletelistbtn');
    deleteListBtn.addEventListener('click', chooseListToDelete);
}

// SIDENAV LIST EDITING
function createNewList() {
    const formContainer = document.querySelector('.formcontainer');
    formContainer.style.display = 'block';  
    formContainer.textContent = '';   

    const newForm = document.createElement('form');

    const formFieldSet = document.createElement('fieldset');

    const formLegend = document.createElement('legend');
    formLegend.textContent = 'Add a New List';
    formFieldSet.appendChild(formLegend);

    const formMain = document.createElement('div');
    formMain.classList.add('formmain');

    const nameLabel = document.createElement('label');
    nameLabel.textContent = 'List Name: ';
    nameLabel.setAttribute('for', 'listname');
    formMain.appendChild(nameLabel);

    const nameInput = document.createElement('input');
    nameInput.setAttribute('type', 'text');
    nameInput.id = 'listname';
    nameInput.setAttribute('name', 'listname');
    formMain.appendChild(nameInput);

    formFieldSet.appendChild(formMain);

    const submitBtn = document.createElement('button');
    submitBtn.classList.add('submitformbtn');
    submitBtn.textContent = 'Create It!'
    formFieldSet.appendChild(submitBtn);
    
    const cancelBtn = document.createElement('button');
    cancelBtn.classList.add('cancelformbtn');
    cancelBtn.textContent = 'Cancel';
    formFieldSet.appendChild(cancelBtn);
    
    newForm.appendChild(formFieldSet);

    formContainer.appendChild(newForm);


    submitBtn.addEventListener('click', function() {
        event.preventDefault();

        allLists.push(nameInput.value);

        formContainer.textContent = '';
        formContainer.style.display = 'none'; 

        populateSidebar();
        pushToStorage();
        displayStorage();
    })

    const cancelFormBtn = document.querySelector('.cancelformbtn');
    cancelFormBtn.addEventListener('click', function() {
        formContainer.textContent = '';
        formContainer.style.display = 'none'; 
    })
}

function chooseListToDelete() {
    const formContainer = document.querySelector('.formcontainer');
    formContainer.style.display = 'block';  
    formContainer.textContent = '';   

    const newForm = document.createElement('form');

    const formFieldSet = document.createElement('fieldset');

    const formLegend = document.createElement('legend');
    formLegend.textContent = 'Which List Would You Like To Delete?';
    formFieldSet.appendChild(formLegend);

    const deleteListBox = document.createElement('div');
    deleteListBox.classList.add('deletelistbox');

        if (allLists == false) {
            deleteListBox.textContent = 'You have no lists currently!';
        } else {
            for (let list of allLists) {
                let listOption = document.createElement('p');
                listOption.textContent = list;
                listOption.classList.add('deletelistoption');
                listOption.id = 'id' + (allLists.indexOf(list));
                deleteListBox.appendChild(listOption);

                listOption.addEventListener('click', deleteList);
            }
        }
    
    formFieldSet.appendChild(deleteListBox);
    
    const cancelBtn = document.createElement('button');
    cancelBtn.classList.add('cancelformbtn');
    cancelBtn.textContent = 'Cancel';
    formFieldSet.appendChild(cancelBtn);

    cancelBtn.addEventListener('click', function() {
        formContainer.textContent = '';
        formContainer.style.display = 'none'; 
    })

    newForm.appendChild(formFieldSet);
    formContainer.appendChild(newForm);
}
function deleteList() {
    let currentIndex = event.target.id
        .split('')
        .splice(2)
        .join('');

    let listName = event.target.textContent;
    
    allLists.splice(currentIndex, 1);

    // Remove This Project Name from all tasks that have it
    for (let task of allTasks) {
        if (task.project === listName) {
            task.project = undefined;
        }
    }

    // Change What is Shown if the Deleted List is the One to be deleted
    let calculatedTitle = document.querySelector('.calculatedtitle');
    if (listName === calculatedTitle.textContent) {
        showList();
    }

    const formContainer = document.querySelector('.formcontainer');
    formContainer.textContent = '';
    formContainer.style.display = 'none'; 

    populateSidebar();
    pushToStorage();
    displayStorage();
}







// DISPLAY MAIN SECTION & FUNCTIONALITY
function showList(list) {
    const listContainer = document.querySelector('.tasklist');
    listContainer.textContent = '';

    const calculatedTitle = document.createElement('h2');
    list === undefined ? calculatedTitle.textContent = 'All Tasks' : calculatedTitle.textContent = list;
    calculatedTitle.classList.add('calculatedtitle');
    listContainer.appendChild(calculatedTitle);

    const uncompletedHeader = document.createElement('h3');
    uncompletedHeader.textContent = 'To Do';
    listContainer.appendChild(uncompletedHeader);

    const uncompletedDiv = document.createElement('div');
    uncompletedDiv.classList.add('uncompletedbox');
    listContainer.appendChild(uncompletedDiv);

    const completedHeader = document.createElement('h3');
    completedHeader.textContent = 'Completed';
    listContainer.appendChild(completedHeader);

    const completedDiv = document.createElement('div');
    completedDiv.classList.add('completedbox');
    listContainer.appendChild(completedDiv);
    

    for (let task of allTasks) {
        if ((task.project !== list) && (list !== undefined)) {
            continue;
        }

        let item = document.createElement('div');
        item.classList.add('taskdiv');
        item.classList.add('priority' + task.priority);
        item.id = 'id' + task._id;

        let completionBox = document.createElement('div');
        completionBox.classList.add('completionbox');
        if (task.complete === true) {
            completionBox.classList.add('complete');
        }
        item.appendChild(completionBox);

        completionBox.addEventListener('click', markCompletion);

        let taskName = document.createElement('h3');
        taskName.textContent = task.name;
        item.appendChild(taskName);

        taskName.addEventListener('dblclick', expandTask);

        task.complete === false ? uncompletedDiv.appendChild(item) : completedDiv.appendChild(item);
    }

    if (uncompletedDiv.textContent === '') {
        let blankStatement = document.createElement('p');
        blankStatement.classList.add('taskdiv');
        blankStatement.textContent = `You have no To-Do's!`;
        uncompletedDiv.appendChild(blankStatement);
    }
    if (completedDiv.textContent === '') {
        let blankStatement = document.createElement('p');
        blankStatement.classList.add('taskdiv');
        blankStatement.textContent = `You have no Completed Tasks.`;
        completedDiv.appendChild(blankStatement);
    }
}

function markCompletion() {
    let id = event.target.parentElement.id
        .split('')
        .splice(2)
        .join('');

    let index = findIndexOfTask(id);
    allTasks[index].changeCompletion();

    let calculatedTitle = document.querySelector('.calculatedtitle');
    calculatedTitle.textContent === 'All Tasks' ? showList() : showList(calculatedTitle);

    pushToStorage();
}

function expandTask(event) {
    event.target.removeEventListener('dblclick', expandTask);

    let allVisualTasks = document.querySelectorAll('.taskdiv');
    for (let task of allVisualTasks) {
        if (task.classList.contains('expanded')) {
            closeMoreThanOne(task);
        }
    }
  
    let id =  event.target.parentElement.id
                .split('')
                .splice(2)
                .join('');
    let index = findIndexOfTask(id);
    
    let parent = event.target.parentElement;
    parent.classList.add('expanded');
    
    let taskDate = document.createElement('p');
    taskDate.classList.add('taskdate');
    allTasks[index].dueDate === 'Invalid Date' ? taskDate.textContent = 'No due date' : taskDate.textContent = allTasks[index].dueDate;
    parent.appendChild(taskDate);

    let taskNotes = document.createElement('p');
    taskNotes.classList.add('tasknotes');
    taskNotes.textContent = allTasks[index].notes;
    parent.appendChild(taskNotes);

    let buttonsDiv = document.createElement('div');
    buttonsDiv.classList.add('buttons');

    let deleteBtn = document.createElement('button');
    deleteBtn.classList.add('deletebtn');
    deleteBtn.textContent = 'Delete Task';
    buttonsDiv.appendChild(deleteBtn);

    deleteBtn.addEventListener('click', function() {
        deleteTask(index);

        let listTitle = document.querySelector('.calculatedtitle');
        listTitle.textContent === 'All Tasks' ? showList() : showList(listTitle.textContent);
    })


    let editBtn = document.createElement('button');
    editBtn.classList.add('editbtn');
    editBtn.textContent = 'Edit Task';
    buttonsDiv.appendChild(editBtn);

    parent.appendChild(buttonsDiv);

    editBtn.addEventListener('click', function() {
        createForm('edit');
        const formContainer = document.querySelector('.formcontainer');

        let newTaskName = document.querySelector('#taskname');
        let newTaskDate = document.querySelector('#taskdate');
        let newTaskPriority = document.querySelector('#taskpriority');
        let newTaskNotes = document.querySelector('#tasknotes');

        let newDate = new Date(allTasks[index].dueDate);
        let year = newDate.getFullYear();
        let month = String(newDate.getMonth() + 1).padStart(2, '0');
        let day = String(newDate.getDate()).padStart(2, '0');
        let formattedDate = `${year}-${month}-${day}`;

        newTaskName.value = allTasks[index].name;
        newTaskDate.value = formattedDate;
        newTaskPriority.value = allTasks[index].priority;
        newTaskNotes.value = allTasks[index].notes;

        const submitFormBtn = document.querySelector('.submitformbtn');
        submitFormBtn.addEventListener('click', function( ) {
            event.preventDefault();

            allTasks[index].name = newTaskName.value;
            allTasks[index].dueDate = newTaskDate.value;
            allTasks[index].priority = +newTaskPriority.value;
            allTasks[index].notes = newTaskNotes.value;

            formContainer.textContent = '';
            formContainer.style.display = 'none';
            

            let listTitle = document.querySelector('.calculatedtitle');
            listTitle.textContent === 'All Tasks' ? showList() : showList(listTitle.textContent);

            pushToStorage();
        });

        const cancelFormBtn = document.querySelector('.cancelformbtn');
        cancelFormBtn.addEventListener('click', function() {
            event.preventDefault();
            formContainer.textContent = '';
            formContainer.style.display = 'none';
            })
    })

    parent.addEventListener('dblclick', callUnExpander);

    event.stopPropagation();

}

function callUnExpander(event) {
    let selectedDiv;
    event.target.id === '' ? selectedDiv = event.target.parentElement : selectedDiv = event.target;
    
    closeMoreThanOne(selectedDiv);
    selectedDiv.removeEventListener('dblclick', callUnExpander);
}

function findIndexOfTask(idOfTask) {
    let chosenTask;
    for (let task of allTasks) {
        if (+idOfTask === +task._id) {
            chosenTask = task;
        }
    }
    return allTasks.indexOf(chosenTask);
}

function deleteTask(idOfTask) {
    let index = findIndexOfTask(idOfTask);
    allTasks.splice(index, 1);

    pushToStorage();
    displayStorage();
}

function closeMoreThanOne(selectedDiv) {
    selectedDiv.classList.remove('expanded');
    removeExpanded(selectedDiv);
    selectedDiv.addEventListener('dblclick', expandTask);
}

function removeExpanded(selectedDiv) {
    let taskDate = document.querySelector('.taskdate');
    let taskNotes = document.querySelector('.tasknotes');
    let buttonDiv = document.querySelector('.buttons');

    selectedDiv.removeChild(taskDate);
    selectedDiv.removeChild(taskNotes);
    selectedDiv.removeChild(buttonDiv);
}








// CREATE A TASK SECTION

 function activateCreateTaskBtn() {
    const createTaskBtn = document.querySelector('.createtask');
    createTaskBtn.addEventListener('click', createTask);
}

function createTask() {
    createForm('new');
    const formContainer = document.querySelector('.formcontainer');

    const submitFormBtn = document.querySelector('.submitformbtn');
    submitFormBtn.addEventListener('click', function() {
        event.preventDefault();
        
        let newTaskName = document.querySelector('#taskname');
        let newTaskDate = document.querySelector('#taskdate');
        let newTaskPriority = document.querySelector('#taskpriority');
        let newTaskNotes = document.querySelector('#tasknotes');
        let newTaskProject = document.querySelector('#taskproject');

        let projectVal;
        newTaskProject.value === 'none' ? projectVal = undefined : projectVal = newTaskProject.value;

        let date = new Date(newTaskDate.value);
        let offset = date.getTimezoneOffset();
        date.setMinutes(offset);

        new Task(newTaskName.value, +newTaskPriority.value, date, newTaskNotes.value, projectVal);

        formContainer.textContent = '';

        const calculatedTitle = document.querySelector('.calculatedtitle');
        calculatedTitle.textContent === 'All Tasks' ? showList() : showList(calculatedTitle.textContent); 

        formContainer.style.display = 'none'; 
        pushToStorage();
        displayStorage();
    })

    const cancelFormBtn = document.querySelector('.cancelformbtn');
    cancelFormBtn.addEventListener('click', function() {
        formContainer.textContent = '';
        formContainer.style.display = 'none'; 
    })
}

function createForm(type) {
    const formContainer = document.querySelector('.formcontainer'); 
    formContainer.style.display = 'block';  
    formContainer.textContent = '';

    const newForm = document.createElement('form');

    const formFieldSet = document.createElement('fieldset');

    const formLegend = document.createElement('legend');
    type === 'new' ? formLegend.textContent = 'Add a New To-Do' : formLegend.textContent = 'Edit Your To-Do';
    formFieldSet.appendChild(formLegend);

    const formMain = document.createElement('div');
    formMain.classList.add('formmain');

    const nameLabel = document.createElement('label');
    nameLabel.textContent = 'Task:  ';
    nameLabel.setAttribute('for', 'taskname');
    formMain.appendChild(nameLabel);

    const nameInput = document.createElement('input');
    nameInput.setAttribute('type', 'text');
    nameInput.id = 'taskname';
    nameInput.setAttribute('name', 'taskname');
    formMain.appendChild(nameInput);

    const priorityLabel = document.createElement('label');
    priorityLabel.textContent = 'Priority:  ';
    priorityLabel.setAttribute('for', 'taskpriority');
    formMain.appendChild(priorityLabel);

    const priorityInput = document.createElement('select');
    priorityInput.id = 'taskpriority';
    priorityInput.setAttribute('name', 'taskpriority');

        const optionOne = document.createElement('option');
        optionOne.textContent = '1';
        optionOne.setAttribute('value', '1');
        priorityInput.appendChild(optionOne);

        const optionTwo = document.createElement('option');
        optionTwo.textContent = '2';
        optionTwo.setAttribute('value', '2');
        priorityInput.appendChild(optionTwo);

        const optionThree = document.createElement('option');
        optionThree.textContent = '3';
        optionThree.setAttribute('value', '3');
        priorityInput.appendChild(optionThree);

        const optionFour = document.createElement('option');
        optionFour.textContent = '4';
        optionFour.setAttribute('value', '4');
        priorityInput.appendChild(optionFour);
    formMain.appendChild(priorityInput);

    const dateLabel = document.createElement('label');
    dateLabel.textContent = 'Due Date:  ';
    dateLabel.setAttribute('for', 'taskdate');
    formMain.appendChild(dateLabel);

    const dateInput = document.createElement('input');
    dateInput.id = 'taskdate';
    dateInput.setAttribute('name', 'taskdate');
    dateInput.setAttribute('type', 'date');
    formMain.appendChild(dateInput);

    const notesLabel = document.createElement('label');
    notesLabel.textContent = 'Notes:  ';
    notesLabel.setAttribute('for', 'tasknotes');
    formMain.appendChild(notesLabel);

    const notesInput = document.createElement('textarea');
    notesInput.id = 'tasknotes';
    notesInput.setAttribute('name', 'tasknotes');
    formMain.appendChild(notesInput);

    const projectLabel = document.createElement('label');
    projectLabel.textContent = 'Project:  ';
    projectLabel.setAttribute('for', 'taskproject');
    formMain.appendChild(projectLabel);

    const projectInput = document.createElement('select');
    projectInput.id = 'taskproject';
    projectInput.setAttribute('name', 'taskpriority');
        const noneOption = document.createElement('option');
        noneOption.textContent = 'None';
        noneOption.setAttribute('value', 'none');
        projectInput.appendChild(noneOption);

        for (let list of allLists) {
            const listOption = document.createElement('option');
            listOption.textContent = list;
            listOption.setAttribute('value', list);
            projectInput.appendChild(listOption);
        }
    formMain.appendChild(projectInput);
        
    formFieldSet.appendChild(formMain);

    const submitBtn = document.createElement('button');
    submitBtn.classList.add('submitformbtn');
    type === 'new' ? submitBtn.textContent = 'Create Task' : submitBtn.textContent = 'Edit Task';
    formFieldSet.appendChild(submitBtn);
    
    const cancelBtn = document.createElement('button');
    cancelBtn.classList.add('cancelformbtn');
    cancelBtn.textContent = 'Cancel';
    formFieldSet.appendChild(cancelBtn);
    
    newForm.appendChild(formFieldSet);

    formContainer.appendChild(newForm);
}


// TESTING LOCAL STORAGE

function pushToStorage() {
    localStorage.clear();
    let taskCount = 0;
    for (let task of allTasks) {
        localStorage.setItem(`${taskCount}`, JSON.stringify(task));
        taskCount++;
    }

    for (let list of allLists) {
        localStorage.setItem(`List${taskCount}`, list);
        taskCount++;
    }
}

function displayStorage() {
    for (let i = 0; i < localStorage.length; i++) {
        if (localStorage.getItem(`${i}`)) {
            console.log(JSON.parse(localStorage.getItem(`${i}`)));
        } else {
            console.log(localStorage.getItem(`List${i}`));
        }
    }
    console.log(localStorage.length);
}

function addStorageToArr() {
    if (localStorage.getItem('0')) {
        let arr = [];
        for (let i = 0; i < localStorage.length; i++) {
            if (localStorage.getItem(`${i}`)) {
                arr.push(JSON.parse(localStorage.getItem(`${i}`)));
            }
        }
    convertToAllTasks(arr);    
    }
}

function convertToAllTasks(arr) {
    for (let item of arr) {
        new Task(item.name, item.priority, item.dueDate, item.notes, item.project);
    }
}




// ON PAGE LOAD
addStorageToArr();
activateNavBtn();
activateCreateTaskBtn();
showList();












// new Task('Clean Bedroom', 2, '7/27/25', 'needs to be done');
// new Task('Wash Dishes', 3, '7/27/25', '');
// new Task('Buy birthday card for Dad', 1, '7/11/25', 'I need to send this out today if I want it to get there by his birthday.');
// new Task('Call Jerry about job', 2, '7/15/25', 'Good lead, possibly');
// new Task('Fix the PS5 controller', 4, '7/31/25', 'for Billys birthday');