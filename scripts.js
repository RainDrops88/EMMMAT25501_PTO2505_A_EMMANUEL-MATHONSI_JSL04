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

/*
 * Creates a DOM element representing a task.
 * @param {Object} task - The task object containing information to display.
 * @param {string|number} task.id - The unique identifier for the task.
 * @param {string} task.title - The title or name of the task.
 * @returns {HTMLDivElement} A div element representing the task, with event listeners attached.
 */

function createTaskElement(task) {
  const div = document.createElement('div');
  div.className = 'task-div';
  div.textContent = task.title;
  div.dataset.taskId = task.id;
  div.addEventListener('click', () => openTaskModal(task));
  return div;
}

/**
 * Retrieves the task container element for a given task status.
 *
 * @param {string} status - The status of the task (e.g., "todo", "doing", "done").
 * @returns {HTMLElement|null} The `.tasks-container` element inside the matching column, or `null` if not found.
 */
function getTaskContainerByStatus(status) {
  const column = document.querySelector(`.column-div[data-status="${status}"]`);
  return column ? column.querySelector('.tasks-container') : null;
}

//--FUNCTION TO CLEAR THE TASKS THAT HAVE BEEN GROUPED FROM THE LIST--//
/**
 * Clears all existing tasks from every task container in the document.
 * Selects all elements with the class `.tasks-container` and removes their contents.
 * @returns {void}
 */
function clearExistingTasks() {
  document.querySelectorAll('.tasks-container').forEach(c => c.innerHTML = '');
}

/**
 * Renders a list of task elements into their corresponding status containers.
 *
 * Iterates over an array of task objects, finds the appropriate container
 * for each task based on its `status`, and appends a created task element.
 *
 * @param {Array<Object>} tasks - An array of task objects to render.
 * @param {string|number} tasks[].id - The unique identifier for the task.
 * @param {string} tasks[].title - The title or name of the task.
 * @param {string} tasks[].status - The current status of the task (e.g., "todo", "doing", "done").
 * @returns {void}
 */
function renderTask(task) {
  task.forEach(task => {
    const container = getTaskContainerByStatus(task.status);
    if (container) container.appendChild(createTaskElement(task));
  });
}

/**
 * Updates the displayed task counts for each status column.
 *
 * For every element with the class `.column-div`, this function counts the number
 * of child elements with the class `.task-div` and updates the corresponding
 * `.count` element's text to reflect that number.
 * @returns {void}
 */
function updateCounts() {
  document.querySelectorAll(".column-div").forEach(column => {
    const count = column.querySelectorAll(".task-div").length;
    column.querySelector(".count").innerText = count;
  });
}

/**
 * Opens the task modal and populates it with the provided task's details.
 *
 * Fills in the modal input fields (title, description, and status) using data
 * from the given task object, then displays the modal dialog.
 *
 * @param {Object} task - The task object containing details to display in the modal.
 * @param {string|number} task.id - The unique identifier of the task.
 * @param {string} task.title - The title of the task.
 * @param {string} task.description - A description or details about the task.
 * @param {string} task.status - The current status of the task (e.g., "todo", "in-progress", "done").
 * @returns {void}
 */
function openTaskModal(task) {
  const modal = document.getElementById('task-modal');
  document.getElementById('task-title').value = task.title;
  document.getElementById('task-desc').value = task.description;
  document.getElementById('task-status').value = task.status;
  modal.showModal();
  
}

/**
 * Attaches an event listener to the modal's close button to close the task modal.
 * Finds the modal element with the ID `task-modal` and the close button with
 * the ID `close-btn`. When the close button is clicked, the modal is closed.
 * @returns {void}
 */
function ModalCloseHandler() {
  const modal = document.getElementById('task-modal');
  document.getElementById("close-btn").addEventListener('click', () => modal.close());
}

/**
 * Initializes the task list board by rendering tasks and setting up UI behavior.
 * This function clears any existing tasks, renders the initial task list,
 * updates task counts in each column, and sets up the modal close button handler.
 * It serves as the main entry point for preparing the task board UI.
 * @returns {void}
 */
function initTasklistBoard() {
  clearExistingTasks();
  renderTask(initialTasks);
  updateCounts();
  ModalCloseHandler();
}


/**
 * Initializes the task list board after the DOM has fully loaded.
 *
 * Registers an event listener for the `DOMContentLoaded` event, ensuring
 * that `initTasklistBoard()` runs only after all HTML elements are available
 * for manipulation.
 * @event DOMContentLoaded
 * @see initTasklistBoard
 */
document.addEventListener('DOMContentLoaded', initTasklistBoard);