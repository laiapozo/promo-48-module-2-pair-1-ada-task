"use strict";

const taskList = document.querySelector(".js-task-list");

let tasks = [];
const GITHUB_USER = "PalomaFJ";
const SERVER_URL = `https://dev.adalab.es/api/todo/${GITHUB_USER}`;

fetch(SERVER_URL)
  .then((response) => response.json())
  .then((data) => {
    tasks = data.results;

    renderTasks(tasks);
  });

function renderTasks(list) {
  for (const task of list) {
    if (task.completed === true) {
      taskList.innerHTML += `<li class="completed"><input id="${task.id}" type="checkbox" checked="">${task.name}</li>`;
    } else {
      taskList.innerHTML += `<li><input id="${task.id}" type="checkbox" >${task.name}</li>`;
    }
  }
}

const handleClick = (event) => {
  const taskID = parseInt(event.target.id);
  if (!taskID) return;
  const chosenTask = tasks.find((task) => task.id === taskID);
  if (chosenTask.completed === true) {
    chosenTask.completed === false;
  } else {
    chosenTask.completed === true;
  }
  taskList.innerHTML = "";
  renderTasks(tasks);
};

taskList.addEventListener("click", handleClick);
