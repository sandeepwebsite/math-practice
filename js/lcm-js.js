// Function to find GCD (Greatest Common Divisor)
function gcd(a, b) {
    return b === 0 ? a : gcd(b, a % b);
}

// Function to find LCM of two numbers
function lcm(a, b) {
    return (a * b) / gcd(a, b);
}

// Function to find LCM of three numbers
function lcmOfThree(a, b, c) {
    return lcm(lcm(a, b), c);
}

// Quiz Variables
let num1, num2, num3, correctAnswer;
let questionCount = 0;
let totalQuestions = 10;
let startTime;
let timerInterval;

// Function to format time in MM:SS.ms
function formatTime(ms) {
    let minutes = Math.floor(ms / 60000);
    let seconds = Math.floor((ms % 60000) / 1000);
    let milliseconds = Math.floor(ms % 60);
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}.${String(milliseconds).padStart(2, "0")}`;
}

// Function to start the quiz
function startQuiz() {
    document.getElementById("startButton").style.display = "none"; // Hide Start button
    document.getElementById("quizSection").style.display = "block"; // Show quiz section
    document.getElementById("timer").innerText = "00:00.00";
    startTimer();
    generateQuiz();
}

// Function to start the quiz timer
function startTimer() {
    startTime = performance.now();
    timerInterval = setInterval(() => {
        let elapsedTime = performance.now() - startTime;
        document.getElementById("timer").innerText = formatTime(elapsedTime);
    }, 10);
}

// Function to generate a new LCM question
function generateQuiz() {
    num1 = Math.floor(Math.random() * 20) + 1;
    num2 = Math.floor(Math.random() * 20) + 1;
    num3 = Math.floor(Math.random() * 20) + 1;

    correctAnswer = lcmOfThree(num1, num2, num3);

    document.getElementById("numbers").innerText = `${num1}, ${num2}, ${num3}`;
    document.getElementById("result").innerText = "";
    document.getElementById("userAnswer").value = "";
}

// Function to check the answer and proceed to the next question
function checkAnswer() {
    let userAnswer = parseInt(document.getElementById("userAnswer").value);

    if (userAnswer === correctAnswer) {
        questionCount++;

        if (questionCount < totalQuestions) {
            document.getElementById("questionCount").innerText = questionCount + 1;
            generateQuiz();
        } else {
            endQuiz();
        }
    } else {
        document.getElementById("result").innerText = "❌ Incorrect! Try again.";
        document.getElementById("result").style.color = "red";
    }
}

// Function to stop timer and save time in LocalStorage
function endQuiz() {
    clearInterval(timerInterval);
    let totalTime = performance.now() - startTime;
    saveTimeToLeaderboard(totalTime);
    alert(`Quiz Completed! Time Taken: ${formatTime(totalTime)}`);
    loadLeaderboard();
}

// Function to save time to LocalStorage
function saveTimeToLeaderboard(time) {
    let scores = JSON.parse(localStorage.getItem("lcm_quiz_scores")) || [];
    scores.push(time);
    scores.sort((a, b) => a - b); // Sort from fastest to slowest
    localStorage.setItem("lcm_quiz_scores", JSON.stringify(scores));
}

// Function to load and display leaderboard
function loadLeaderboard() {
    let scores = JSON.parse(localStorage.getItem("lcm_quiz_scores")) || [];
    let leaderboardBody = document.getElementById("leaderboardBody");
    leaderboardBody.innerHTML = "";

    scores.forEach((time, index) => {
        let row = `<tr><td>${index + 1}</td><td>${formatTime(time)}</td></tr>`;
        leaderboardBody.innerHTML += row;
    });
}

// Function to restart the quiz
function restartQuiz() {
    questionCount = 0;
    document.getElementById("questionCount").innerText = "1";
    document.getElementById("quizSection").style.display = "none";
    document.getElementById("startButton").style.display = "block";
    clearInterval(timerInterval);
}

// Start leaderboard on page load
window.onload = function () {
    loadLeaderboard();
};
