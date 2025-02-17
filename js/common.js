
//core code moved from main js

// Start Timer on Start Button Click
function myFunction() {
  document.getElementById("primary-btn").style.display = "block";
  document.getElementById("answerInput").style.display = "block";
  msgTxt.style.display = "none";
  completeMsg.style.display = "none";
  startTimer(); // Start the timer when the button is clicked
  showQuestion(); // Show the first question
  document.getElementById('counter-btn').disabled = true;
}

// Reset Quiz and Timer
function resetQuiz() {
  min = 0;
  sec = 0;
  mili = 0;
  currentQuestion = 1;
  clearInterval(timerInterval);
  timerEl.innerText = "00 : 00 : 00";
  rootEl.innerText = "";
  questionEl.innerText = "";
  answerInput.value = "";
  demoEl.innerText = "";
  msgTxt.style.display = "block";
  // completeMsg.style.display = "none";
  answerInput.style.display = "none";
  document.getElementById("primary-btn").style.display = "none";
  document.getElementById('counter-btn').disabled = false;
}









// Dark Mode Code
const body = document.querySelector('body');
const button = document.querySelector('#darkbutton');
function toggleDark() {
    if (body.classList.contains('dark-mode')) {
        body.classList.remove('dark-mode');
        localStorage.setItem("theme", "light");
        button.innerHTML = "☽";
        button.style.color = "black";
    } else {
        body.classList.add('dark-mode');
        localStorage.setItem("theme", "dark-mode");
        button.innerHTML = "☀";
        button.style.color = "yellow";
    }
}

if (localStorage.getItem("theme") === "dark-mode") {
    body.classList.add('dark-mode');
    button.innerHTML = "☀";
    button.style.color = "yellow";
}

document.querySelector('#darkbutton').addEventListener('click', toggleDark);


// Function to update the last score in mm:ss format
function updateLastScore(storageKey, elementId) {
    const timeData = localStorage.getItem(storageKey);
    let lastScore = "Attempt Now";

    if (timeData) {
        const timeArray = JSON.parse(timeData);
        if (timeArray.length > 0) {
            const lastTime = timeArray[timeArray.length - 1]; // Get the last element
            const minutes = Math.floor(lastTime / 60); // Convert seconds to minutes
            const seconds = lastTime % 60; // Get the remaining seconds
            lastScore = `${minutes.toString().padStart(2, '0')} min:${seconds.toString().padStart(2, '0')} sec`; // Format as mm:ss
        }
    }

    document.getElementById(elementId).innerHTML = lastScore;
}

// Update last score for 2x2 addition
updateLastScore('time_data_m22', 'lastScore_m22');

// Update last score for 3x2 multiplication
updateLastScore('time_data_m32', 'lastScore_m32');

// Update last score for 3x3 multiplication
updateLastScore('time_data_m33', 'lastScore_m33');

// Update last score for 2x2 multiplication
updateLastScore('time_data_division', 'lastScore_d');

// Update last score for 2+2 addition
updateLastScore('time_data_a22', 'lastScore_a22');

// Update last score for 2+3 addition
updateLastScore('time_data_a23', 'lastScore_a23');

// Update last score for 3+2+3 addition
// updateLastScore('time_data_a33', 'lastScore_a323');

// Update last score for 3+3 addition
updateLastScore('time_data_a33', 'lastScore_a33');

// Update last score for 2-2 substraction
updateLastScore('time_data_s22', 'lastScore_s22');

// Update last score for 2-3 substraction
updateLastScore('time_data_s23', 'lastScore_s23');

// Update last score for 3-2-3 substraction
// updateLastScore('time_data_s33', 'lastScore_s323');

// Update last score for 3-3 substraction
updateLastScore('time_data_s33', 'lastScore_s33');

//time_data_division
updateLastScore('time_data_division', 'lastScore_d');

//time_data_sq230
updateLastScore('time_data_sq230', 'lastScore_s230');

//time_data_sq31
updateLastScore('time_data_sq31', 'lastScore_s31');

//time_data_sqrt
updateLastScore('time_data_sqrt', 'lastScore_sqrt');

//time_data_cu220
updateLastScore('time_data_cu220', 'lastScore_cu220');

//time_data_cbrt_2_20
updateLastScore('time_data_cbrt_2_20', 'lastScore_cbrt220');


// Multiplication (2 x 2)
// 2Multiplication (3 x 2)
// 3Multiplication (3 x 3)
// 4Subtraction (2 - 2)
// 5Subtraction (3 - 3)
// 6Subtraction (3 - 2)
// 7Subtraction (3 - 2 - 3)
// 8Addition (2 x 2)
// 9Addition (3 + 3)
// 10Addition (3 + 2)
// 11Addition (3 + 2 + 3)
// 12Division
// 13Squre (2 to 30)
// 14Squre (31 to 151)
// 15Cube (2 to 20)
// 16Squre Root
// 17Cube Root
// 18Table (Upto to 30)
// 19Table (11 to 100)


function switchTab(tab) {
    // Hide both sections initially
    document.getElementById('tableDiv').classList.remove('active');
    document.getElementById('chartDiv').classList.remove('active');
    
    // Remove the active class from both tab buttons
    document.getElementById('tableTab').classList.remove('active');
    document.getElementById('chartTab').classList.remove('active');

    // Show the selected tab's content
    if (tab === 'table') {
        document.getElementById('tableDiv').classList.add('active');
        document.getElementById('tableTab').classList.add('active');
    } else if (tab === 'chart') {
        document.getElementById('chartDiv').classList.add('active');
        document.getElementById('chartTab').classList.add('active');
    }
}

// Initialize with the 'table' tab active by default (no need to call this as it's set in the HTML)




// Set Total Questions and Toggle Active Button Class
function setTotalQuestions(num) {
  // Set the total number of questions
  totalQuestions = num;
  currentQuestion = 1;  // Reset to the first question
  
  // Toggle the active class on the buttons
  document.getElementById('btn10').classList.remove('active');
  document.getElementById('btn20').classList.remove('active');
  
  if (num === 2) {
    document.getElementById('btn10').classList.add('active');
  } else {
    document.getElementById('btn20').classList.add('active');
  }
  
  resetQuiz(); // Reset the quiz (optional)
  showQuestion(); // Show the first question
}
