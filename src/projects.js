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

const listOfAllProjects = [];

let inBox = new Project('InBox');
new Project('Test List');

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


export { listOfAllProjects, deleteAProject };