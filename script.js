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

addSkillBtn.addEventListener("click", () => {
  if (skillInput.value.trim() === "") return;
  const li = document.createElement("li");
  li.textContent = skillInput.value;
  skillList.appendChild(li);
  skillInput.value = "";
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

// Enhanced Focus Timer
let timer;
let time = 25 * 60;
let totalTime = 25 * 60;
let isPaused = false;
let isRunning = false;

const timerDisplay = document.getElementById("timerDisplay");
const startTimerBtn = document.getElementById("startTimerBtn");
const pauseTimerBtn = document.getElementById("pauseTimerBtn");
const resetTimerBtn = document.getElementById("resetTimerBtn");
const durationInput = document.getElementById("durationInput");
const taskNameInput = document.getElementById("taskNameInput");
const taskNameDisplay = document.getElementById("taskNameDisplay");
const timerStatus = document.getElementById("timerStatus");
const progressCircle = document.querySelector(".progress-ring-circle");

// Set up progress circle
const radius = progressCircle.r.baseVal.value;
const circumference = radius * 2 * Math.PI;
progressCircle.style.strokeDasharray = `${circumference} ${circumference}`;
progressCircle.style.strokeDashoffset = circumference;

function setProgress(percent) {
  const offset = circumference - (percent / 100) * circumference;
  progressCircle.style.strokeDashoffset = offset;
}

function updateTimer() {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  timerDisplay.textContent = `${minutes}:${
    seconds < 10 ? "0" + seconds : seconds
  }`;

  // Update progress circle
  const progressPercent = ((totalTime - time) / totalTime) * 100;
  setProgress(progressPercent);
}

function playCompletionSound() {
  // Create a simple beep sound using Web Audio API
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

function showCompletionNotification() {
  // Visual notification
  timerDisplay.classList.add("timer-complete");
  timerStatus.textContent = "🎉 Time is up! Great work!";
  timerStatus.classList.add("status-complete");

  // Play sound
  playCompletionSound();

  // Browser notification if permission granted
  if (Notification.permission === "granted") {
    new Notification("Focus Timer Complete!", {
      body: taskNameInput.value || "Your focus session has ended.",
      icon: "⏰",
    });
  }

  // Flash animation
  document.getElementById("timer").classList.add("timer-flash");
  setTimeout(() => {
    document.getElementById("timer").classList.remove("timer-flash");
    timerDisplay.classList.remove("timer-complete");
  }, 3000);
}

function startTimer() {
  if (isRunning && !isPaused) return;

  // If starting fresh, set up timer
  if (!isRunning) {
    const duration = parseInt(durationInput.value) || 25;
    totalTime = duration * 60;
    time = totalTime;

    // Update task name display
    if (taskNameInput.value.trim()) {
      taskNameDisplay.textContent = taskNameInput.value.trim();
      taskNameDisplay.style.display = "block";
    } else {
      taskNameDisplay.style.display = "none";
    }

    // Disable inputs during session
    durationInput.disabled = true;
    taskNameInput.disabled = true;
  }

  isRunning = true;
  isPaused = false;
  timerStatus.textContent = "🔥 Focus mode active";
  timerStatus.classList.remove("status-complete");

  startTimerBtn.disabled = true;
  pauseTimerBtn.disabled = false;

  timer = setInterval(() => {
    if (time <= 0) {
      clearInterval(timer);
      timer = null;
      isRunning = false;
      isPaused = false;

      showCompletionNotification();

      // Re-enable controls
      startTimerBtn.disabled = false;
      pauseTimerBtn.disabled = true;
      durationInput.disabled = false;
      taskNameInput.disabled = false;

      return;
    }
    time--;
    updateTimer();
  }, 1000);
}

function pauseTimer() {
  if (!isRunning || isPaused) return;

  clearInterval(timer);
  timer = null;
  isPaused = true;

  timerStatus.textContent = "⏸ Paused - Take a breath";
  startTimerBtn.disabled = false;
  pauseTimerBtn.disabled = true;
}

function resetTimer() {
  clearInterval(timer);
  timer = null;
  isRunning = false;
  isPaused = false;

  const duration = parseInt(durationInput.value) || 25;
  totalTime = duration * 60;
  time = totalTime;

  timerStatus.textContent = "Ready to focus";
  timerStatus.classList.remove("status-complete");
  taskNameDisplay.style.display = "none";

  startTimerBtn.disabled = false;
  pauseTimerBtn.disabled = true;
  durationInput.disabled = false;
  taskNameInput.disabled = false;

  updateTimer();
}

startTimerBtn.addEventListener("click", startTimer);
pauseTimerBtn.addEventListener("click", pauseTimer);
resetTimerBtn.addEventListener("click", resetTimer);

// Update timer display when duration changes
durationInput.addEventListener("input", () => {
  if (!isRunning) {
    const duration = parseInt(durationInput.value) || 25;
    totalTime = duration * 60;
    time = totalTime;
    updateTimer();
  }
});

// Request notification permission on page load
if ("Notification" in window && Notification.permission === "default") {
  Notification.requestPermission();
}

updateTimer();
