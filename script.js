// Theme Toggle
const themeToggle = document.getElementById("themeToggle");
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
});

// Daily Planner with persistence
const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");

// Store tasks in memory instead of localStorage
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

// Learning Tracker with persistence
const skillInput = document.getElementById("skillInput");
const addSkillBtn = document.getElementById("addSkillBtn");
const skillList = document.getElementById("skillList");

// Store skills in memory instead of localStorage
let skills = [];

function loadSkills() {
  skillList.innerHTML = "";
  skills.forEach((skill) => createSkillElement(skill));
}

function saveSkills() {
  skills = [];
  document.querySelectorAll("#skillList li span").forEach((span) => {
    skills.push(span.textContent);
  });
}

function createSkillElement(text) {
  const li = document.createElement("li");
  const span = document.createElement("span");
  span.textContent = text;

  const editBtn = document.createElement("button");
  editBtn.textContent = "✏️";
  editBtn.addEventListener("click", () => {
    const newText = prompt("Edit skill:", span.textContent);
    if (newText) {
      span.textContent = newText;
      saveSkills();
    }
  });

  const delBtn = document.createElement("button");
  delBtn.textContent = "❌";
  delBtn.addEventListener("click", () => {
    li.remove();
    saveSkills();
  });

  li.appendChild(span);
  li.appendChild(editBtn);
  li.appendChild(delBtn);
  skillList.appendChild(li);
}

addSkillBtn.addEventListener("click", () => {
  if (skillInput.value.trim() === "") return;
  createSkillElement(skillInput.value);
  saveSkills();
  skillInput.value = "";
});

loadSkills();

// Habit Tracker
const habitInput = document.getElementById("habitInput");
const addHabitBtn = document.getElementById("addHabitBtn");
const habitList = document.getElementById("habitList");
const habitCount = document.getElementById("habitCount");

// Store habits in memory instead of localStorage
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
  const checked = document.querySelectorAll(
    '#habitList input[type="checkbox"]:checked'
  ).length;
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

// Motivational Quotes
const quotes = [
  { text: "Your journey starts today.", category: "Motivation" },
  { text: "Small steps lead to big results.", category: "Motivation" },
  { text: "Consistency beats intensity.", category: "Motivation" },
  { text: "Every day is a new chance to grow.", category: "Life" },
  { text: "Every day is a chance to improve.", category: "Motivation" },
  {
    text: "Code is like humor. When you have to explain it, it's bad.",
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
  { text: "Don't wait for opportunity. Create it.", category: "Motivation" },
  { text: "Mistakes are proof that you are trying.", category: "Life" },
  {
    text: "Great things never come from comfort zones.",
    category: "Motivation",
  },
  {
    text: "Success is the sum of small efforts repeated daily.",
    category: "Motivation",
  },
  {
    text: "Push yourself, because no one else will do it for you.",
    category: "Motivation",
  },
];

const quoteDisplay = document.getElementById("quoteDisplay");
const newQuoteBtn = document.getElementById("newQuoteBtn");
newQuoteBtn.addEventListener("click", () => {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  quoteDisplay.textContent = quotes[randomIndex].text;
});

// Pomodoro Timer with Tick Sound and Pause/Resume
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
  timerDisplay.textContent = `${minutes}:${
    seconds < 10 ? "0" + seconds : seconds
  }`;
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
  gainNode.gain.exponentialRampToValueAtTime(
    0.01,
    audioContext.currentTime + 0.05
  );

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
  gainNode.gain.exponentialRampToValueAtTime(
    0.01,
    audioContext.currentTime + 0.5
  );

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