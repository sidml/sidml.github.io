let availableAmountArr = [25];
let countdown;
let timeRemaining = 300; // 5 minutes in seconds
let gameStarted = false;
// Get input elements
let winProbabilityInput, winReturnInput, loseReturnInput;

// // Get input elements
// const winProbabilityInput = document.getElementById('winProbabilityInput');
// const winReturnInput = document.getElementById('winReturnInput');
// const loseReturnInput = document.getElementById('loseReturnInput');

// Get display elements
const displayWinProbability = document.getElementById('displayWinProbability');
const displayWinReturn = document.getElementById('displayWinReturn');
const displayLoseReturn = document.getElementById('displayLoseReturn');
const gameSettings = document.getElementById('gameSettings');

// Function to toggle visibility of settings inputs
function toggleSettingsInputs(displayProperty) {
  document.getElementById('winReturnLabel').style.display = displayProperty;
  document.getElementById('loseReturnLabel').style.display = displayProperty;
  document.getElementById('winProbabilityLabel').style.display = displayProperty;
  winReturnInput.style.display = displayProperty;
  loseReturnInput.style.display = displayProperty;
  winProbabilityInput.style.display = displayProperty;
}

function startTimer() {
  countdown = setInterval(function() {
    const minutes = Math.floor(timeRemaining / 60);
    let seconds = timeRemaining % 60;
    seconds = seconds < 10 ? '0' + seconds : seconds;
    document.getElementById('timer').innerText = `Time remaining: 0${minutes}:${seconds}`;
    
    if (timeRemaining === 0 || parseFloat(document.getElementById('availableAmount').innerText) === 0) {
      clearInterval(countdown);
      document.getElementById('headButton').disabled = true;
      document.getElementById('tailButton').disabled = true;
      document.getElementById('resetButton').disabled = false;
      if (parseFloat(document.getElementById('availableAmount').innerText) === 0) {
        document.getElementById('outcomeText').innerText = 'Game is Finished. Click on reset to start a new game.';
      }
    } else {
      timeRemaining--;
    }
  }, 1000);
}

function resetGame() {
  clearInterval(countdown);
  timeRemaining = 300;
  document.getElementById('timer').innerText = 'Time remaining: 05:00';
  document.getElementById('headButton').disabled = false;
  document.getElementById('tailButton').disabled = false;
  document.getElementById('resetButton').disabled = true;
  availableAmountArr = [25];
  document.getElementById('availableAmount').innerText = '25';
  document.getElementById('outcomeText').innerText = '';
  document.getElementById('outcomeText').style.color = 'black';
  gameStarted = false;
  document.getElementById('winProbabilityInput').disabled = false;
  Plotly.newPlot('plot', [], {
    title: 'Available Amount Over Bids',
    xaxis: { title: 'Bids' },
    yaxis: { title: 'Available Amount' }
  });
  // Hide game settings on reset
  gameSettings.style.display = 'none';  
}

// // Assuming these variables and elements exist globally
// let gameStarted = false;
// const gameSettings = document.getElementById('gameSettings');
// const displayWinProbability = document.getElementById('displayWinProbability');
// const displayWinReturn = document.getElementById('displayWinReturn');
// const displayLoseReturn = document.getElementById('displayLoseReturn');
// const winProbabilityInput = document.getElementById('winProbability');
// const winReturnInput = document.getElementById('winReturn');
// const loseReturnInput = document.getElementById('loseReturn');
// let availableAmountArr = [];

function handleBid(isHead) {
  if (!gameStarted) {
    gameStarted = true;
    startTimer(); // Start the timer when the user clicks the first bid
    // document.getElementById('winProbability').disabled = true;
  }

  // Display game settings during the game
  gameSettings.style.display = 'block';
  displayWinProbability.textContent = winProbabilityInput.value;
  displayWinReturn.textContent = winReturnInput.value;
  displayLoseReturn.textContent = loseReturnInput.value;  

  let availableAmount = parseFloat(document.getElementById('availableAmount').innerText);
  let winReturn = winReturnInput.value;
  let loseReturn = loseReturnInput.value;
  let winProbability = winProbabilityInput.value;
  let bidAmount = parseFloat(document.getElementById('bidAmount').value);

  if (bidAmount <= 0 || bidAmount > availableAmount) {
    document.getElementById('outcomeText').innerText = 'Invalid bid amount. Please enter a valid amount.';
    return;
  }

  let randomChance = Math.floor(Math.random() * 100) + 1;
  let isWin = randomChance <= winProbability;

  if (isHead && isWin) {
    availableAmount += (winReturn - 1) * bidAmount;
    document.getElementById('outcomeText').innerText = 'Congratulations! You won $' + (winReturn * bidAmount - bidAmount) + '.';
    document.getElementById('outcomeText').style.color = 'green';
  } else if (!isHead && !isWin) {
    availableAmount += (winReturn - 1) * bidAmount;
    document.getElementById('outcomeText').innerText = 'Congratulations! You won $' + (winReturn * bidAmount - bidAmount) + '.';
    document.getElementById('outcomeText').style.color = 'green';
  } else {
    availableAmount -= bidAmount * loseReturn;
    document.getElementById('outcomeText').innerText = 'Sorry, you lost $' + bidAmount + '.';
    document.getElementById('outcomeText').style.color = 'red';
  }

  availableAmountArr.push(availableAmount);
  document.getElementById('availableAmount').innerText = availableAmount.toFixed(2);

  // Define Layout
  const layout = {
    xaxis: {range: [0, availableAmountArr.length+5], title: "Bids"},
    yaxis: {range: [0, Math.max.apply(null, availableAmountArr)+5], title: "Available Amount"},  
    title: "Available Amount Over Bids"
  };
  Plotly.newPlot('plot', [{
    y: availableAmountArr,
    type: 'scatter',
    mode: 'lines+markers',
    marker: { color: 'blue' },
    line: { shape: 'spline' }
  }], layout);
}

// Add event listeners to the new buttons
document.getElementById('headButton').addEventListener('click', function() {
  handleBid(true);
});

document.getElementById('tailButton').addEventListener('click', function() {
  handleBid(false);
});

document.getElementById('resetButton').addEventListener('click', resetGame);

// Add event listener for the start button to set game settings
document.getElementById('startButton').addEventListener('click', function () {
  // Get user-inputted values after the click event
  winProbabilityInput = document.getElementById('winProbabilityInput');
  winReturnInput = document.getElementById('winReturnInput');
  loseReturnInput = document.getElementById('loseReturnInput');
  // Validate inputs if needed

  // Show game settings after setting values
  gameSettings.style.display = 'block';
  displayWinProbability.textContent = winProbabilityInput.value;
  displayWinReturn.textContent = winReturnInput.value;
  displayLoseReturn.textContent = loseReturnInput.value;

  // Disable input fields after setting game settings
  winProbabilityInput.disabled = true;
  winReturnInput.disabled = true;
  loseReturnInput.disabled = true;

  // Hide the settings inputs without leaving a gap
  toggleSettingsInputs('none');  
  // Enable the bid button after setting the game settings
  document.getElementById('headButton').disabled = false;
  document.getElementById('tailButton').disabled = false;
});