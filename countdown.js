const countdownElement = document.getElementById("countdown");
const timerSelect = document.getElementById("timerSelect");
const playButton = document.getElementById("playButton");
const themeToggleButton = document.getElementById("themeToggle");
const themeContainer = document.getElementById("themeContainer");
const pauseButton = document.getElementById("pauseButton");
const resetButton = document.getElementById("resetButton");
const img_themeToggle = document.getElementById("img_themeToggle");
const img_play = document.getElementById("img_play");
const img_pause = document.getElementById("img_pause");
const img_reset = document.getElementById("img_reset");
const img_audio_play = document.getElementById("audio_play");
const img_audio_stop = document.getElementById("audio_stop");
const bellSound = document.getElementById("bellSound");
const playAudioButton = document.getElementById("playAudioButton");
const stopAudioButton = document.getElementById("stopAudioButton");
const breakduration = 300;
let countdownInterval,
  currentduration,
  isbreak = false,
  prevcustomminutes = "00",
  customminutes;
countdownElement.textContent = "00:00";

function startCountdown(duration) {
  clearInterval(countdownInterval);
  let remainingTime = duration;
  updateCountdownDisplay(remainingTime);
  countdownInterval = setInterval(() => {
    remainingTime--;
    currentduration = remainingTime;
    updateCountdownDisplay(remainingTime);
    if (remainingTime <= 0 && isbreak === false) {
      currentduration = breakduration;
      remainingTime = currentduration;
      bellSound.play();
      const break_minutes = Math.floor(breakduration / 60);
      const break_seconds = breakduration % 60;
      countdownElement.textContent = `${break_minutes
        .toString()
        .padStart(2, "0")}:${break_seconds.toString().padStart(2, "0")}`;
      isbreak = true;
    } else if (remainingTime <= 0 && isbreak) {
      clearInterval(countdownInterval);
      bellSound.play();
      countdownElement.textContent = "Time's up!";
    }
  }, 1000);
}

function updateCountdownDisplay(timeInSeconds) {
  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = timeInSeconds % 60;
  countdownElement.textContent = `${minutes
    .toString()
    .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;

  if (timeInSeconds === "custom") {
    countdownElement.contentEditable = true;
    countdownElement.textContent = "";
    countdownElement.focus();
  }
}

function pauseCountdown() {
  clearInterval(countdownInterval);
}

function resetCountdown() {
  isbreak = false;
  clearInterval(countdownInterval);
  if (timerSelect.value === "custom")
    updateCountdownDisplay(customminutes * 60);
  else updateCountdownDisplay(parseInt(timerSelect.value));
  currentduration = timerSelect.value;
  pauseButton.classList.add("pointer-events-none", "opacity-50");
  playButton.classList.remove("pointer-events-none", "opacity-50");
}

countdownElement.addEventListener("input", (event) => {
  customminutes = countdownElement.textContent.split(":")[0];
  if (Number.isNaN(parseInt(event.data))) {
    countdownElement.textContent = prevcustomminutes + ":00";
    return;
  }
  if (customminutes.length > 3) {
    countdownElement.textContent = prevcustomminutes + ":00";
    return;
  }
  prevcustomminutes = customminutes;
});

timerSelect.addEventListener("change", () => {
  updateCountdownDisplay(timerSelect.value);
  currentduration = timerSelect.value;
  pauseCountdown();
  pauseButton.classList.add("pointer-events-none", "opacity-50");
  playButton.classList.remove("pointer-events-none", "opacity-50");
});

themeToggleButton.addEventListener("click", () => {
  if (themeContainer.classList.contains("bg-gray-800")) {
    themeContainer.classList.remove("bg-gray-800");
    countdown.classList.remove("text-gray-50");
    img_themeToggle.src = "./assets/lmdm.png";
    img_play.src = "./assets/play.png";
    img_pause.src = "./assets/pause.png";
    img_reset.src = "./assets/reset.png";
    img_audio_play.src = "./assets/play.png";
    img_audio_stop.src = "./assets/pause.png";
  } else {
    themeContainer.classList.add("bg-gray-800");
    countdown.classList.add("text-gray-50");
    img_themeToggle.src = "./assets/lmtoggle.png";
    img_play.src = "./assets/dark_play.png";
    img_pause.src = "./assets/dark_pause.png";
    img_reset.src = "./assets/dark_reset.png";
    img_audio_play.src = "./assets/dark_play.png";
    img_audio_stop.src = "./assets/dark_pause.png";
  }
});

playButton.addEventListener("click", () => {
  countdownElement.contentEditable = false;
  const selectedTime = parseInt(
    currentduration === undefined ? timerSelect.value : currentduration
  );
  customminutes = parseInt(countdownElement.textContent.split(":")[0]);
  if (Number.isNaN(selectedTime)) startCountdown(customminutes * 60);
  else startCountdown(selectedTime);
  playButton.classList.add("pointer-events-none", "opacity-50");
  pauseButton.classList.remove("pointer-events-none", "opacity-50");
});

pauseButton.addEventListener("click", () => {
  pauseCountdown();
  playButton.classList.remove("pointer-events-none", "opacity-50");
  pauseButton.classList.add("pointer-events-none", "opacity-50");
});

resetButton.addEventListener("click", () => {
  resetCountdown();
});

playAudioButton.addEventListener("click", () => {
  bellSound.play();
  playAudioButton.classList.add("pointer-events-none", "opacity-50");
  stopAudioButton.classList.remove("pointer-events-none", "opacity-50");
});
stopAudioButton.addEventListener("click", () => {
  bellSound.pause();
  playAudioButton.classList.remove("pointer-events-none", "opacity-50");
  stopAudioButton.classList.add("pointer-events-none", "opacity-50");
});

bellSound.addEventListener("ended", function () {
  playAudioButton.classList.remove("pointer-events-none", "opacity-50");
});
