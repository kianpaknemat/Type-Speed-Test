const theTimer = document.querySelector(".timer");
const testArea = document.querySelector("#test-area");
const testWrapper = document.querySelector(".test-wrapper");
const resetButton = document.querySelector("#reset");
const NewOriginText = [
  "jfdk jjj ddj kks ls ldj jdk ksldjjfds!",
  "jdksl lsjd lssls kdjf lsjd",
  "ksldk kdsljd kslj dkslj",
]; 

let originText = "";
let timer = [0, 0, 0];
let timerRunning = false;
let interval;
let startTime = null;

function leadingZero(time) {
  return time <= 9 ? "0" + time : time;
}

function runTimer() {
  let elapsedTime = Date.now() - startTime;

  timer[0] = Math.floor(elapsedTime / 60000);
  timer[1] = Math.floor((elapsedTime % 60000) / 1000);
  timer[2] = Math.floor((elapsedTime % 1000) / 10);

  let currentTime =
    leadingZero(timer[0]) +
    ":" +
    leadingZero(timer[1]) +
    ":" +
    leadingZero(timer[2]);

  theTimer.innerHTML = currentTime;
}

function spellCheck() {
  let textEntered = testArea.value;
  let originTextMatch = originText.substring(0, textEntered.length);

  if (textEntered === originText) {
    testWrapper.style.borderColor = "green";
    clearInterval(interval);
  } else {
    testWrapper.style.borderColor =
      textEntered === originTextMatch ? "yellow" : "red";
  }
}

function reset() {
  clearInterval(interval);
  interval = null;
  timer = [0, 0, 0];
  timerRunning = false;
  startTime = null;

  testArea.value = "";
  theTimer.innerHTML = "00:00:00";
  testWrapper.style.borderColor = "grey";

  originText = NewOriginText[Math.floor(Math.random() * NewOriginText.length)];

  document.getElementById("origin-text").innerHTML = originText;

  console.log("New Text:", originText); 
}

function Start() {
  if (!timerRunning) {
    timerRunning = true;
    startTime = Date.now(); 
    interval = setInterval(runTimer, 10);
  }
}

originText = NewOriginText[Math.floor(Math.random() * NewOriginText.length)];
document.getElementById("origin-text").innerHTML = originText; 
console.log("Starting Text:", originText);

testArea.addEventListener("keypress", Start);
testArea.addEventListener("keyup", spellCheck);
resetButton.addEventListener("click", reset);
