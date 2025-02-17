// Core Variables
let data = 0;
let storedAnswer;
let min = 0;
let sec = 0;
let mili = 0;
let timerInterval;
let totalQuestions = 10; // Total number of questions
let currentQuestion = 1; // Start with the first question

// DOM Elements
const questionEl = document.getElementById("question");
const questionFormEl = document.getElementById("questionForm");
const answerInput = document.getElementById("answerInput");
const rootEl = document.getElementById("root");
const timerEl = document.getElementById("timer-text");
const countdownEl = document.getElementById("countdown");
const demoEl = document.getElementById("demo");
const tableTimeEl = document.getElementById("tableTime");
const highestEl = document.getElementById("highest");
const lowestEl = document.getElementById("lowest");
const msgTxt = document.getElementById("message-text");
const completeMsg = document.getElementById("completeMsgId");

// Start Timer
function startTimer() {
  timerInterval = setInterval(() => {
    mili++;
    if (mili === 100) {
      sec++;
      mili = 0;
    }
    if (sec === 60) {
      min++;
      sec = 0;
    }
    timerEl.innerText = `${min} : ${sec} : ${mili}`;
  }, 10);
}

// Generate Random Number
const randomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

// Generate and Display Question
const generateQuestion = () => {
  const randomNumber1 = randomNumber(100, 999);
  const randomNumber2 = randomNumber(10, 99);
  const question = `${randomNumber1} + ${randomNumber2} = ?`;
  const answer = randomNumber1 + randomNumber2;
  return { question, answer };
};

const showQuestion = () => {
  const { question, answer } = generateQuestion();
  questionEl.innerText = question;
  rootEl.innerText = `Q.${currentQuestion}`; // Display current question number
  storedAnswer = answer;
};

const nextQuestion = () => {
  currentQuestion++;
  if (currentQuestion <= totalQuestions) {
    showQuestion();
  } else {
    completeMsg.style.display = "block";
    clearInterval(timerInterval); // Stop Timer
    let newTime = min * 60 + sec;

    // Save to Local Storage
    if (!localStorage.getItem('time_data_a32')) {
      localStorage.setItem('time_data_a32', '[]');
    }
    let oldTime = JSON.parse(localStorage.getItem('time_data_a32'));
    oldTime.push(newTime);
    localStorage.setItem('time_data_a32', JSON.stringify(oldTime));

    // Display Timer and Reset Logic
    demoEl.innerHTML = `You Took: ${min} : ${sec} : ${mili}<br>Time Saved in Table`;



    // Dynamically update the table
    displayTimeTable();
    findMinMax();

    // Update Graph Data
    updateGraphData(); 

    // Reset after showing the time
    resetQuiz();
  }
};

// Validate User Answer
const checkAnswer = (event) => {
  event.preventDefault();
  const userAnswer = +answerInput.value;

  if (userAnswer === storedAnswer) {
    document.body.classList.remove('red-wrong');
    answerInput.value = '';
    nextQuestion();
  } else {
    document.body.classList.add('red-wrong');
    answerInput.value = '';
    answerInput.placeholder = 'Enter Your Answer';
  }
};

// Display Recent Times in Table
function displayTimeTable() {
  if (localStorage.getItem('time_data_a32')) {
    let timeArray = JSON.parse(localStorage.getItem('time_data_a32'));
    let lastFive = timeArray.slice(-5);
    let outputHTML = "";

    lastFive.forEach(time => {
      let minutes = Math.floor(time / 60);
      let seconds = String(time % 60).padStart(2, '0'); // Add leading zero if needed for seconds
      outputHTML += `<tr><td>${minutes}m : ${seconds}s</td></tr>`;
    });

    tableTimeEl.innerHTML = outputHTML;
  }
}

// Find Min/Max Times
function findMinMax() {
  if (localStorage.getItem('time_data_a32')) {
    let timeArray = JSON.parse(localStorage.getItem('time_data_a32'));
    let minValue = Math.min(...timeArray);
    let maxValue = Math.max(...timeArray);

    let minMinutes = Math.floor(minValue / 60);
    let minSeconds = String(minValue % 60).padStart(2, '0');    
    highestEl.innerText = `${minMinutes} min : ${minSeconds} sec`;

    let maxMinutes = Math.floor(maxValue / 60);
    let maxSeconds = String(maxValue % 60).padStart(2, '0');    
    lowestEl.innerText = `${maxMinutes} min : ${maxSeconds} sec`;
  }
}
//this part is moved to common.js

// Reset Button Logic
function resetQuizButton() {
  // Clear the stored timer values and table data
  localStorage.removeItem('time_data_a32');
  displayTimeTable(); // Refresh the table after reset

  // Reset the quiz to its initial state
  resetQuiz();
  demoEl.innerText = ""; // Clear any demo messages
  highestEl.innerText = "0 Sec";
  lowestEl.innerText = "0 Sec";
  clearInterval(timerInterval);
  timerEl.innerText = "00 : 00 : 00"; // Reset timer display
  currentQuestion = 1; // Reset the question counter
  showQuestion(); // Show the first question again
}

// Start Button Logic (Triggers quiz start)
function startQuiz() {
  document.getElementById("primary-btn").style.display = "block";
  document.getElementById("answerInput").style.display = "block";
  startTimer();
  showQuestion();
}

// Delete table data and refresh display
function deleteItems() {
  // Remove data from localStorage
  localStorage.removeItem("time_data_a32");
  graphData = [];

  // Refresh the table after deleting data
  tableTimeEl.innerHTML = ''; // Clear the table data display

  // Optional: Reset the min/max values as well
  highestEl.innerText = "0 Sec";
  lowestEl.innerText = "0 Sec";

  demoEl.innerText = "Table data has been cleared!";
  updateGraphData(); // Update graphs after deleting data
  resetQuiz();
}





// Update Graph Data
function updateGraphData() {
  // Retrieve time data from localStorage
  let graphData = JSON.parse(localStorage.getItem('time_data_a32')) || [];

  if (graphData.length === 0) {
    console.log('No data available.');
    return; // No data available to plot
  }

  // Prepare the data for the line chart (Last 5 entries)
  const lastFive = graphData.slice(-5);  // Get the last 5 times
  const labels = ['1', '2', '3', '4', '5'];  // Labels for the last 5 data points

  function convertToMinutesAndSeconds(secondsArray) {
    return secondsArray.map(seconds => {
        const minutes = Math.floor(seconds / 60); // Get minutes
        const remainingSeconds = seconds % 60;  // Get remaining seconds
        // Return formatted string with leading zero if needed
        return `${minutes}.${remainingSeconds.toString().padStart(2, '0')}`;
    });
}

// Example usage:
const inputArray = lastFive;
const result = convertToMinutesAndSeconds(inputArray);


  // Update the line chart with raw data in seconds
  if (window.myLineChart) {
    window.myLineChart.data.labels = labels;
    window.myLineChart.data.datasets[0].data = result;
    window.myLineChart.update(); // Update the chart
  }

  // Update the min/max/current data for the bar chart
  const maxTime = Math.max(...result);
  const minTime = Math.min(...result);
  const currentTime = result[result.length - 1];

  // Prepare the data for the bar chart
  const barLabels = ['Maximum', 'Current', 'Minimum'];
  const barData = [maxTime, currentTime, minTime];

  // Update the bar chart with raw data in seconds
  if (window.myBarChart2) {
    window.myBarChart2.data.labels = barLabels;
    window.myBarChart2.data.datasets[0].data = barData;
    window.myBarChart2.update(); // Update the chart
  }
}







// Load time data from local storage
let graphData = JSON.parse(localStorage.getItem('time_data_a32')) || [];

// Initialize the Line Chart (If not already initialized)
const ctxLine = document.getElementById('myLineChart').getContext('2d');
window.myLineChart = new Chart(ctxLine, {
  type: 'line',
  data: {
    labels: ['1', '2', '3', '4', '5'],  // Sample labels
    datasets: [{
      label: 'Last 5 times in mm:ss',
      data: [], // Empty data at first
      fill: false,
      borderColor: 'rgba(75, 192, 192, 1)',
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      borderWidth: 2,
      tension: 0.4,
      pointBackgroundColor: 'rgba(75, 192, 192, 1)',
      pointBorderColor: '#fff',
      pointBorderWidth: 1,
    }]
  },
  options: {
    scales: {
      y: {
        grid: {
          color: 'rgba(0, 0, 0, 0.5)'
        }
      },
      x: {
        grid: {
          color: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }
  }
});

// Initialize the Bar Chart for Max/Min/Current
const ctxBar = document.getElementById('myBarChart2').getContext('2d');
window.myBarChart2 = new Chart(ctxBar, {
  type: 'bar',
  data: {
    labels: ['Maximum', 'Current', 'Minimum'],
    datasets: [{
      label: 'Max and Min time in mm:ss',
      data: [], // Empty data at first
      backgroundColor: [
        'rgba(255, 0, 0, 0.5)',
        'rgba(0, 0, 255, 0.5)',
        'rgba(0, 128, 0, 0.5)'
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)'
      ],
      borderWidth: 1
    }]
  }
});


// Load table values when page loads
window.onload = function() {
  displayTimeTable();
  updateGraphData();
  findMinMax();
};