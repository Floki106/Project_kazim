let gameMode = "";
let player1 = "";
let player2 = "";
let choices = ["rock", "paper", "scissors"];

const gameArea = document.getElementById("gameArea");
const result = document.getElementById("result");
const pvpBtn = document.getElementById("pvpBtn");
const pvcBtn = document.getElementById("pvcBtn");

pvpBtn.addEventListener("click", () => startGame("P"));
pvcBtn.addEventListener("click", () => startGame("C"));

function startGame(mode) {
  gameMode = mode;
  result.innerText = "";

  if (mode === "P") {
    // Player vs Player mode
    gameArea.innerHTML = `
      <p>Player 1: Pick one</p>
      <button id="p1Rock">Rock</button>
      <button id="p1Paper">Paper</button>
      <button id="p1Scissors">Scissors</button>
    `;

    document.getElementById("p1Rock").addEventListener("click", () => player1Pick("rock"));
    document.getElementById("p1Paper").addEventListener("click", () => player1Pick("paper"));
    document.getElementById("p1Scissors").addEventListener("click", () => player1Pick("scissors"));
  } else {
    // Player vs Computer mode
    gameArea.innerHTML = `
      <p>You: Pick one</p>
      <button id="playerRock">Rock</button>
      <button id="playerPaper">Paper</button>
      <button id="playerScissors">Scissors</button>
    `;

    document.getElementById("playerRock").addEventListener("click", () => playVsComputer("rock"));
    document.getElementById("playerPaper").addEventListener("click", () => playVsComputer("paper"));
    document.getElementById("playerScissors").addEventListener("click", () => playVsComputer("scissors"));
  }
}

function player1Pick(choice) {
  player1 = choice;

  gameArea.innerHTML = `
    <p>Player 2: Pick one</p>
    <button id="p2Rock">Rock</button>
    <button id="p2Paper">Paper</button>
    <button id="p2Scissors">Scissors</button>
  `;

  document.getElementById("p2Rock").addEventListener("click", () => player2Pick("rock"));
  document.getElementById("p2Paper").addEventListener("click", () => player2Pick("paper"));
  document.getElementById("p2Scissors").addEventListener("click", () => player2Pick("scissors"));
}

function player2Pick(choice) {
  player2 = choice;
  showResult(player1, player2);
}

function playVsComputer(playerChoice) {
  player1 = playerChoice;
  player2 = choices[Math.floor(Math.random() * choices.length)];
  showResult(player1, player2);
}

function showResult(p1, p2) {
  let outcome = "";

  if (p1 === p2) {
    outcome = "It's a tie!";
  } else if (
    (p1 === "rock" && p2 === "scissors") ||
    (p1 === "paper" && p2 === "rock") ||
    (p1 === "scissors" && p2 === "paper")
  ) {
    outcome = gameMode === "C" ? "You win!" : "Player 1 wins!";
  } else {
    outcome = gameMode === "C" ? "Computer wins!" : "Player 2 wins!";
  }

  result.innerText = `Player 1 chose ${p1}, Player 2 chose ${p2}. ${outcome}`;
}
