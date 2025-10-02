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

// ================= SKILL TRACKER (Updated with Timestamps) =================
const skillInput = document.getElementById("skillInput");
const addSkillBtn = document.getElementById("addSkillBtn");
const skillList = document.getElementById("skillList");

let skills = JSON.parse(localStorage.getItem('skills')) || [];
let skillIdCounter = skills.length > 0 ? Math.max(...skills.map(s => s.id)) + 1 : 0;

// Function to format timestamp
function formatTimestamp(date) {
  const now = new Date();
  const diffMs = now - date;
  const diffMins = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  
  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return `${diffDays}d ago`;
  
  return date.toLocaleDateString();
}

function createSkillElement(skill) {
  const li = document.createElement("li");
  li.className = "skill-item";
  li.dataset.skillId = skill.id;
  
  const lastUpdated = new Date(skill.lastUpdated);
  const timestampText = formatTimestamp(lastUpdated);
  
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
    <div class="skill-timestamp">
      <span class="timestamp-icon">🕒</span>
      <span class="timestamp-text">Updated ${timestampText}</span>
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
    created: new Date().toISOString(),
    lastUpdated: new Date().toISOString()
  };

  skills.push(skill);
  saveSkills();
  updateSkillDisplay();
  skillInput.value = "";
}

function increaseSkill(id) {
  const skill = skills.find((s) => s.id === id);
  if (skill && skill.level < 10) {
    skill.level++;
    skill.lastUpdated = new Date().toISOString();
    saveSkills();
    updateSkillDisplay();
    
    // Add highlight animation
    const skillElement = document.querySelector(`.skill-item[data-skill-id="${id}"]`);
    if (skillElement) {
      skillElement.classList.add('highlight');
      setTimeout(() => {
        skillElement.classList.remove('highlight');
      }, 2000);
    }
  }
}

function decreaseSkill(id) {
  const skill = skills.find((s) => s.id === id);
  if (skill && skill.level > 0) {
    skill.level--;
    skill.lastUpdated = new Date().toISOString();
    saveSkills();
    updateSkillDisplay();
    
    // Add highlight animation
    const skillElement = document.querySelector(`.skill-item[data-skill-id="${id}"]`);
    if (skillElement) {
      skillElement.classList.add('highlight');
      setTimeout(() => {
        skillElement.classList.remove('highlight');
      }, 2000);
    }
  }
}

function removeSkill(id) {
  skills = skills.filter((s) => s.id !== id);
  saveSkills();
  updateSkillDisplay();
}

function saveSkills() {
  localStorage.setItem('skills', JSON.stringify(skills));
}

function updateSkillDisplay() {
  skillList.innerHTML = "";
  
  // Sort skills by last updated (newest first)
  const sortedSkills = [...skills].sort((a, b) => 
    new Date(b.lastUpdated) - new Date(a.lastUpdated)
  );
  
  sortedSkills.forEach((skill) => {
    const skillElement = createSkillElement(skill);
    skillList.appendChild(skillElement);
  });
}

// Update timestamp display every minute
setInterval(() => {
  document.querySelectorAll('.skill-item').forEach(item => {
    const skillId = parseInt(item.dataset.skillId);
    const skill = skills.find(s => s.id === skillId);
    if (skill) {
      const timestampElement = item.querySelector('.timestamp-text');
      const lastUpdated = new Date(skill.lastUpdated);
      timestampElement.textContent = `Updated ${formatTimestamp(lastUpdated)}`;
    }
  });
}, 60000); // Update every minute

addSkillBtn.addEventListener("click", addSkill);

skillInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    addSkill();
  }
});

// Initialize skills display on load
updateSkillDisplay();

// ================= HABIT TRACKER =================
const habitInput = document.getElementById("habitInput");
const addHabitBtn = document.getElementById("addHabitBtn");
const habitList = document.getElementById("habitList");
const habitCount = document.getElementById("habitCount");

let habits = [];

function loadHabits() {
  habitList.innerHTML = "";
  habits.forEach((habit) => createHabitElement(habit.text, habit.done));
  updateHabitCount();
}

function saveHabits() {
  habits = [];
  document.querySelectorAll("#habitList li").forEach((li) => {
    habits.push({
      text: li.querySelector("span").textContent,
      done: li.querySelector('input[type="checkbox"]').checked,
    });
  });
  updateHabitCount();
}

function updateHabitCount() {
  const checked = document.querySelectorAll('#habitList input[type="checkbox"]:checked').length;
  habitCount.textContent = checked;
}

function createHabitElement(text, done = false) {
  const li = document.createElement("li");
  const span = document.createElement("span");
  span.textContent = text;

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = done;
  checkbox.addEventListener("change", saveHabits);

  const delBtn = document.createElement("button");
  delBtn.textContent = "❌";
  delBtn.addEventListener("click", () => {
    li.remove();
    saveHabits();
  });

  li.appendChild(span);
  li.appendChild(checkbox);
  li.appendChild(delBtn);
  habitList.appendChild(li);
}

addHabitBtn.addEventListener("click", () => {
  if (habitInput.value.trim() === "") return;
  createHabitElement(habitInput.value);
  saveHabits();
  habitInput.value = "";
});

loadHabits();

// ================= QUOTES =================
const quotes = [
  { text: "Your journey starts today.", category: "Motivation" },
  { text: "Small steps lead to big results.", category: "Motivation" },
  { text: "Consistency beats intensity.", category: "Motivation" },
  { text: "Every day is a new chance to grow.", category: "Life" },
  { text: "Every day is a chance to improve.", category: "Motivation" },
  { text: "Code is like humor. When you have to explain it, it's bad.", category: "Tech" },
  { text: "Debugging is like being the detective in a crime movie where you are also the murderer.", category: "Tech" },
  { text: "Learning never exhausts the mind.", category: "Life" },
  { text: "The best way to predict the future is to create it.", category: "Motivation" },
  { text: "Simplicity is the soul of efficiency.", category: "Tech" },
  { text: "Don't wait for opportunity. Create it.", category: "Motivation" },
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