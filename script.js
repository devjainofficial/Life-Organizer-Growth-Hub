// Theme Toggle
const themeToggle = document.getElementById("themeToggle");
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
});

// Daily Planner
const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");

addTaskBtn.addEventListener("click", () => {
  if (taskInput.value.trim() === "") return;
  const li = document.createElement("li");
  li.textContent = taskInput.value;
  taskList.appendChild(li);
  taskInput.value = "";
});

// Learning Tracker
const skillInput = document.getElementById("skillInput");
const addSkillBtn = document.getElementById("addSkillBtn");
const skillList = document.getElementById("skillList");

// Skill data storage
let skills = [];
let skillIdCounter = 0;

function createSkillElement(skill) {
  const li = document.createElement("li");
  li.className = "skill-item";
  li.innerHTML = `
    <div class="skill-header">
      <span class="skill-name">${skill.name}</span>
      <span class="skill-level">Level ${skill.level}/10</span>
      <div class="skill-controls">
        <button class="skill-btn" onclick="decreaseSkill(${skill.id})" ${
    skill.level <= 0 ? "disabled" : ""
  }>-</button>
        <button class="skill-btn" onclick="increaseSkill(${skill.id})" ${
    skill.level >= 10 ? "disabled" : ""
  }>+</button>
        <button class="skill-btn" onclick="removeSkill(${
          skill.id
        })" style="background-color: #f44336;">×</button>
      </div>
    </div>
    <div class="progress-container">
      <div class="progress-bar" style="width: ${skill.level * 10}%"></div>
      <span class="progress-text">${skill.level * 10}%</span>
    </div>
  `;
  return li;
}

function addSkill() {
  if (skillInput.value.trim() === "") return;

  const skill = {
    id: skillIdCounter++,
    name: skillInput.value.trim(),
    level: 0,
  };

  skills.push(skill);
  const skillElement = createSkillElement(skill);
  skillList.appendChild(skillElement);
  skillInput.value = "";
}

function increaseSkill(id) {
  const skill = skills.find((s) => s.id === id);
  if (skill && skill.level < 10) {
    skill.level++;
    updateSkillDisplay();
  }
}

function decreaseSkill(id) {
  const skill = skills.find((s) => s.id === id);
  if (skill && skill.level > 0) {
    skill.level--;
    updateSkillDisplay();
  }
}

function removeSkill(id) {
  skills = skills.filter((s) => s.id !== id);
  updateSkillDisplay();
}

function updateSkillDisplay() {
  skillList.innerHTML = "";
  skills.forEach((skill) => {
    const skillElement = createSkillElement(skill);
    skillList.appendChild(skillElement);
  });
}

addSkillBtn.addEventListener("click", addSkill);

// Allow Enter key to add skills
skillInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    addSkill();
  }
});

// Motivational Quotes with categories
const quotes = [
  { text: "Your journey starts today.", category: "Motivation" },
  { text: "Small steps lead to big results.", category: "Motivation" },
  { text: "Consistency beats intensity.", category: "Motivation" },
  { text: "Every day is a new chance to grow.", category: "Life" },
  { text: "Every day is a chance to improve.", category: "Motivation" },
  {
    text: "Code is like humor. When you have to explain it, it’s bad.",
    category: "Tech",
  },
  {
    text: "Debugging is like being the detective in a crime movie where you are also the murderer.",
    category: "Tech",
  },
  { text: "Learning never exhausts the mind.", category: "Life" },
  {
    text: "The best way to predict the future is to create it.",
    category: "Motivation",
  },
  { text: "Simplicity is the soul of efficiency.", category: "Tech" },
  { text: "Don’t wait for opportunity. Create it.", category: "Motivation" },
  { text: "Mistakes are proof that you are trying.", category: "Life" },
];

const quoteDisplay = document.getElementById("quoteDisplay");
const newQuoteBtn = document.getElementById("newQuoteBtn");

newQuoteBtn.addEventListener("click", () => {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  quoteDisplay.textContent = quotes[randomIndex].text;
});

// Pomodoro Timer (simple)
let timer;
let time = 25 * 60;
const timerDisplay = document.getElementById("timerDisplay");
const startTimerBtn = document.getElementById("startTimerBtn");
const resetTimerBtn = document.getElementById("resetTimerBtn");

function updateTimer() {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  timerDisplay.textContent = `${minutes}:${
    seconds < 10 ? "0" + seconds : seconds
  }`;
}

startTimerBtn.addEventListener("click", () => {
  if (timer) return;
  timer = setInterval(() => {
    if (time <= 0) {
      clearInterval(timer);
      timer = null;
      time = 25 * 60;
      alert("Time is up!");
      updateTimer();
      return;
    }
    time--;
    updateTimer();
  }, 1000);
});

resetTimerBtn.addEventListener("click", () => {
  clearInterval(timer);
  timer = null;
  time = 25 * 60;
  updateTimer();
});

updateTimer();
