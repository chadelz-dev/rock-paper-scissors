// -- Variables

// Global variables
let compChoice;
let userChoice;
let compScore = 0;
let userScore = 0;
let roundNumber = 0;
let gameOverMessage = `Game Over - choose your weapon to play again!`;
let winningRoundMessage;
let losingRoundMessage;
let drawRoundMessage;

// Elements
const scissorButton = document.querySelector("#scissors");
const paperButton = document.querySelector("#paper");
const rockButton = document.querySelector("#rock");
const displayResultsDiv = document.querySelector(".displayResults");
const buttonsContainerDiv = document.querySelector(".buttonsContainer");
const resultsHeading = document.querySelector(".resultsHeading");
const resultsMessage = document.querySelector(".resultsMessage");
const playNextRoundMessage = document.createElement("p");
const roundChoices = document.createElement("p");

resultsHeading.textContent = "Choose your weapon!";
resultsMessage.textContent = "First to 5 wins!";
playNextRoundMessage.textContent = "Choose your weapon to play next round!";

// ///////////////////////////////////////////////////////////////////////////////////////////////////////////

// -- CSS settings using JS

// bg colour
document.body.style.backgroundColor = "#C3D69B";

// flexbox on body
document.body.style.height = "100vh";
document.body.style.display = "flex";
document.body.style.justifyContent = "center";
document.body.style.alignItems = "center";
document.body.style.flexDirection = "column";

// font colours
document.body.style.fontFamily = "Tahoma";
document.body.style.color = "white";

// buttons
let buttons = document.querySelectorAll(".btn");

buttons.forEach((button) => {
  button.style.padding = "10px 20px";
  button.style.margin = "5px";
  button.style.border = "1px solid white";
  button.style.backgroundColor = "white";
  button.style.color = "#A0B069";
  button.style.borderRadius = "10px";
  button.style.fontWeight = "bold";
});

// result message and heading
resultsMessage.style.textAlign = "center";
resultsHeading.style.textAlign = "center";
roundChoices.style.textAlign = "center";
playNextRoundMessage.style.textAlign = "center";

// ///////////////////////////////////////////////////////////////////////////////////////////////////////////

// -- Comp Choice

// Function to get computer choice
function getCompChoice(num) {
  // generate a random num using the compChoice variable in StartGame method
  const choiceNum = Math.floor(Math.random() * num);

  // assign that number to an actual RPS value
  if (choiceNum === 0) compChoice = "Scissors";
  else if (choiceNum === 1) compChoice = "Paper";
  else compChoice = "Rock";

  // return the compChoice for use
  return compChoice;
}

// ///////////////////////////////////////////////////////////////////////////////////////////////////////////

// -- User Choice

// get user choice from button click
scissorButton.addEventListener("click", () => {
  userChoice = "Scissors";
  playRound(compChoice, userChoice);
});

paperButton.addEventListener("click", () => {
  userChoice = "Paper";
  playRound(compChoice, userChoice);
});

rockButton.addEventListener("click", () => {
  userChoice = "Rock";
  playRound(compChoice, userChoice);
});

// ///////////////////////////////////////////////////////////////////////////////////////////////////////////

// -- Play a Round

// Function to play a round
function playRound(compChoice, userChoice) {
  // Initialize compChoice for each round
  compChoice = getCompChoice(3);
  roundChoices.textContent = `User choice: ${userChoice}, Computer choice: ${compChoice}`;

  // Game Logic
  if (userChoice === "Scissors" && compChoice === "Paper") {
    userScore++;
    roundNumber++;
  } else if (userChoice === "Scissors" && compChoice === "Rock") {
    compScore++;
    roundNumber++;
  } else if (userChoice === "Rock" && compChoice === "Scissors") {
    userScore++;
    roundNumber++;
  } else if (userChoice === "Rock" && compChoice === "Paper") {
    compScore++;
    roundNumber++;
  } else if (userChoice === "Paper" && compChoice === "Rock") {
    userScore++;
    roundNumber++;
  } else if (userChoice === "Paper" && compChoice === "Scissors") {
    compScore++;
    roundNumber++;
  } else {
    roundNumber++;
  }

  // Update messages after the scores are updated
  winningRoundMessage = `You won the previous Round: User: ${userScore}  -  Comp: ${compScore}`;
  losingRoundMessage = `You Lost the previous Round: User: ${userScore}  -  Comp: ${compScore}`;
  drawRoundMessage = `Draw previous round:  User: ${userScore}  -  Comp: ${compScore}`;

  // Display appropriate message
  if (
    (userChoice === "Scissors" && compChoice === "Paper") ||
    (userChoice === "Rock" && compChoice === "Scissors") ||
    (userChoice === "Paper" && compChoice === "Rock")
  ) {
    resultsMessage.textContent = winningRoundMessage;
  } else if (
    (userChoice === "Scissors" && compChoice === "Rock") ||
    (userChoice === "Rock" && compChoice === "Paper") ||
    (userChoice === "Paper" && compChoice === "Scissors")
  ) {
    resultsMessage.textContent = losingRoundMessage;
  } else {
    resultsMessage.textContent = drawRoundMessage;
  }

  // Update results heading and display round details
  resultsHeading.textContent = `Round ${roundNumber + 1}`;
  displayResultsDiv.appendChild(roundChoices);
  buttonsContainerDiv.appendChild(playNextRoundMessage);

  // Declare the winner after 5 rounds
  if (roundNumber === 5) {
    if (userScore > compScore) {
      resultsMessage.textContent = `You Win this Game: User ${userScore}  -  Comp: ${compScore}`;
    } else if (compScore > userScore) {
      resultsMessage.textContent = `You Lose this Game: User ${userScore}  -  Comp: ${compScore}`;
    } else {
      resultsMessage.textContent = `Draw This Game: User: ${userScore}  -  Comp: ${compScore}`;
    }
    resultsHeading.textContent = gameOverMessage;

    // Reset scores and rounds
    compScore = 0;
    userScore = 0;
    roundNumber = 0;
    buttonsContainerDiv.removeChild(playNextRoundMessage);
  }

  // Log the results
  console.log(resultsMessage.textContent);
}

// ///////////////////////////////////////////////////////////////////////////////////////////////////////////
