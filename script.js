let countdown;
let time;
const timerDisplay = document.getElementById("time");
const startButton = document.getElementById("start-btn");
const homeButton = document.getElementById("home-btn");
const timeInput = document.getElementById("time-input");

function startTimer() {
  time = parseInt(timeInput.value) * 60; // Convert minutes to seconds
  clearInterval(countdown);
  countdown = setInterval(() => {
    updateTimerDisplay();
    if (time === 0) {
      clearInterval(countdown);
      timerDisplay.textContent = "Time's Up!";
      displayCompletionMessage();
    }
    time--;
  }, 1000);
}

function updateTimerDisplay() {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  timerDisplay.textContent = `${minutes < 10 ? "0" : ""}${minutes}:${
    seconds < 10 ? "0" : ""
  }${seconds}`;
}

function speakMessage(message, callback) {
  const utterance = new SpeechSynthesisUtterance(message);
  utterance.onend = callback;
  window.speechSynthesis.speak(utterance);
}

function displayCompletionMessage() {
  speakMessage(
    "Time's up! Congrats! Now you started to do your work with focus.",
    () => {
      timerDisplay.textContent =
        "Time's Up! Congrats! Now you started to do your work with focus.";
      homeButton.style.display = "inline-block";
    }
  );
}

startButton.addEventListener("click", () => {
  startButton.disabled = true;
  speakMessage(
    "Let's start to do your work and set the time to focus on that particular work.",
    startTimer
  );
});

homeButton.addEventListener("click", () => {
  window.location.href = "Index1.html"; // Replace with your home page URL
});

timeInput.addEventListener("input", () => {
  if (startButton.disabled) {
    time = parseInt(timeInput.value) * 60;
    updateTimerDisplay();
  }
});
