//--GIVEN INITIAL TASK LIST--//
const initialTasks = [
  {
    id: 1,
    title: "Launch Epic Career 🚀",
    description: "Create a killer Resume",
    status: "todo",
  },
  {
    id: 2,
    title: "Master JavaScript 💛",
    description: "Get comfortable with the fundamentals",
    status: "doing",
  },
  {
    id: 3,
    title: "Keep on Going 🏆",
    description: "You're almost there",
    status: "doing",
  },

  {
    id: 11,
    title: "Learn Data Structures and Algorithms 📚",
    description:
      "Study fundamental data structures and algorithms to solve coding problems efficiently",
    status: "todo",
  },
  {
    id: 12,
    title: "Contribute to Open Source Projects 🌐",
    description:
      "Gain practical experience and collaborate with others in the software development community",
    status: "done",
  },
  {
    id: 13,
    title: "Build Portfolio Projects 🛠️",
    description:
      "Create a portfolio showcasing your skills and projects to potential employers",
    status: "done",
  },
];

//---FUNCTION TO CREATE TASKS ELEMENT--//
function createTaskElement(task) {
  const div = document.createElement('div');
  div.className = 'task-div';
  div.textContent = task.title;
  div.dataset.taskId = task.id;
  div.addEventListener('click', () => openTaskModal(task));
  return div;
}

//--FUNCTION TO GROUP THE TASKS BY THEIR STATUS--//
function getTaskContainerByStatus(status) {
  const column = document.querySelector(`.column-div[data-status="${status}"]`);
  return column ? column.querySelector('.tasks-container') : null;
}

//--FUNCTION TO CLEAR THE TASKS THAT HAVE BEEN GROUPED FROM THE LIST--//
function clearExistingTasks() {
  document.querySelectorAll('.tasks-container').forEach(c => c.innerHTML = '');
}

//--FUNCTION TO ADD THE TASK ON THE CORRECT COLUMN BASED ON THEIR STATUS--//
function renderTask(task) {
  task.forEach(task => {
    const container = getTaskContainerByStatus(task.status);
    if (container) container.appendChild(createTaskElement(task));
  });
}

//--FUNCTION TO UPDATE THE COUNTS OF HOW MANY TASKS HAVE BEEN ADDED ON EACH COLUMN--//
function updateCounts() {
  document.querySelectorAll(".column-div").forEach(column => {
    const count = column.querySelectorAll(".task-div").length;
    column.querySelector(".count").innerText = count;
  });
}

//--FUNCTION THAT OPENS THE MODAL WHEN THE USER CLICK A TASK AND DISPLAY THE DATA ON THE CLICKED TASK--//
function openTaskModal(task) {
  const modal = document.getElementById('task-modal');
  document.getElementById('task-title').value = task.title;
  document.getElementById('task-desc').value = task.description;
  document.getElementById('task-status').value = task.status;
  modal.showModal();
  
}

//-- FUNCTION TO CLOSE THE MODAL WHEN THE RED CROSS IS CLICKED--//
function ModalCloseHandler() {
  const modal = document.getElementById('task-modal');
  document.getElementById("close-btn").addEventListener('click', () => modal.close());
}

//--FUNCTION THAT CALLS ALL THE OTHER FUCTIONS TO RUN WHEN IT IS CALLED--//
function initTasklistBoard() {
  clearExistingTasks();
  renderTask(initialTasks);
  updateCounts();
  ModalCloseHandler();
}

document.addEventListener('DOMContentLoaded', initTasklistBoard);// RUNS ALL THE FUNCTIONS AFTER THE DOM HAVE LOADED--//