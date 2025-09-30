// Theme Toggle
const themeToggle = document.getElementById('themeToggle');
themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark');
});

// Daily Planner
const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');

addTaskBtn.addEventListener('click', () => {
  if(taskInput.value.trim() === '') return;
  const li = document.createElement('li');
  li.textContent = taskInput.value;
  taskList.appendChild(li);
  taskInput.value = '';
});

// Learning Tracker
const skillInput = document.getElementById('skillInput');
const addSkillBtn = document.getElementById('addSkillBtn');
const skillList = document.getElementById('skillList');

addSkillBtn.addEventListener('click', () => {
  if(skillInput.value.trim() === '') return;
  const li = document.createElement('li');
  li.textContent = skillInput.value;
  skillList.appendChild(li);
  skillInput.value = '';
});

// Motivational Quotes
const quotes = [
  "Your journey starts today.",
  "Small steps lead to big results.",
  "Consistency beats intensity.",
  "Every day is a new chance to grow."
];

const quoteDisplay = document.getElementById('quoteDisplay');
const newQuoteBtn = document.getElementById('newQuoteBtn');

newQuoteBtn.addEventListener('click', () => {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  quoteDisplay.textContent = quotes[randomIndex];
});

// Pomodoro Timer (simple)
let timer;
let time = 25 * 60;
const timerDisplay = document.getElementById('timerDisplay');
const startTimerBtn = document.getElementById('startTimerBtn');
const resetTimerBtn = document.getElementById('resetTimerBtn');

function updateTimer() {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  timerDisplay.textContent = `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
}

startTimerBtn.addEventListener('click', () => {
  if(timer) return;
  timer = setInterval(() => {
    if(time <= 0){
      clearInterval(timer);
      timer = null;
      time = 25 * 60;
      alert('Time is up!');
      updateTimer();
      return;
    }
    time--;
    updateTimer();
  }, 1000);
});

resetTimerBtn.addEventListener('click', () => {
  clearInterval(timer);
  timer = null;
  time = 25 * 60;
  updateTimer();
});

updateTimer();
