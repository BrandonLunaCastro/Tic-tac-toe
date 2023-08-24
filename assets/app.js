"use strict";

const Player = (player, marker) => {
  const getMarker = () => marker;
  const getPlayer = () => player;
  return { getMarker, getPlayer };
};

const displayController = (function () {})();

const logicalGame = (function () {
  let indexArrayO = [],
    indexArrayX = [];

  const takeIndex = () => {
    gameBoard.map((e, i) => {
      e === "x" ? indexArrayX.push(i) : indexArrayO.push(i);
    });
  };

  const winOptions = [
    ["0", "1", "2"],
    ["3", "4", "5"],
    ["6", "7", "8"],

    ["0", "3", "6"],
    ["1", "4", "7"],
    ["2", "5", "8"],

    ["0", "4", "8"],
    ["2", "4", "6"],
  ];

  const reviewArray = (arr) => {
    arr = arr.sort();
    for (let el of winOptions) {
      res = el.every((n) => arr.includes(n));
      if (res) {
        break;
      }
    }
    return res;
  };

  return {};

})();

const GameBoard = (function () {
  let cells = document.querySelectorAll(".cell");
  const gameBoard = [];

  function fillBoard() {
    cells.forEach((cell) => {
      gameBoard.push(cell.innerText);
    });
    return gameBoard;
  }

  return { gameBoard };
})();

const updateScreen = (function () {})();

window.addEventListener("DOMContentLoaded", (e) => {
  console.log(GameBoard.gameBoard);
});
