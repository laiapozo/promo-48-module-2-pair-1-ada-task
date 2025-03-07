"use strict";

const taskList = document.querySelector(".js-task-list");

const tasks = [
  { name: "Recoger setas en el campo", completed: true, id: 1 },
  { name: "Comprar pilas", completed: true, id: 2 },
  { name: "Poner una lavadora de blancos", completed: true, id: 3 },
  {
    name: "Aprender cómo se realizan las peticiones al servidor en JavaScript",
    completed: false,
    id: 4,
  },
];

for (const task of tasks) {
  if (task.completed === true) {
    taskList.innerHTML += `<li class="completed"><input id="${task.id}" type="checkbox" checked="">${task.name}</li>`;
  } else {
    taskList.innerHTML += `<li><input id="${task.id}" type="checkbox" checked="">${task.name}</li>`;
  }
}


const handleClick = (event) => {
  const taskID = parseInt(event.target.id);
  if (!taskID) return; 
  if (tasks[taskID - 1].completed === true) {
    tasks[taskID - 1].completed === false;
  } else {
    tasks[taskID - 1].completed === true;
  } 

  taskList.innerHTML =" ";

  for (const task of tasks) {
    if (task.completed === true) {
      taskList.innerHTML += `<li class="completed"><input id="${task.id}" type="checkbox" checked="">${task.name}</li>`;
    } else {
      taskList.innerHTML += `<li><input id="${task.id}" type="checkbox" checked="">${task.name}</li>`;
    }
  }
};

taskList.addEventListener("click", handleClick);
