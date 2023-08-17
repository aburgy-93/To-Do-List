import UI from "./UI.js";
document.addEventListener("DOMContentLoaded", UI.loadHomepage);

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

addProjectBtn.addEventListener("click", function () {
  // click add button to add task
  // get ipnut value from input field
  let inputValue = projectName.value;
  // generate HTML markup with input field data
  const markup = _generateMarkup(inputValue);
  // insert marukup into task list

  projectList.insertAdjacentHTML("afterbegin", markup);

  addProjectPopUp.classList.add("hidden");
  projectName.value = "";
  addProject.classList.remove("hidden");
});

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
  console.log(clicked);

  if (!clicked) return;
  taskItem.forEach((b) => b.classList.remove("clicked"));
  clicked.classList.add("clicked");

  // function to display content area
  console.log(clicked.dataset.tab);
  taskLists.forEach((l) => l.classList.remove("tasklist__tab--active"));
  document
    .querySelector(`.tasklist__content--${clicked.dataset.tab}`)
    .classList.add("tasklist__tab--active");
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

const _generateMarkup = function (input) {
  return `
    <button class="btn listBTN ">
      <ion-icon name="list"></ion-icon>
      <p>${input}</p>
    </button>
  `;
};
