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

  const startGame = () => {
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
      if (
        gameBoard.cells[cellOne].textContent === mark &&
        gameBoard.cells[cellTwo].textContent === mark &&
        gameBoard.cells[cellThree].textContent === mark
      ) {
        console.log(currentPlayer.name + " is the winner");
        return true;
      } else {
        return false;
      }
    };

    const noWinner = (cells) => {
      const checkTie = cells.some((cell) => cell.textContent === "");
      checkTie === false ? console.log("Tie Game!") : console.log("No tie!");
      return !checkTie;
    };

    switch (true) {
      case threeInARow(0, 1, 2):
        resetBoard();
        break;
      case threeInARow(3, 4, 5):
        resetBoard();
        break;
      case threeInARow(6, 7, 8):
        resetBoard();
        break;
      case threeInARow(0, 3, 6):
        resetBoard();
        break;
      case threeInARow(1, 4, 7):
        resetBoard();
        break;
      case threeInARow(2, 5, 8):
        resetBoard();
        break;
      case threeInARow(0, 4, 8):
        resetBoard();
        break;
      case threeInARow(2, 4, 6):
        resetBoard();
        break;
      case noWinner(gameBoard.cells):
        resetBoard();
        break;
    }
  };

  const resetBoard = () => {
    gameBoard.cells.forEach((cell) => {
      cell.textContent = "";
    });
  };

  return { player1, player2, startGame, markCell };
})();

controller.startGame();
