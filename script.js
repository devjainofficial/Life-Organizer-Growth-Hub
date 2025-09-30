const themeToggle = document.getElementById('themeToggle');
themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark');
});

const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');

function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  taskList.innerHTML = '';
  tasks.forEach((task, index) => {
    createTaskElement(task.text, task.done, index);
  });
}

function saveTasks() {
  const tasks = [];
  document.querySelectorAll('#taskList li').forEach(li => {
    tasks.push({ text: li.querySelector('span').textContent, done: li.classList.contains('done') });
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function createTaskElement(text, done = false, index = null) {
  const li = document.createElement('li');
  const span = document.createElement('span');
  span.textContent = text;
  if (done) li.classList.add('done');

  span.addEventListener('click', () => {
    li.classList.toggle('done');
    saveTasks();
  });

  const editBtn = document.createElement('button');
  editBtn.textContent = '✏️';
  editBtn.addEventListener('click', () => {
    const newText = prompt('Edit task:', span.textContent);
    if (newText) {
      span.textContent = newText;
      saveTasks();
    }
  });

  const delBtn = document.createElement('button');
  delBtn.textContent = '❌';
  delBtn.addEventListener('click', () => {
    li.remove();
    saveTasks();
  });

  li.appendChild(span);
  li.appendChild(editBtn);
  li.appendChild(delBtn);
  taskList.appendChild(li);
}

addTaskBtn.addEventListener('click', () => {
  if (taskInput.value.trim() === '') return;
  createTaskElement(taskInput.value);
  saveTasks();
  taskInput.value = '';
});

loadTasks();

const skillInput = document.getElementById('skillInput');
const addSkillBtn = document.getElementById('addSkillBtn');
const skillList = document.getElementById('skillList');

function loadSkills() {
  const skills = JSON.parse(localStorage.getItem('skills')) || [];
  skillList.innerHTML = '';
  skills.forEach(skill => createSkillElement(skill));
}

function saveSkills() {
  const skills = [];
  document.querySelectorAll('#skillList li span').forEach(span => {
    skills.push(span.textContent);
  });
  localStorage.setItem('skills', JSON.stringify(skills));
}

function createSkillElement(text) {
  const li = document.createElement('li');
  const span = document.createElement('span');
  span.textContent = text;

  // Edit
  const editBtn = document.createElement('button');
  editBtn.textContent = '✏️';
  editBtn.addEventListener('click', () => {
    const newText = prompt('Edit skill:', span.textContent);
    if (newText) {
      span.textContent = newText;
      saveSkills();
    }
  });

  // Delete
  const delBtn = document.createElement('button');
  delBtn.textContent = '❌';
  delBtn.addEventListener('click', () => {
    li.remove();
    saveSkills();
  });

  li.appendChild(span);
  li.appendChild(editBtn);
  li.appendChild(delBtn);
  skillList.appendChild(li);
}

addSkillBtn.addEventListener('click', () => {
  if (skillInput.value.trim() === '') return;
  createSkillElement(skillInput.value);
  saveSkills();
  skillInput.value = '';
});

loadSkills();

const quotes = [
  { text: "Your journey starts today.", category: "Motivation" },
  { text: "Small steps lead to big results.", category: "Motivation" },
  { text: "Consistency beats intensity.", category: "Motivation" },
  { text: "Every day is a new chance to grow.", category: "Life" },
  { text: "Every day is a chance to improve.", category: "Motivation" },
  { text: "Code is like humor. When you have to explain it, it’s bad.", category: "Tech" },
  { text: "Debugging is like being the detective in a crime movie where you are also the murderer.", category: "Tech" },
  { text: "Learning never exhausts the mind.", category: "Life" },
  { text: "The best way to predict the future is to create it.", category: "Motivation" },
  { text: "Simplicity is the soul of efficiency.", category: "Tech" },
  { text: "Don’t wait for opportunity. Create it.", category: "Motivation" },
  { text: "Mistakes are proof that you are trying.", category: "Life" },
  { text: "Great things never come from comfort zones.", category: "Motivation" },
  { text: "Success is the sum of small efforts repeated daily.", category: "Motivation" },
  { text: "Push yourself, because no one else will do it for you.", category: "Motivation" }
];

const quoteDisplay = document.getElementById('quoteDisplay');
const newQuoteBtn = document.getElementById('newQuoteBtn');

newQuoteBtn.addEventListener('click', () => {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  quoteDisplay.textContent = quotes[randomIndex].text;
});

let timer;
let time = 25 * 60;
let isPaused = true;
const timerDisplay = document.getElementById('timerDisplay');
const startTimerBtn = document.getElementById('startTimerBtn');
const resetTimerBtn = document.getElementById('resetTimerBtn');

function updateTimer() {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  timerDisplay.textContent = `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
}

startTimerBtn.addEventListener('click', () => {
  if (isPaused) {
    isPaused = false;
    startTimerBtn.textContent = "Pause";
    timer = setInterval(() => {
      if (time <= 0) {
        clearInterval(timer);
        timer = null;
        time = 25 * 60;
        alert('Time is up!');
        updateTimer();
        isPaused = true;
        startTimerBtn.textContent = "Start";
        return;
      }
      time--;
      updateTimer();
    }, 1000);
  } else {
    clearInterval(timer);
    isPaused = true;
    startTimerBtn.textContent = "Resume";
  }
});

resetTimerBtn.addEventListener('click', () => {
  clearInterval(timer);
  timer = null;
  time = 25 * 60;
  updateTimer();
  isPaused = true;
  startTimerBtn.textContent = "Start";
});

updateTimer();


// Habit section added

// Habit Tracker
const habitInput = document.getElementById('habitInput');
const addHabitBtn = document.getElementById('addHabitBtn');
const habitList = document.getElementById('habitList');
const habitCount = document.getElementById('habitCount');

function loadHabits() {
  const habits = JSON.parse(localStorage.getItem('habits')) || [];
  habitList.innerHTML = '';
  habits.forEach(habit => createHabitElement(habit.text, habit.done));
  updateHabitCount();
}

function saveHabits() {
  const habits = [];
  document.querySelectorAll('#habitList li').forEach(li => {
    habits.push({
      text: li.querySelector('span').textContent,
      done: li.querySelector('input[type="checkbox"]').checked
    });
  });
  localStorage.setItem('habits', JSON.stringify(habits));
  updateHabitCount();
}

function updateHabitCount() {
  const checked = document.querySelectorAll('#habitList input[type="checkbox"]:checked').length;
  habitCount.textContent = checked;
}

function createHabitElement(text, done = false) {
  const li = document.createElement('li');
  const span = document.createElement('span');
  span.textContent = text;

  // Checkbox
  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.checked = done;
  checkbox.addEventListener('change', saveHabits);

  // Delete button
  const delBtn = document.createElement('button');
  delBtn.textContent = '❌';
  delBtn.addEventListener('click', () => {
    li.remove();
    saveHabits();
  });

  li.appendChild(span);
  li.appendChild(checkbox);
  li.appendChild(delBtn);
  habitList.appendChild(li);
}

addHabitBtn.addEventListener('click', () => {
  if (habitInput.value.trim() === '') return;
  createHabitElement(habitInput.value);
  saveHabits();
  habitInput.value = '';
});

loadHabits();
