const Player = (player, marker) => {
  const getMarker = () => marker;
  const getPlayer = () => player;
  return { getMarker, getPlayer };
};

const displayController = (function () {})();

const GameBoard = (function () {
  let cells = document.querySelectorAll(".cell");
  const gameBoard = [];

  const fillBoard = () => {
    cells.forEach((cell) => {
      gameBoard.push(cell.innerText);
    });
    return gameBoard;
  };

  const addMarker = (marker) => {
    cells.forEach((cell) =>
      cell.addEventListener("click", (e) => {
        e.target.value = marker;
        e.target.disabled = "";
        gameBoard.push(e.target.value)
      })
    );
  };

  return { gameBoard, addMarker };
})();

const logicalGame = (function () {
  let indexArrayO = [],
    indexArrayX = [];

  const takeIndex = (gameBoard) => {
    gameBoard.map((e, i) => {
      e === "x" ? indexArrayX.push(i) : indexArrayO.push(i);
    });
    return { indexArrayO, indexArrayX };
  };

  const winOptions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],

    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],

    [0, 4, 8],
    [2, 4, 6],
  ];

  const reviewArray = (arr) => {
    let res;
    for (let el of winOptions) {
      res = el.every((n) => arr.includes(n));
      if (res) {
        break;
      }
    }
    return res;
  };

  const winnerIs = (arr) => {
    let player = arr === playerO ? "O" : "X";
    if (arr) {
      return `the winner is ${player}`;
    } else {
      return `you lose ${player}`;
    }
  };

  return { takeIndex, reviewArray, winnerIs };
})();

const updateScreen = (function () {
  let player1 = Player("pepe", "x"),
    marker = player1.getMarker(),
    name = player1.getPlayer();

  if (GameBoard.gameBoard.length === 0) {
    console.log("entro al if true");

    GameBoard.addMarker(marker);
  
  }
  return { marker, name };
})();

//prueba
let boardArr = GameBoard.gameBoard;
const positionArr = logicalGame.takeIndex(boardArr);

let playerX = logicalGame.reviewArray(positionArr.indexArrayX);
let playerO = logicalGame.reviewArray(positionArr.indexArrayO);

/* console.log(logicalGame.winnerIs(playerO));
console.log(logicalGame.winnerIs(playerX));
 */
updateScreen;
