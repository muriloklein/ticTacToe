let turnAux = 0;

document.getElementById("start").addEventListener("click", () => {
  if (
    document.getElementById("playerOne").value &&
    document.getElementById("playerTwo").value
  ) {
    document.getElementById("start").innerText = "Recomeçar";

    let playerOne = document.getElementById("playerOne").value;
    let playerTwo = document.getElementById("playerTwo").value;

    document.querySelectorAll(".gameBoard").forEach((square) => {
      square.addEventListener("click", move);
      square.classList.add("pointer");
    });

    document.getElementById("playerNameDisplay").style.display = "block";

    turnAux = 0;

    cleanBoard();

    turnSwitcher(playerOne, playerTwo);
  } else {
    alert("Informe o nome dos Jogadores!");
  }
});

function turnSwitcher(playerOne, playerTwo) {
  let turn = document.getElementById("playerNameDisplay");

  if (turnAux == 0) {
    turn.innerText = `Jogador da Vez: ${playerOne}`;
    turnAux = turnAux + 1;
  } else if (turnAux == 1) {
    turn.innerText = `Jogador da Vez: ${playerTwo}`;
    turnAux = turnAux - 1;
  }
}

function move(ev) {
  let square = ev.target;
  if (turnAux == 0) {
    square.innerText = "O";
    square.removeEventListener("click", move);
    square.classList.remove("pointer");
    winVerify("o", square.dataset.position);
  } else if (turnAux == 1) {
    square.innerText = "X";
    square.removeEventListener("click", move);
    square.classList.remove("pointer");
    winVerify("x", square.dataset.position);
  }

  let playerOne = document.getElementById("playerOne").value;
  let playerTwo = document.getElementById("playerTwo").value;

  turnSwitcher(playerOne, playerTwo);
}

let xSquares = "";
let oSquares = "";

function winVerify(player, square) {
  let result = document.getElementById("result");
  let playerOne = document.getElementById("playerOne").value;
  let playerTwo = document.getElementById("playerTwo").value;
  let winCombinations = [
    "123",
    "147",
    "159",
    "258",
    "369",
    "357",
    "456",
    "789",
  ];
  let winningPlay = "";

  if (player == "x") {
    xSquares += square;
  } else if (player == "o") {
    oSquares += square;
  }

  for (let i = 0; i < winCombinations.length; i++) {
    let winCombo = winCombinations[i];
    if (winCombo.split("").every((square) => xSquares.includes(square))) {
      result.innerText = `${playerOne} Ganhou`;
      document.getElementById("playerNameDisplay").style.display = "none";
      document.querySelectorAll(".gameBoard").forEach((square) => {
        square.removeEventListener("click", move);
        square.classList.remove("pointer");
      });
      winningPlay = winCombo;
      break;
    } else if (
      winCombo.split("").every((square) => oSquares.includes(square))
    ) {
      result.innerText = `${playerTwo} Ganhou`;
      document.getElementById("playerNameDisplay").style.display = "none";
      document.querySelectorAll(".gameBoard").forEach((square) => {
        square.removeEventListener("click", move);
        square.classList.remove("pointer");
      });
      winningPlay = winCombo;
      break;
    }
  }

  if (winningPlay == "" && xSquares.length == 5) {
    result.innerText = `Empatou`;
    document.getElementById("playerNameDisplay").style.display = "none";
    document.querySelectorAll(".gameBoard").forEach((square) => {
      square.removeEventListener("click", move);
      square.classList.remove("pointer");
    });
  }

  document.querySelectorAll(".gameBoard").forEach((square) => {
    for (let i = 0; i < 4; i++) {
      if (square.dataset.position == winningPlay[i])
        square.style.color = "rgba(48, 237, 48, 0.918)";
    }
  });
}

function cleanBoard() {
  document.querySelectorAll(".gameBoard").forEach((square) => {
    square.innerText = "";
    square.style.color = "white";
  });

  document.getElementById("result").innerText = "";

  xSquares = [];
  oSquares = [];
}
