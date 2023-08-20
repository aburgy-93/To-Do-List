import UI from "./UI.js";
import Project from "./project.js";

/////////////////////event listeners///////////////////////////
const addTaskBtn = document.querySelector(".add");
const addTaskPopUp = document.querySelector(".project-preview");
const addTaskPopUpBtn = document.querySelector(".add-item");
const addTaskPopUpCnl = document.querySelector(".cancel");

//////////////////////////////////////////////
const input = document.querySelector(".input");
const tasksList = document.querySelector(".tasks-list");
let taskItem = document.querySelectorAll(".taskItem");
const taskMenu = document.querySelector(".tasks");
let taskLists = document.querySelectorAll(".tasklist");

//////////////////////////////////////////////////////////////////
const addProject = document.querySelector(".addBTN");
const addProjectPopUp = document.querySelector(".add-project-preview");
const addProjectBtn = document.querySelector(".add-project-btn");
const cancelProjectBtn = document.querySelector(".project-cancel");
const projectName = document.querySelector(".project-input");
const projectList = document.querySelector(".projectsList");
//remove hidden class from input to add task//
addTaskBtn.addEventListener("click", function () {
  addTaskBtn.classList.add("hidden");
  addTaskPopUp.classList.remove("hidden");
});

addProject.addEventListener("click", function () {
  addProject.classList.add("hidden");
  addProjectPopUp.classList.remove("hidden");
});

// Need to make DRY //////////////////////////////////////////////////////////////

// add hidden class to input after add task //
addTaskPopUpBtn.addEventListener("click", function () {
  // click add button to add task
  // get ipnut value from input field
  let inputValue = input.value;
  // generate HTML markup with input field data
  const markup = _generateMarkupAddTask(inputValue);
  // insert marukup into task list

  tasksList.insertAdjacentHTML("afterbegin", markup);

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

//////////////////////////////////////////////////////////////////////////////////

document.addEventListener("DOMContentLoaded", function (e) {
  document.getElementById("inboxBtn").classList.add("clicked");
});

taskMenu.addEventListener("click", function (e) {
  const clicked = e.target.closest(".taskItem");

  if (!clicked) return;
  taskItem.forEach((b) => b.classList.remove("clicked"));
  clicked.classList.add("clicked");
});

/////////////////////////////////////////////////////////////////////////////

addProjectBtn.addEventListener("click", function () {
  // get ipnut value from input field
  let inputValue = projectName.value;
  // create a new project
  createNewList(inputValue);

  addProjectPopUp.classList.add("hidden");
  projectName.value = "";
  addProject.classList.remove("hidden");
});

///////////////////////storage//////////////////////////

// initalize empty projects arr
let projectArr = [];

// create new list object
const createNewList = function (name) {
  projectArr.push(new Project(name));
  saveListsAndRender();
};

// gets the key (lists) or an [], so it can be updated
const addLocalStorage = function () {
  projectArr = JSON.parse(localStorage.getItem("lists")) || [];
  saveListsAndRender();
};

// updates the local storage with the updated project arr
const saveListsAndRender = function () {
  localStorage.setItem("lists", JSON.stringify(projectArr));
  renderLists();
};

// displays the list names
const renderLists = function () {
  projectList.textContent = "";
  const markup = projectArr.map((b) => _generateMarkup(b.name));
  projectList.insertAdjacentHTML("afterbegin", markup);
};

const _generateMarkup = function (input) {
  return `
  <button class="btn listBTN ">
  <ion-icon name="list"></ion-icon>
  <p>${input}</p>
  </button>
  `;
};

// deletes a list item, need to put it to a button/event listener
const deleteList = function (index) {
  projectArr.splice(index, 1);
  saveListsAndRender();
};

addLocalStorage();
// deleteList(0);
console.log(projectArr);
