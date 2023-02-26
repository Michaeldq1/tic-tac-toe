const gameBoard = (() => {
  const board = document.getElementById("board");
  const boardContents = Array(9).fill("");

  const createCell = (content) => {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.textContent = content;
    return cell;
  };

  const cells = boardContents.map(createCell);

  const fillBoard = () => {
    const borderPositions = [0, 1, 2, 3, 5, 6, 7, 8];
    cells.forEach((cell, index) => {
      const isBorderCell = borderPositions.includes(index);
      if (isBorderCell) {
        if (index % 3 === 0) {
          cell.style.borderLeft = "none";
        }
        if (index < 3) {
          cell.style.borderTop = "none";
        }
        if (index % 3 === 2) {
          cell.style.borderRight = "none";
        }
        if (index > 5) {
          cell.style.borderBottom = "none";
        }
      }
    });
    board.append(...cells);
  };

  return { cells, fillBoard };
})();

const playerFactory = (name, mark) => {
  return { name, mark };
};

const controller = (() => {
  const player1 = playerFactory("Tom", "X");
  const player2 = playerFactory("Rob", "O");
  const computerPlayer = playerFactory("computer", "O");
  let currentPlayer = player1;
  let gameWon = false;
  const winner = document.getElementById("new-game");
  const winnerPopup = document.getElementById("game-winner");
  const replayIcon = document.getElementById("replay-icon");
  const playerVsPlayerButton = document.getElementById("player-player");
  const gameSelector = document.getElementById("game-selector");
  const boardContainer = document.getElementById("main-container");
  const playerVsComputerButton = document.getElementById("player-computer");
  let isVsComputerGame = false;

  const startGame = () => {
    gameWon = false;
    currentPlayer = player1;
    gameBoard.fillBoard();
    controller.markCell();
  };

  const markCellHandler = (event) => {
    const cell = event.target;
    cell.textContent === ""
      ? (cell.textContent = currentPlayer.mark)
      : (cell.textContent = cell.textContent);
    checkWinner(currentPlayer.mark);
    checkWinner(computerPlayer.mark);
    if (isVsComputerGame) {
      computerMove();
      checkWinner(computerPlayer.mark);
    } else {
      switchPlayer();
    }
    cell.removeEventListener("click", markCellHandler);
  };

  const markCell = () => {
    gameBoard.cells.forEach((cell) => {
      cell.addEventListener("click", markCellHandler);
    });
  };

  const computerMove = () => {
    const openCells = gameBoard.cells
      .map((cell, index) => (cell.textContent == "" ? index : null))
      .filter((index) => index != null);
    let randomCell = openCells[Math.floor(Math.random() * openCells.length)];
    gameBoard.cells[randomCell].textContent = computerPlayer.mark;
  };

  const switchPlayer = () => {
    if (currentPlayer === player1) {
      currentPlayer = player2;
    } else {
      currentPlayer = player1;
    }
  };

  const checkWinner = (mark) => {
    const threeInARow = (cellOne, cellTwo, cellThree) => {
      const isWinner =
        gameBoard.cells[cellOne].textContent === mark &&
        gameBoard.cells[cellTwo].textContent === mark &&
        gameBoard.cells[cellThree].textContent === mark;
      if (isWinner) {
        gameWon = true;
        winnerPopup.style.display = "flex";
        winner.textContent = `${mark} wins!`;
      }
    };

    const noWinner = (cells) => {
      const checkTie = cells.some((cell) => cell.textContent === "");
      if (!checkTie && !gameWon) {
        winnerPopup.style.display = "flex";
        winner.textContent = "Tie!";
      }
    };

    switch (true) {
      case threeInARow(0, 1, 2):
      case threeInARow(3, 4, 5):
      case threeInARow(6, 7, 8):
      case threeInARow(0, 3, 6):
      case threeInARow(1, 4, 7):
      case threeInARow(2, 5, 8):
      case threeInARow(0, 4, 8):
      case threeInARow(2, 4, 6):
        break;
      case noWinner(gameBoard.cells):
    }
  };

  const resetBoard = () => {
    gameBoard.cells.forEach((cell) => {
      cell.textContent = "";
    });
    winnerPopup.style.display = "none";
    startGame();
  };

  replayIcon.addEventListener("click", () => {
    resetBoard();
    gameSelector.style.display = "flex";
    boardContainer.style.display = "none";
  });

  playerVsPlayerButton.addEventListener("click", () => {
    isVsComputerGame = false;
    gameSelector.style.display = "none";
    boardContainer.style.display = "flex";
    controller.startGame();
  });

  playerVsComputerButton.addEventListener("click", () => {
    isVsComputerGame = true;
    gameSelector.style.display = "none";
    boardContainer.style.display = "flex";
    controller.startGame();
  });

  return { player1, player2, startGame, markCell };
})();
