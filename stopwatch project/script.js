
const timeDisplay = document.getElementById("time");
const startStopButton = document.getElementById("startStop");
const pauseResumeButton = document.getElementById("pauseResume");
const resetButton = document.getElementById("reset");

let startTime = 0;
let elapsedTime = 0;
let intervalId = null;
let isRunning = false;

function formatTime(ms) {
  const date = new Date(ms);
  return date.toISOString().substr(11, 8);
}

function updateDisplay() {
  timeDisplay.textContent = formatTime(elapsedTime);
}

function updateButtonState() {
  if (isRunning) {
    startStopButton.textContent = "Stop";
    pauseResumeButton.textContent = "Pause";
    pauseResumeButton.disabled = false;
    resetButton.disabled = true;
  } else {
    startStopButton.textContent = "Start";
    pauseResumeButton.textContent = "Pause";
    pauseResumeButton.disabled = true;
    resetButton.disabled = false;
  }
}

function toggleTimer() {
  if (isRunning) {
    clearInterval(intervalId);
    isRunning = false;
  } else {
    startTime = Date.now() - elapsedTime;
    intervalId = setInterval(function () {
      elapsedTime = Date.now() - startTime;
      updateDisplay();
    }, 100); // Update every 100 milliseconds
    isRunning = true;
  }
  updateButtonState();
}

function reset() {
  clearInterval(intervalId);
  isRunning = false;
  elapsedTime = 0;
  updateDisplay();
  updateButtonState();
}

function handleStartStop() {
  if (!isRunning) {
    toggleTimer();
  } else {
    toggleTimer();
    reset();
  }
}

startStopButton.addEventListener("click", handleStartStop);
pauseResumeButton.addEventListener("click", toggleTimer);
resetButton.addEventListener("click", reset);

// Initial button state
updateButtonState();