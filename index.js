const gameBoard = (() => {
  const board = document.getElementById("board");
  const boardContents = ["x", "", "x", "x", "o", "x", "o", "o", "x"];
  const fillBoard = () => {
    boardContents.forEach((item) => {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      cell.textContent = item;
      board.appendChild(cell);
    });
  };
  return { board, boardContents, fillBoard };
})();

const playerFactory = (name, mark) => {
  const markPosition = () => {
    const cells = document.getElementsByClassName("cell");
    for (const cell of cells) {
      cell.addEventListener("click", () => {
        cell.textContent = mark;
      });
    }
  };
  return { name, mark, markPosition };
};

const displayController = () => {};

gameBoard.fillBoard();

const player1 = playerFactory("Tom", "x");
const player2 = playerFactory("Rob", "o");

player1.markPosition();
player2.markPosition();
