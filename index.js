const gameBoard = (() => {
  const board = document.getElementById("board");
  const boardContents = ["", "", "", "", "", "", "", "", ""];

  const createCell = (content) => {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.textContent = content;
    return cell;
  };

  const cells = boardContents.map(createCell);

  const fillBoard = () => {
    cells[0].style.borderTop = "none";
    cells[0].style.borderLeft = "none";
    cells[1].style.borderTop = "none";
    cells[2].style.borderTop = "none";
    cells[2].style.borderRight = "none";
    cells[3].style.borderLeft = "none";
    cells[5].style.borderRight = "none";
    cells[6].style.borderLeft = "none";
    cells[6].style.borderBottom = "none";
    cells[7].style.borderBottom = "none";
    cells[8].style.borderRight = "none";
    cells[8].style.borderBottom = "none";
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
  let currentPlayer = player1;
  const winner = document.getElementById("new-game");
  const winnerPopup = document.getElementById("game-winner");
  const replayIcon = document.getElementById("replay-icon");
  const playerVsPlayerButton = document.getElementById("player-player");
  const selectGame = document.getElementById("game-selector");
  const boardContainer = document.getElementById("main-container");

  const startGame = () => {
    currentPlayer = player1;
    gameBoard.fillBoard();
    controller.markCell();
  };

  const markCell = () => {
    gameBoard.cells.forEach((cell) => {
      cell.addEventListener("click", () => {
        cell.textContent === ""
          ? (cell.textContent = currentPlayer.mark)
          : (cell.textContent = cell.textContent);
        checkWinner(currentPlayer.mark);
        switchPlayer();
      });
    });
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
        winnerPopup.style.display = "flex";
        winner.textContent = `${currentPlayer.mark} wins!`;
      }
      return isWinner;
    };

    const noWinner = (cells) => {
      const checkTie = cells.some((cell) => cell.textContent === "");
      if (checkTie === false) {
        winnerPopup.style.display = "flex";
        winner.textContent = "Tie!";
      }
      return !checkTie;
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
      case noWinner(gameBoard.cells):
        break;
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
    selectGame.style.display = "flex";
    boardContainer.style.display = "none";
  });

  playerVsPlayerButton.addEventListener("click", () => {
    selectGame.style.display = "none";
    boardContainer.style.display = "flex";
    controller.startGame();
  });

  return { player1, player2, startGame, markCell };
})();
