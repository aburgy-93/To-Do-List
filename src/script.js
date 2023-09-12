import Project from "./project.js";
import Task from "./task.js";
/////////////////////event listeners///////////////////////////
const addTaskBtn = document.querySelector(".add");
const addTaskPopUp = document.querySelector(".task-preview");
const addTaskPopUpBtn = document.querySelector(".add-item");
const addTaskPopUpCnl = document.querySelector(".cancel");
//////////////////////////////////////////////
const input = document.querySelector(".input");
let taskItem = document.querySelectorAll(".taskItem");
const taskMenu = document.querySelector(".tasks");
const taskLists = document.querySelectorAll(".tasklist");
const toDoList = document.querySelector(".todoList");
const projectsList = document.querySelector(".projectsList");
//////////////////////////////////////////////////////////////////
const addProject = document.querySelector(".addBTN");
const addProjectPopUp = document.querySelector(".add-project-preview");
const addProjectBtn = document.querySelector(".add-project-btn");
const cancelProjectBtn = document.querySelector(".project-cancel");
const projectName = document.querySelector(".project-input");
const projectList = document.querySelector(".projectsList");

//remove hidden class from input to add task (For the INBOX)/////////////////////////////////////////

addTaskBtn.addEventListener("click", function () {
  addTaskBtn.classList.add("hidden");
  addTaskPopUp.classList.remove("hidden");
});

addProject.addEventListener("click", function () {
  addProject.classList.add("hidden");
  addProjectPopUp.classList.remove("hidden");
});

// add hidden class to input after add task //
addTaskPopUpBtn.addEventListener("click", function () {
  // click add button to add task
  // get ipnut value from input field
  let inputValue = input.value;
  // generate HTML markup with input field data
  const markup = _generateMarkupAddTask(inputValue);
  // insert marukup into task list

  taskLists.insertAdjacentHTML("afterbegin", markup);

  addTaskPopUp.classList.add("hidden");
  input.value = "";
  addTaskBtn.classList.remove("hidden");
});

const _generateMarkupAddTask = function (input) {
  return `
    <button class="task-button">
      <div class="left-panel">
        <ion-icon name="ellipse-outline"></ion-icon>
        <p class="task-content">${input}</p>
      </div>
      <div class="right-panel">
        <p class="due-date">No date</p>
      </div>
    </button>
  `;
};

// add hidden class to input after cancel //
addTaskPopUpCnl.addEventListener("click", function () {
  addTaskPopUp.classList.add("hidden");
  addTaskBtn.classList.remove("hidden");
});

cancelProjectBtn.addEventListener("click", function () {
  addProjectPopUp.classList.add("hidden");
  addProject.classList.remove("hidden");
});

document.addEventListener("DOMContentLoaded", function (e) {
  document.getElementById("inboxBtn").classList.add("clicked");
});

taskMenu.addEventListener("click", function (e) {
  const clicked = e.target.closest(".taskItem");

  if (!clicked) return;
  taskItem.forEach((b) => b.classList.remove("clicked"));
  clicked.classList.add("clicked");
});

//////////////////////////////(ABOVE FOR INBOX, Finish Later)////////////////////////////////////////

/////////////////////// storage & list arrary //////////////////////////

// gets the key (lists) or an [], so it can be updated
const addLocalStorage = function () {
  projectArr = JSON.parse(localStorage.getItem("lists")) || [];
  saveListsAndRender();
};

// updates the local storage with the updated project arr
const saveListsAndRender = function () {
  localStorage.setItem("lists", JSON.stringify(projectArr));
  renderProjectBtn();
};

// initalize empty projects arr
let projectArr = [];

////////////////////////////Project Module & UI/////////////////////////////

// after clicking "+ Add Project" btn, click event for "add" btn
addProjectBtn.addEventListener("click", function () {
  // get ipnut value from input field
  let inputValue = projectName.value;

  // create a new project
  createNewList(inputValue);

  addProjectPopUp.classList.add("hidden");
  projectName.value = "";
  addProject.classList.remove("hidden");
});

// create new list object
const createNewList = function (name) {
  // pushes new Project w/name to projectArr.
  projectArr.push(new Project(name));
  // saves the array to local storage and renders it onto the page
  saveListsAndRender();
};

// creates a new task
const createNewTask = function (name, index) {
  const item = new Task(name);
  // push task into correct task array
  // 1) need to know what list
  const { tasks } = projectArr[index];
  // 2) pust task to list
  tasks.push(item);
  // 3) save data to local storage
  saveListsAndRender();
};

//////////////////////////////////////////////////////////////////////////////////

// displays the list names from local storage
const renderProjectBtn = function () {
  projectList.textContent = "";
  projectArr.map((b, index) => _generateMarkupProjectsButton(b.name, index));
};

// dynamic generation of project btn w/ name
const _generateMarkupProjectsButton = function (input, index) {
  const markup = `
    <button class="btn listBTN " id=${index}>
      <div class="left-panel">
        <ion-icon name="list"></ion-icon>
        <p>${input}</p>
      </div>
      <div class="right-panel">
        <div class="image">
          <ion-icon [ngClass]="something" name="close"></ion-icon>
        </div>
      </div>
    </button>
  `;

  // insert markup;
  projectList.insertAdjacentHTML("afterbegin", markup);
};

// gets the project from the projectArr via it's id, render the markup to parent element
const renderList = function (id) {
  const _parentElement = document.querySelector(".todoList");
  const projectId = id;
  const { name } = projectArr[id];
  const { tasks } = projectArr[id];

  const markup = _generateMarkupProject(name, tasks);
  _parentElement.textContent = " ";
  _parentElement.insertAdjacentHTML("afterbegin", markup);

  const addTask = document.querySelector(".add-new-list-item");
  const taskCancelBtn = document.querySelector(".cancel-btn");
  const taskInput = document.querySelector(".input-task");
  const addTaskToListBtn = document.querySelector(".add-task-btn");
  const tasksList = document.querySelector(".tasks-list");

  const resetTaskInput = function () {
    addTask.classList.remove("hidden");
    taskInput.classList.add("hidden");
  };

  addTask.addEventListener("click", function () {
    addTask.classList.add("hidden");
    taskInput.classList.remove("hidden");
  });

  taskCancelBtn.addEventListener("click", function () {
    resetTaskInput();
  });

  addTaskToListBtn.addEventListener("click", () => {
    renderTaskToList(id, tasks);
    resetTaskInput();
  });

  // delete tasks button, not re-rendering list on click
  tasksList.addEventListener("click", function (e) {
    const target = e.target.closest(".image");
    console.log(projectId);
    if (!target) return;
    console.log(target);
    const { id } = target.parentNode.parentNode;
    console.log(id);

    // need id of the list we are deleting from
    deleteTask(tasks, id, projectId);
  });
};

const renderTaskToList = function (id, tasks) {
  const input = document.querySelector(".task-input-box");
  createNewTask(input.value, id);
  input.value = " ";
  generateProjectTasksMarkup(tasks);

  // re-render the list
  renderList(id);
};

// displays the UI of the project
const _generateMarkupProject = function (name, tasks) {
  return `
    <div class="newProject projectlist">
      <h1 class="projectTitle">${name}</h1>
      <ul class="tasks-list">
        <!-- <button class="task-button">
          <div class="left-panel">
            <ion-icon name="ellipse-outline"></ion-icon>
            <p class="task-content">Eggs</p>
          </div>
          <div class="right-panel">
            <p class="due-date">No date</p>
          </div>
        </button> -->
        ${tasks.map(generateProjectTasksMarkup).join("")}
      </ul>
      <button class="add-new-list-item">
        <ion-icon name="add"></ion-icon>
        <p>Add Task</p>
      </button>

      <div class="input-task hidden">
        <input type="text" class="task-input-box" />

        <div class="add-task-buttons">
          <button class="add-task-btn">Add</button>
          <button class="cancel-btn">Cancel</button>
        </div>
      </div>
    </div>
  `;
};

// displays the lits items

const generateProjectTasksMarkup = function (task, index) {
  return `
    <button class="task-button" id="${index}">
      <div class="left-panel">
        <ion-icon name="ellipse-outline"></ion-icon>
        <p class="task-content">${task.name}</p>
      </div>
      <div class="right-panel">
        <p class="due-date">No date</p>
         <div class="image">
          <ion-icon [ngClass]="something" name="close"></ion-icon>
        </div>
      </div>
    </button>
  `;
};

////////////////////////////////////////////////////////////////////

// btn clicked, changes class to "clicked", removes previous clicked, display UI
projectList.addEventListener("click", function (e) {
  let listBtn = document.querySelectorAll(".listBTN");
  const clicked = e.target.closest(".listBTN");
  const id = clicked.id;

  if (!clicked) return;
  listBtn.forEach((b) => b.classList.remove("clicked"));
  clicked.classList.add("clicked");

  renderList(id);
});

// deletes a list item, need to put it to a button/event listener

// event listener for delete function
projectsList.addEventListener("click", function (e) {
  const target = e.target.closest(".image");

  if (!target) return;

  // get id of target el, delete it (gotta be a better way for this)
  const { id } = target.parentNode.parentNode;
  deleteList(id);
});

// delete project list from project arr
const deleteList = function (index) {
  projectArr.splice(index, 1);
  saveListsAndRender();
};

const deleteTask = function (tasks, id, project) {
  console.log(id, project);
  tasks.splice(tasks[id], 1);
  saveListsAndRender();
  renderList(project);
};

addLocalStorage();
