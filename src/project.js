export default class Project {
  constructor(name) {
    this.name = name;
    this.tasks = [];
  }
  _parentElement = document.querySelector(".todoList");

  setName(name) {
    this.name = name;
  }

  getName() {
    return this.name;
  }

  getTasks() {
    return this.tasks;
  }

  render(id) {
    const markup = this._generateMarkupProject(id);
    this._parentElement.textContent = " ";
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  addHandlerAddListItem(handler) {
    this._parentElement.addEventListener("click", function (e) {
      const clicked = e.target.closest(".add-new-list-item");
      const taskPreview = document.querySelector(".task-preview");

      if (!clicked) return;
      handler(clicked, taskPreview);
    });
  }

  _generateMarkupProject(name) {
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
        </ul>
        <button class="add-new-list-item">
          <ion-icon name="add"></ion-icon>
          <p>Add Task</p>
        </button>
  
        <div class="task-preview hidden">
          <input type="text" class="input" />
  
          <div class="add-task-buttons">
            <button class="add-item">Add</button>
            <button class="cancel">Cancel</button>
          </div>
        </div>
      </div>
    `;
  }
}
