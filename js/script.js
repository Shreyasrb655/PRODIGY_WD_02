let startTime = 0;
let elapsedTime = 0;
let timerInterval;

const display = document.getElementById("display");
const progress = document.getElementById("progress");
const sound = document.getElementById("clickSound");

const radius = 90;
const circumference = 2 * Math.PI * radius;

progress.style.strokeDasharray = circumference;
progress.style.strokeDashoffset = circumference;

function formatTime(ms) {
    let s = Math.floor(ms / 1000);
    let h = Math.floor(s / 3600);
    let m = Math.floor((s % 3600) / 60);
    let sec = s % 60;
    let msPart = Math.floor((ms % 1000) / 10);

    return `${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}:${String(sec).padStart(2,'0')}.${String(msPart).padStart(2,'0')}`;
}

function update() {
    elapsedTime = Date.now() - startTime;
    display.innerText = formatTime(elapsedTime);

    let progressValue = (elapsedTime % 60000) / 60000;
    progress.style.strokeDashoffset = circumference * (1 - progressValue);
}

function startTimer() {
    if (timerInterval) return;
    sound.play();

    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(update, 10);
}

function pauseTimer() {
    sound.play();
    clearInterval(timerInterval);
    timerInterval = null;
}

function resetTimer() {
    sound.play();
    clearInterval(timerInterval);
    timerInterval = null;
    elapsedTime = 0;
    display.innerText = "00:00:00.00";
    progress.style.strokeDashoffset = circumference;
    document.getElementById("laps").innerHTML = "";
}

function addLap() {
    sound.play();
    let li = document.createElement("li");
    li.innerText = display.innerText;
    document.getElementById("laps").appendChild(li);
}

document.getElementById("start").onclick = startTimer;
document.getElementById("pause").onclick = pauseTimer;
document.getElementById("reset").onclick = resetTimer;
document.getElementById("lap").onclick = addLap;