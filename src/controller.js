import Project from "./project.js";

const addListItem = function (clicked) {
  console.log("test");
  clicked.classList.add("hidden");
  taskPreview.classList.remove("hidden");
};

const init = function () {
  Project.addHandlerAddListItem(addListItem);
};

init();
