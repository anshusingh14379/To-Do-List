document.addEventListener('DOMContentLoaded', () => {
  loadTasks();
});

function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  const taskList = document.getElementById('taskList');

  taskList.innerHTML = '';
  tasks.forEach(task => {
    const li = document.createElement('li');
    li.innerHTML = `<input type="checkbox" ${task.completed ? 'checked' : ''} onclick="toggleComplete(${task.id})">
                    <span class="${task.completed ? 'completed' : ''}">${task.text}</span>
                    <button onclick="deleteTask(${task.id})">Delete</button>`;
    taskList.appendChild(li);
  });
}

function addTask() {
  const taskInput = document.getElementById('taskInput');
  const taskText = taskInput.value.trim();
  if (taskText !== '') {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const newTask = {
      id: Date.now(),
      text: taskText,
      completed: false
    };
    tasks.push(newTask);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    taskInput.value = '';
    loadTasks();
  }
}

function deleteTask(id) {
  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks = tasks.filter(task => task.id !== id);
  localStorage.setItem('tasks', JSON.stringify(tasks));
  loadTasks();
}

function toggleComplete(id) {
  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks = tasks.map(task => {
    if (task.id === id) {
      task.completed = !task.completed;
    }
    return task;
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
  loadTasks();
}