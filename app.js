// Define UI Variables
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// Load all event listeners
loadEventListeners();

// Load all event listeners
function loadEventListeners() {
  // DOM Load event
  document.addEventListener('DOMContentLoaded', getTasks);
  // Add task event
  form.addEventListener('submit', addTask);
  // Remove task event
  taskList.addEventListener('click', removeTask);
  // Clear tasks event
  clearBtn.addEventListener('click', clearTasks);
  // Filter tasks event
  filter.addEventListener('keyup', fiterTasks);
}

// Get Tasks
function getTasks() {
  let tasks;
  if (localStorage.getItem('tasks') !== null) {
    tasks = JSON.parse(localStorage.getItem('tasks'));
    tasks.forEach((task) => {
      appendToTaskList(task);
    });
  }
}

// Append task to task list
function appendToTaskList(text) {
  // Create li element
  const li = document.createElement('li');
  // Add class
  li.className = 'collection-item';
  // Create text node and append to li
  li.appendChild(document.createTextNode(text));
  // Create new link element
  const link = document.createElement('a');
  // Add class
  link.className = 'delete-item secondary-content';
  // Add icon html
  link.innerHTML = '<i class="fa fa-remove"></i>';
  // Append the link to li
  li.appendChild(link);

  // Append li to ul
  taskList.appendChild(li);
}

// Add Task
function addTask(e) {
  if (taskInput.value === '') {
    alert('Add a task');
  } else {
    // Add task to UI
    appendToTaskList(taskInput.value);

    // Store task in local storage
    storeTaskInLocalStorage(taskInput.value);

    // Clear input
    taskInput.value = '';
  }

  e.preventDefault();
}

// Store Task
function storeTaskInLocalStorage(task) {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Remove Task
function removeTask(e) {
  if (e.target.parentElement.classList.contains('delete-item')) {
    if (confirm('Are You Sure?')) {
      // Remove task from the DOM
      e.target.parentElement.parentElement.remove();

      // Remove task from the local storage
      removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    }
  }
}

// Remove task from local storage
function removeTaskFromLocalStorage(taskItem) {
  let tasks;
  if (localStorage.getItem('tasks') !== null) {
    tasks = JSON.parse(localStorage.getItem('tasks'));
    tasks.forEach((task, index) => {
      if (task === taskItem.textContent) {
        tasks.splice(index, 1);
      }
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }
}

// Clear Tasks
function clearTasks() {
  // Clear tasks from the DOM
  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }

  // Clear tasks from the local storage
  localStorage.removeItem('tasks');
}

// Filter Tasks
function fiterTasks(e) {
  const text = e.target.value.toLowerCase();
  document.querySelectorAll('.collection-item').forEach((task) => {
    const item = task.firstChild.textContent;
    if (item.toLowerCase().indexOf(text) !== -1) {
      task.style.display = 'block';
    } else {
      task.style.display = 'none';
    }
  });
}
