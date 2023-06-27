let playerScore = 0;
let computerScore = 0;
let roundCount = 0;
let playerChoice;
let gameOver = false;

const buttons = document.querySelectorAll(".btn");
const playerScoreText = document.querySelector(".player-score");
const computerScoreText = document.querySelector(".computer-score");
const output = document.querySelector("#output");
// const roundData = [
//   { round: 1, imageURL: "" },
//   { round: 2, imageURL: "" },
//   { round: 3, imageURL: "" },
//   { round: 4, imageURL: "" },
//   { round: 5, imageURL: "" },
// ];
const repeatButton = document.querySelector(".button");
const again = document.querySelector(".again");

buttons.forEach((button) => {
  button.addEventListener("click", function () {
    if (!gameOver){
      playerChoice = button.id;
      game();
    }
  });
});

repeatButton.addEventListener("click", function () {
  restart();
});

function getComputerChoice() {
  let random = Math.round(Math.random() * 2);
  if (random == 0) {
    return "rock";
  } else if (random == 1) {
    return "paper";
  } else {
    return "scissors";
  }
}

function updateCardImage(imageURL) {
  const card = document.getElementById(`round${roundCount}`);
  const img = card.querySelector("img");
  const text = card.querySelector(".text");
  img.src = imageURL;
  img.classList.remove("placeholder");
  img.classList.add("temp");
  img.alt = `Round ${roundCount}`;
  text.classList.remove("placeholder");
  text.classList.add("temp");
}

function singleRound(playerSelection) {
  let computerSelection = getComputerChoice();
  if (playerSelection === computerSelection) {
    output.textContent = "This round was a tie!";
    updateCardImage("images/tie.png");
  } else {
    switch (playerSelection) {
      case "rock":
        if (computerSelection === "paper") {
          computerScore++;
          computerScoreText.textContent = "Computer: " + computerScore;
          output.textContent = "You lose! Paper beats rock.";
          updateCardImage("images/computer.png");
        } else {
          playerScore++;
          playerScoreText.textContent = "Player: " + playerScore;
          output.textContent = "You win! Rock beats scissors.";
          updateCardImage("images/player.png");
        }
        break;
      case "paper":
        if (computerSelection === "rock") {
          playerScore++;
          playerScoreText.textContent = "Player: " + playerScore;
          output.textContent = "You win! Paper beats rock.";
          updateCardImage("images/player.png");
        } else {
          computerScore++;
          computerScoreText.textContent = "Computer: " + computerScore;
          output.textContent = "You lose! Scissors beats paper.";
          updateCardImage("images/computer.png");
        }
        break;
      case "scissors":
        if (computerSelection === "rock") {
          computerScore++;
          computerScoreText.textContent = "Computer: " + computerScore;
          output.textContent = "You lose! Rock beats scissors.";
          updateCardImage("images/computer.png");
        } else {
          playerScore++;
          playerScoreText.textContent = "Player: " + playerScore;
          output.textContent = "You win! Scissors beats paper.";
          updateCardImage("images/player.png");
        }
        break;
    }
  }
}

function game() {
  roundCount++;
  singleRound(playerChoice);
  if (playerScore == 3 && computerScore < 2) {
    output.textContent =
      "Congratulations! You won! The computer can't catch up to your score.";
      again.classList.remove("placeholder");
      gameOver = true;
  } else if (computerScore == 3 && playerScore < 2) {
    output.textContent =
      "Oh no, you lost! You can't catch up to the computer's score anymore.";
      again.classList.remove("placeholder");
      gameOver = true;
  }
  if (roundCount == 5) {
    again.classList.remove("placeholder");
    if (playerScore > computerScore) {
      output.textContent = "Congratulations! You won best out of 5!";
    } else if (playerScore < computerScore) {
      output.textContent = "Oh no, you lost! Better luck next time!";
    } else {
      output.textContent = "It's a tie!";
    }
    gameOver = true;
  }
}

function restart() {
  roundCount = 0;
  playerScore = 0;
  computerScore = 0;
  output.textContent = "Please choose rock, paper, or scissors.";
  playerScoreText.textContent = "Player: 0";
  computerScoreText.textContent = "Computer: 0";
  again.classList.add("placeholder");
  const img = document.querySelectorAll(".temp");
  img.forEach((image) => {
    image.classList.remove("temp");
    image.classList.add("placeholder");
  });
  gameOver = false;
}