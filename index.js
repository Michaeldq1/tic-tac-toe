const gameBoard = (() => {
  const board = document.getElementById("board");
  const boardContents = ["", "", "x", "x", "o", "o", "o", "o", "x"];

  const createCell = (content) => {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.textContent = content;
    return cell;
  };

  const fillBoard = () => {
    const cells = boardContents.map(createCell);
    board.append(...cells);
  };

  return { fillBoard };
})();

const playerFactory = (name, mark) => {
  const isActive;
  const markPosition = () => {
    const cells = document.querySelectorAll(".cell");
    cells.forEach((cell) => {
      cell.addEventListener("click", () => {
        cell.textContent = cell.textContent === "" ? mark : cell.textContent;
      });
    });
  };
  return { name, markPosition, isActive };
};

gameBoard.fillBoard();

const player1 = playerFactory("Tom", "x");
const player2 = playerFactory("Rob", "o");

player1.markPosition();
player2.markPosition();
