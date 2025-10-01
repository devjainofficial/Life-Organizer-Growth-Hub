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
    if (skillInput.value.trim() === '') return;
    addSkill(skillInput.value, 0); // default progress 0%
    skillInput.value = '';
});

function addSkill(name, progress) {
    const li = document.createElement('li');
    li.innerHTML = `
        <span>${name}</span>
        <div class="progress-bar-container">
          <div class="progress-bar" style="width: ${progress}%"></div>
          <span class="progress-text">${progress}%</span>
        </div>
        <button class="inc">+</button>
        <button class="dec">-</button>
    `;

    li.querySelector('.inc').onclick = () => updateProgress(li, 10);
    li.querySelector('.dec').onclick = () => updateProgress(li, -10);
    skillList.appendChild(li);
}

function updateProgress(li, delta) {
    let bar = li.querySelector('.progress-bar');
    let text = li.querySelector('.progress-text');
    let progress = parseInt(bar.style.width) || 0;
    progress = Math.max(0, Math.min(100, progress + delta));
    bar.style.width = progress + '%';
    text.textContent = progress + '%';
}

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
