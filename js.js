// -- Variables

// Global variables
let compChoice; 
let userChoice;
let compScore = 0;
let userScore = 0;
let roundNumber = 0;

// Elements
const messageEl = document.getElementById("gameMessage");
const showButton = document.getElementById("showDialog");
const rpsDialog = document.getElementById("rpsDialog");
const selectEl = rpsDialog.querySelector("select");
const confirmBtn = rpsDialog.querySelector("#confirmBtn");

// ///////////////////////////////////////////////////////////////////////////////////////////////////////////


// -- Comp Choice

// Function to get computer choice
function getCompChoice(num) 
{
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

// Function to handle user choice
function getUserChoice() 
{
    return new Promise((resolve) => {
        // Reset the select value for the dialog
        selectEl.value = "default";

        // prompt to choose rock paper or scissors
        messageEl.textContent = "Please choose Rock, Paper, or Scissors!";

        rpsDialog.showModal(); // Open the dialog
        
        // on clicking the confirm button
        confirmBtn.addEventListener(
            "click",
            (event) => {
                // prevent default behaviors
                event.preventDefault();

                // assign the selected value to a variable selectedValue
                const selectedValue = selectEl.value;

                // check whether selected value is valid 
                if (selectedValue === "default") {
                    messageEl.textContent = "Invalid choice. Please select again.";
                    return; // Don't proceed until valid choice
                }

                // assign valid selection to userChoice
                userChoice = selectedValue;

                // close the choice dialog after successful submission
                rpsDialog.close();

                // check whether userChoice was assigned successfully
                // console.log(`User Choice: ${userChoice}`);

                // Resolve the promise with the user choice
                resolve(userChoice);
            },
            { once: true } // Ensure the event listener is added only once
        );
    });
}

// ///////////////////////////////////////////////////////////////////////////////////////////////////////////


// -- Play a Round

// Function to play a round
function playRound(compSelection, userSelection) 
{
    // check whether compSelection and userSelection are initialized
    console.log(`Round - Computer: ${compSelection}, User: ${userSelection}`);

    // Game Logic

    // User choice Scissors:
    if (userSelection === "Scissors" && compSelection === "Paper") {
        messageEl.textContent = 'You Win! Scissors Beats Paper';
        userScore++;
    } else if (userSelection === "Scissors" && compSelection === "Rock") {
        messageEl.textContent = 'You Lose! Rock Beats Scissors';
        compScore++;
        
    // User Choice Rock:
    } else if (userSelection === "Rock" && compSelection === "Scissors") {
        messageEl.textContent = 'You Win! Rock Beats Scissors';
        userScore++;
    } else if (userSelection === "Rock" && compSelection === "Paper") {
        messageEl.textContent = 'You Lose! Paper Beats Rock';
        compScore++;

    // User Choice Paper:
    } else if (userSelection === "Paper" && compSelection === "Rock") {
        messageEl.textContent = 'You Win! Paper Beats Rock';
        userScore++;
    } else if (userSelection === "Paper" && compSelection === "Scissors") {
        messageEl.textContent = 'You Lose! Scissors Beats Paper';
        compScore++;

    // For Draws
    } else {
        messageEl.textContent = "It's a Draw!";
    }

    // check whether message element was updated in console
    console.log(messageEl.textContent);
}

// ///////////////////////////////////////////////////////////////////////////////////////////////////////////


// -- Start The Game

// Start Game function
async function startGame() 
{
    // Reset scores and rounds
    compScore = 0;
    userScore = 0;
    roundNumber = 0;

    // Play 5 rounds
    while (roundNumber < 5) {

        // increment roundNumber
        roundNumber++;

        // Initialize compChoice
        compChoice = getCompChoice(3);

        // Wait for user choice
        const userSelection = await getUserChoice();

        // Play the round
        playRound(compChoice, userSelection);

        // Display scores after each round
        
        console.log(`Round ${roundNumber} - Scores: User ${userScore}, Computer ${compScore}`);
        
        console.log("Play Next Round: Select New Choice...");
        console.log(`// /////////////////////
            `);
    }

    // Declare the winner after 5 rounds
    if (userScore > compScore) {
        messageEl.textContent = `You win the game! Final Score: User ${userScore} - Computer ${compScore}`;
    } else if (compScore > userScore) {
        messageEl.textContent = `Computer wins the game! Final Score: User ${userScore} - Computer ${compScore}`;
    } else {
        messageEl.textContent = `It's a draw! Final Score: User ${userScore} - Computer ${compScore}`;
    }

    // Reset the game state
    console.log("Game over. Resetting...");
    compScore = 0;
    userScore = 0;
    roundNumber = 0;
}

// Add event listener to start the game when clicking the button
showButton.addEventListener("click", startGame);
