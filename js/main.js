"use strict";

const taskList = document.querySelector(".js-task-list");
const addTask = document.querySelector(".js-input-new-task");
const buttonAdd = document.querySelector(".js-submit-task");
let tasks = [];
const GITHUB_USER = "PalomaFJ";
const SERVER_URL = `https://dev.adalab.es/api/todo/${GITHUB_USER}`;

const handleClick = (event) => {
  const taskID = parseInt(event.target.id);
  if (!taskID) return;
  console.log(tasks)
  const chosenTask = tasks.find((task) => {
    console.log(task.id)
    console.log(taskID) 
    return task.id === taskID
  } ); 
  if (chosenTask.completed === true) {
    chosenTask.completed = false;
  } else {
    chosenTask.completed = true;
  }
  taskList.innerHTML = "";
  renderTasks(tasks);
};

function renderTasks(list) {
  for (const task of list) {
    if (task.completed === true) {
      //taskList.innerHTML += `<li class="completed"><input id="${task.id}" type="checkbox" checked="">${task.name}</li>`;

      const liElement = document.createElement("li");
      liElement.setAttribute("class", "completed");
      taskList.appendChild(liElement);

      const inputCheckbox = document.createElement("input");
      liElement.appendChild(inputCheckbox);
      inputCheckbox.setAttribute("id", task.id);
      inputCheckbox.setAttribute("type", "checkbox");
      inputCheckbox.setAttribute("checked", " ");

      const contentLi = document.createTextNode(task.name);
      liElement.appendChild(contentLi);
    } else {
      // taskList.innerHTML +=`<li><input id="${task.id}" type="checkbox" >${task.name}</li>`;

      const liElement = document.createElement("li");
      taskList.appendChild(liElement);
      const inputCheckbox = document.createElement("input");
      liElement.appendChild(inputCheckbox);
      inputCheckbox.setAttribute("id", task.id);
      inputCheckbox.setAttribute("type", "checkbox");
      const contentLi = document.createTextNode(task.name);
      liElement.appendChild(contentLi);
    }
  }
}

taskList.addEventListener("click", handleClick);

const handleNewTask = (event) => {
  event.preventDefault();
  const task = addTask.value;
  const newTask = {
    name: task,
    completed: false,
    id: Math.ceil(Math.random() * 100),
  };

  tasks.push(newTask);
  console.log(tasks)
  taskList.innerHTML += `<li><input id="${newTask.id}" type="checkbox" >${newTask.name}</li>`;
  localStorage.setItem("tasks", JSON.stringify(tasks));
  //tasksLocalStorage.push(task);
};

buttonAdd.addEventListener("click", handleNewTask);

const tasksLocalStorage = JSON.parse(localStorage.getItem("tasks"));

if (tasksLocalStorage !== null) {
  tasks = tasksLocalStorage;
  taskList.innerHTML = "";
  for (const task of tasks) {
    renderTasks(task);
  }
} else {
  fetch(SERVER_URL)
    .then((response) => response.json())
    .then((data) => {
      tasks = data.results;
      taskList.innerHTML = "";
      renderTasks(tasks);
    })
    .catch((error) => {
      console.error(error);
    });
}