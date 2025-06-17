

let tasks = [];

// Update Task Stats
function updateStats() {
  const total = tasks.length;
  const completed = tasks.filter(task => task.done).length;
  const pending = total - completed;

  document.getElementById('total-tasks').textContent = total;
  document.getElementById('completed-tasks').textContent = completed;
  document.getElementById('pending-tasks').textContent = pending;
}

// Add Tasks
function addTask() {
  const input = document.getElementById('task-input');
  const taskText = input.value.trim();
  if (taskText === '') return;

  const newTask = { text: taskText, done: false };
  tasks.push(newTask);
  input.value = '';
  renderTasks();
  updateStats();
  saveTasksToLocalStorage()
}

function toggleTask(index) {
  tasks[index].done = !tasks[index].done;
  renderTasks();
  updateStats();
  saveTasksToLocalStorage()
}

// Render and display tasks
function renderTasks() {
  const taskList = document.getElementById('task-list');
  taskList.innerHTML = '';

  tasks.forEach((task, index) => {
    const li = document.createElement('li');
    li.classList.add('task-item');

    const label = document.createElement('label');
    label.style.cursor = 'pointer';

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = task.done;
    checkbox.onchange = () => toggleTask(index);

    const text = document.createElement('span');
    text.textContent = ' ' + task.text;
    if (task.done) {
      text.style.textDecoration = 'line-through';

    }
     let deletedBtn = document.createElement('span')
      deletedBtn.innerHTML = '&#10006;';
      deletedBtn.className = 'delete-btn';
      deletedBtn.onclick = () => deleteTask(index)

    const status = document.createElement('span');
    status.className = 'task-status ' + (task.done ? 'done' : 'pending');
    if(task.done) {
      status.textContent = 'Done'
      status.style.backgroundColor = '#c7f9cc'
      status.style.color = '#16db65'
    } else {
      status.textContent = 'Pending'
      status.style.backgroundColor = '#ffbf69'
      status.style.color = '#fb5607'
    }

    label.appendChild(checkbox);
    label.appendChild(text);

    li.appendChild(label);
    li.appendChild(status);
    li.appendChild(deletedBtn);
    taskList.appendChild(li);
  });
}

function deleteTask(index) {
  tasks.splice(index, 1)

  renderTasks()
  updateStats()
  saveTasksToLocalStorage()
}

// Save tasks to the browser and local storage
function saveTasksToLocalStorage() {
  localStorage.setItem("tasks", JSON.stringify(tasks))
}

window.onload = () =>{
  const storedTasks = localStorage.getItem("tasks")

  if(storedTasks) {
    tasks = JSON.parse(storedTasks)
    renderTasks()
    updateStats()
  }
}


