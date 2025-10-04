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

// ================= TASK TRACKER =================
const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");

let tasks = [];

function loadTasks() {
  taskList.innerHTML = "";
  tasks.forEach((task, index) => {
    createTaskElement(task.text, task.done, index);
  });
}

function saveTasks() {
  tasks = [];
  document.querySelectorAll("#taskList li").forEach((li) => {
    tasks.push({
      text: li.querySelector("span").textContent,
      done: li.classList.contains("done"),
    });
  });
}

function createTaskElement(text, done = false, index = null) {
  const li = document.createElement("li");
  const span = document.createElement("span");
  span.textContent = text;
  if (done) li.classList.add("done");

  span.addEventListener("click", () => {
    li.classList.toggle("done");
    saveTasks();
  });

  const editBtn = document.createElement("button");
  editBtn.textContent = "✏️";
  editBtn.addEventListener("click", () => {
    const newText = prompt("Edit task:", span.textContent);
    if (newText) {
      span.textContent = newText;
      saveTasks();
    }
  });

  const delBtn = document.createElement("button");
  delBtn.textContent = "❌";
  delBtn.addEventListener("click", () => {
    li.remove();
    saveTasks();
  });

  li.appendChild(span);
  li.appendChild(editBtn);
  li.appendChild(delBtn);
  taskList.appendChild(li);
}

addTaskBtn.addEventListener("click", () => {
  if (taskInput.value.trim() === "") return;
  createTaskElement(taskInput.value);
  saveTasks();
  taskInput.value = "";
});

loadTasks();

// ================= SKILL TRACKER =================
const skillInput = document.getElementById("skillInput");
const addSkillBtn = document.getElementById("addSkillBtn");
const skillList = document.getElementById("skillList");

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
        <button class="skill-btn" onclick="decreaseSkill(${skill.id})" ${skill.level <= 0 ? "disabled" : ""}>-</button>
        <button class="skill-btn" onclick="increaseSkill(${skill.id})" ${skill.level >= 10 ? "disabled" : ""}>+</button>
        <button class="skill-btn" onclick="removeSkill(${skill.id})" style="background-color: #f44336;">×</button>
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

skillInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    addSkill();
  }
});

// ================= HABIT TRACKER =================
// ...existing code...

// ================= HABIT TRACKER =================
const habitInput = document.getElementById("habitInput");
const addHabitBtn = document.getElementById("addHabitBtn");
const habitList = document.getElementById("habitList");
const habitCount = document.getElementById("habitCount");

let habits = [];

// Helper function to get today's date string
function getTodayString() {
  return new Date().toISOString().split('T')[0]; // Returns YYYY-MM-DD format
}

// Load habits from localStorage
function loadHabits() {
  const storedHabits = localStorage.getItem('habits');
  const lastUpdated = localStorage.getItem('habitsLastUpdated');
  const today = getTodayString();
  
  if (storedHabits) {
    habits = JSON.parse(storedHabits);
    
    // If it's a new day, reset all checkboxes but keep the habits
    if (lastUpdated !== today) {
      habits.forEach(habit => {
        habit.done = false;
      });
      localStorage.setItem('habitsLastUpdated', today);
      saveHabitsToStorage();
    }
  } else {
    habits = [];
    localStorage.setItem('habitsLastUpdated', today);
  }
  
  renderHabits();
}

// Save habits to localStorage
function saveHabitsToStorage() {
  localStorage.setItem('habits', JSON.stringify(habits));
  localStorage.setItem('habitsLastUpdated', getTodayString());
}

// Render habits in the UI
function renderHabits() {
  habitList.innerHTML = "";
  habits.forEach((habit, index) => createHabitElement(habit.text, habit.done, index));
  updateHabitCount();
}

// Update the habit count display
function updateHabitCount() {
  const checkedCount = habits.filter(habit => habit.done).length;
  habitCount.textContent = checkedCount;
}

// Create a habit element
function createHabitElement(text, done = false, index) {
  const li = document.createElement("li");
  const span = document.createElement("span");
  span.textContent = text;

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = done;
  checkbox.addEventListener("change", () => {
    habits[index].done = checkbox.checked;
    saveHabitsToStorage();
    updateHabitCount();
  });

  const delBtn = document.createElement("button");
  delBtn.textContent = "❌";
  delBtn.addEventListener("click", () => {
    habits.splice(index, 1);
    saveHabitsToStorage();
    renderHabits();
  });

  li.appendChild(span);
  li.appendChild(checkbox);
  li.appendChild(delBtn);
  habitList.appendChild(li);
}

// Add new habit
addHabitBtn.addEventListener("click", () => {
  if (habitInput.value.trim() === "") return;
  
  const newHabit = {
    text: habitInput.value.trim(),
    done: false
  };
  
  habits.push(newHabit);
  saveHabitsToStorage();
  renderHabits();
  habitInput.value = "";
});

// Allow Enter key to add habits
habitInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    addHabitBtn.click();
  }
});

// Initialize habits on page load
loadHabits();

// ...existing code...
// ================= QUOTES =================
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
  { text: "Push yourself, because no one else will do it for you.", category: "Motivation" },
];

const quoteDisplay = document.getElementById("quoteDisplay");
const newQuoteBtn = document.getElementById("newQuoteBtn");

newQuoteBtn.addEventListener("click", () => {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  quoteDisplay.textContent = quotes[randomIndex].text;
});

// ================= POMODORO TIMER =================
let timer;
let time = 25 * 60;
let soundEnabled = true;
let isPaused = true;

const timerDisplay = document.getElementById("timerDisplay");
const startTimerBtn = document.getElementById("startTimerBtn");
const resetTimerBtn = document.getElementById("resetTimerBtn");
const soundToggleBtn = document.getElementById("soundToggleBtn");

function updateTimer() {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  timerDisplay.textContent = `${minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
}

function playTickSound() {
  if (!soundEnabled) return;
  const audioContext = new (window.AudioContext || window.webkitAudioContext)();
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();

  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);

  oscillator.frequency.value = 1000;
  oscillator.type = "sine";

  gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.05);

  oscillator.start(audioContext.currentTime);
  oscillator.stop(audioContext.currentTime + 0.05);
}

function playCompletionSound() {
  const audioContext = new (window.AudioContext || window.webkitAudioContext)();
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();

  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);

  oscillator.frequency.value = 800;
  oscillator.type = "sine";

  gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);

  oscillator.start(audioContext.currentTime);
  oscillator.stop(audioContext.currentTime + 0.5);
}

function updateSoundButtonText() {
  soundToggleBtn.textContent = soundEnabled ? "🔊 Sound On" : "🔇 Sound Off";
}

soundToggleBtn.addEventListener("click", () => {
  soundEnabled = !soundEnabled;
  updateSoundButtonText();
});

startTimerBtn.addEventListener("click", () => {
  if (isPaused) {
    isPaused = false;
    startTimerBtn.textContent = "Pause";
    timer = setInterval(() => {
      if (time <= 0) {
        clearInterval(timer);
        timer = null;
        time = 25 * 60;
        playCompletionSound();
        alert("Time is up!");
        updateTimer();
        isPaused = true;
        startTimerBtn.textContent = "Start";
        return;
      }
      time--;
      playTickSound();
      updateTimer();
    }, 1000);
  } else {
    clearInterval(timer);
    isPaused = true;
    startTimerBtn.textContent = "Resume";
  }
});

resetTimerBtn.addEventListener("click", () => {
  clearInterval(timer);
  timer = null;
  time = 25 * 60;
  updateTimer();
  isPaused = true;
  startTimerBtn.textContent = "Start";
});

updateTimer();
updateSoundButtonText();
