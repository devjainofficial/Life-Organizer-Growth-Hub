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
];
const quoteDisplay = document.getElementById("quoteDisplay");
const newQuoteBtn = document.getElementById("newQuoteBtn");
newQuoteBtn.addEventListener("click", () => {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  quoteDisplay.textContent = quotes[randomIndex].text;
});

// Pomodoro Timer with Tick Sound
let timer;
let time = 25 * 60;
let soundEnabled = true;
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
  if (timer) return;
  timer = setInterval(() => {
    if (time <= 0) {
      clearInterval(timer);
      timer = null;
      time = 25 * 60;
      playCompletionSound();
      updateTimer();
      return;
    }
    time--;
    playTickSound();
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
updateSoundButtonText();
