// ====== Multi-Theme Toggle ======
const themes = [
  { name: 'default', class: '', icon: '🌗', label: 'Default' },
  { name: 'blue', class: 'theme-blue', icon: '🌊', label: 'Calming Blue' },
  { name: 'orange', class: 'theme-orange', icon: '🌅', label: 'Sunset Orange' }
];
let currentTheme = 0;

const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');
const themeLabel = document.getElementById('themeLabel');

function applyTheme(idx) {
  document.body.className = themes[idx].class;
  themeIcon.textContent = themes[idx].icon;
  themeLabel.textContent = themes[idx].label;
  localStorage.setItem('themeIdx', idx);
}

themeToggle.addEventListener('click', () => {
  currentTheme = (currentTheme + 1) % themes.length;
  applyTheme(currentTheme);
});

// On load, restore theme
const savedIdx = parseInt(localStorage.getItem('themeIdx'), 10);
if (!isNaN(savedIdx) && savedIdx >= 0 && savedIdx < themes.length) {
  currentTheme = savedIdx;
}
applyTheme(currentTheme);

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

// Motivational Quotes with categories
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
  { text: "Mistakes are proof that you are trying.", category: "Life" }
];

const quoteDisplay = document.getElementById('quoteDisplay');
const newQuoteBtn = document.getElementById('newQuoteBtn');

newQuoteBtn.addEventListener('click', () => {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  quoteDisplay.textContent = quotes[randomIndex].text;
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
