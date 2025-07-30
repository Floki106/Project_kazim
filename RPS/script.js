let gameMode = "";
let player1 = "";
let player2 = "";
let player1Score = 0;
let player2Score = 0;
const winningScore = 5;

const choices = ["rock", "paper", "scissors"];
const emojis = {
  rock: "🪨",
  paper: "📄",
  scissors: "✂️",
};

const gameArea = document.getElementById("gameArea");
const emojiDisplay = document.getElementById("emojiDisplay");
const result = document.getElementById("result");
const scoreDisplay = document.getElementById("score");
const pvpBtn = document.getElementById("pvpBtn");
const pvcBtn = document.getElementById("pvcBtn");
const playAgainBtn = document.getElementById("playAgainBtn");

pvpBtn.addEventListener("click", () => startGame("P"));
pvcBtn.addEventListener("click", () => startGame("C"));
playAgainBtn.addEventListener("click", resetGame);

function startGame(mode) {
  gameMode = mode;
  resetScores();
  updateScore();
  result.innerText = "";
  emojiDisplay.innerHTML = "";
  playAgainBtn.style.display = "none";

  if (mode === "P") {
    player1Turn();
  } else {
    showPlayerChoices("You");
  }
}

function resetScores() {
  player1Score = 0;
  player2Score = 0;
}

function updateScore() {
  const p1Label = gameMode === "C" ? "You" : "Player 1";
  const p2Label = gameMode === "C" ? "Computer" : "Player 2";
  scoreDisplay.innerText = `${p1Label}: ${player1Score} | ${p2Label}: ${player2Score}`;
}

function player1Turn() {
  gameArea.innerHTML = `
    <p>Player 1: Choose</p>
    <div class="choice-buttons">
      ${getChoiceButtons("player1Pick")}
    </div>
  `;
}

function player1Pick(choice) {
  player1 = choice;
  gameArea.innerHTML = `
    <p>Player 2: Choose</p>
    <div class="choice-buttons">
      ${getChoiceButtons("player2Pick")}
    </div>
  `;
}

function player2Pick(choice) {
  player2 = choice;
  playRound(player1, player2);
}

function showPlayerChoices(label) {
  gameArea.innerHTML = `
    <p>${label}: Choose</p>
    <div class="choice-buttons">
      ${getChoiceButtons("playVsComputer")}
    </div>
  `;
}

function playVsComputer(choice) {
  if (isGameOver()) return;
  player1 = choice;
  player2 = choices[Math.floor(Math.random() * choices.length)];
  playRound(player1, player2);
}

function getChoiceButtons(functionName) {
  return choices
    .map((choice) => {
      return `<button onclick="${functionName}('${choice}')">${
        emojis[choice]
      } ${capitalize(choice)}</button>`;
    })
    .join("");
}

function playRound(p1, p2) {
  if (isGameOver()) return;

  let roundResult = "";
  if (p1 === p2) {
    roundResult = "🤝 It's a tie!";
  } else if (
    (p1 === "rock" && p2 === "scissors") ||
    (p1 === "paper" && p2 === "rock") ||
    (p1 === "scissors" && p2 === "paper")
  ) {
    roundResult =
      gameMode === "C"
        ? "🎉 You win this round!"
        : "🎉 Player 1 wins this round!";
    player1Score++;
  } else {
    roundResult =
      gameMode === "C"
        ? "💻 Computer wins this round!"
        : "🏆 Player 2 wins this round!";
    player2Score++;
  }

  emojiDisplay.innerHTML = `
    ${emojis[p1]} vs ${emojis[p2]}
  `;
  result.innerHTML = roundResult;
  updateScore();

  if (isGameOver()) {
    showFinalWinner();
    gameArea.innerHTML = "";
    playAgainBtn.style.display = "inline-block";
  } else if (gameMode === "P") {
    player1Turn();
  } else {
    showPlayerChoices("You");
  }
}

function showFinalWinner() {
  let winnerMessage = "";
  if (player1Score === winningScore) {
    winnerMessage =
      gameMode === "C" ? "🎉 You won the game!" : "🎉 Player 1 wins the game!";
  } else {
    winnerMessage =
      gameMode === "C"
        ? "💻 Computer won the game!"
        : "🏆 Player 2 wins the game!";
  }
  result.innerHTML += `<br><br><strong>${winnerMessage}</strong>`;
}

function isGameOver() {
  return player1Score === winningScore || player2Score === winningScore;
}

function resetGame() {
  result.innerHTML = "";
  emojiDisplay.innerHTML = "";
  scoreDisplay.innerHTML = "";
  gameArea.innerHTML = "";
  playAgainBtn.style.display = "none";
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
