//function factory for players
const Player = (player, marker) => {
  const getMarker = () => marker;
  const getPlayer = () => player;
  return { getMarker, getPlayer };
};

//function take care of User Interface
const controllerUI = (function () {
  const selectorsDom = {
    inputPlayerOne: "#player__one",
    inputPlayerTwo: "#player__two",
    selectPlayerOne: ".select__playerOne",
    selectPlayerTwo: ".select__playerTwo",
    form: "#player__options",
    cells: ".cell",
    winner: ".winner",
    replay: "#replay",
    actual: ".actual",
  };
  const cells = document.querySelectorAll(selectorsDom.cells);
  let gameBoard = []

  const getSelectors = function () {
    return selectorsDom;
  };

  const dataFormat = function (state, name) {
    return {
      state,
      name,
    };
  };

  const getValueInputs = function () {
    const _playerOne = Player(
      document.querySelector(selectorsDom.inputPlayerOne).value,
      document.querySelector(selectorsDom.selectPlayerOne).value
    );
    const _playerTwo = Player(
      document.querySelector(selectorsDom.inputPlayerTwo).value,
      document.querySelector(selectorsDom.selectPlayerTwo).value
    );

    return [
      {
        name: _playerOne.getPlayer(),
        marker: _playerOne.getMarker(),
      },
      {
        name: _playerTwo.getPlayer(),
        marker: _playerTwo.getMarker(),
      },
    ];
  };

  let player = getValueInputs(),
    actualPlayer = player[0];
  let arrayX = [],
    arrayO = [];

  const resetAllGame = function () {
    console.log("Initializing resetAll game");
    const selectors = controllerUI.getSelectors()
    document.querySelector(selectors.form).reset();
    document.querySelector(selectors.winner).innerText = "";
    document.querySelector(selectors.actual).innerText = "";
    removeFunctionMarker();
    actualPlayer = player[0];
    arrayX = []; 
    arrayO = [];
    gameBoard = [];
  };

  const clickEvent = (p1, p2, board, e) => {
    document.querySelector(".actual").innerText = `Turns of player : ${
      actualPlayer.name == "" ? p2.name : actualPlayer.name
    } `;
    actualPlayer = actualPlayer === p1 ? p2 : p1;
    e.target.innerText = actualPlayer.marker;
    e.target.setAttribute("disabled", "");
    let dataIndex = e.target.dataset.index;
    actualPlayer.marker === "x"
      ? arrayX.push(dataIndex)
      : arrayO.push(dataIndex);
    board.push(e.target.innerText);
    if (board.length >= 3) {
      let arrX = logicalGame.reviewArray(arrayX),
        arrO = logicalGame.reviewArray(arrayO),
        playerX = p1.marker === "x" ? p1 : p2,
        playerO = p1.marker === "o" ? p1 : p2;

      let objX = dataFormat(arrX, playerX.name);
      let objO = dataFormat(arrO, playerO.name);
      console.log(logicalGame.winnerIs(objX, objO));
    }
  };

  //declaramos esta variable que posteriormente tomara una funcion
  let clickBound;

  const addMarker = function (p1, p2, board) {
    //le vinculamos la funcion manejadora de eventos
    clickBound = function (e) {
      clickEvent(p1, p2, board, e);
    };

    cells.forEach((cell) => {
      cell.addEventListener("click", clickBound, false);
    });
  };

  const removeFunctionMarker = function () {
    cells.forEach((cell) => {
      cell.innerText = "";
      cell.removeAttribute("disabled");
      //luego eliminamos el evento como tal
      cell.removeEventListener("click", clickBound, false);
    });
  };
  
    const getBoard =  function () {
      return gameBoard;
    }
  // public methods
  return {
    getSelectors,
    getValueInputs,
    addMarker,
    getBoard  ,
    resetAllGame,
  
  };
})();

//this function take care of logical game tic tac toe
const logicalGame = (function () {

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
    let res;
    for (let el of winOptions) {
      res = el.every((n) => arr.includes(n));
      if (res) {
        break;
      }
    }
    return res;
  };

  const winnerIs = (objX, objO) => {
    const selectors = controllerUI.getSelectors();
    let gameBoard = controllerUI.getBoard();
    let playerWinner =
      objX.state === true ? objX : objO.state === true ? objO : "";
    if (playerWinner == objO || playerWinner == objX) {
      document.querySelector(selectors.winner).innerText = `Congratulations the winner is ${playerWinner.name}!`;
      document.querySelector(selectors.actual).innerText = '';
    } else if (gameBoard.length >= 8) {
      document.querySelector(selectors.winner).innerText = "Draw lets play again! ";
      document.querySelector(selectors.actual).innerText = ''
    }
  };
  return {
    reviewArray,
    winnerIs,
  };
})();



//function take care of running the application
const App = (function () {
  //event listener of input fields players

  const selectors = controllerUI.getSelectors();

  const loadEvent = () => {
    const selectors = controllerUI.getSelectors();

    //add event to reset board game
    document
      .querySelector(selectors.replay)
      .addEventListener("click", controllerUI.resetAllGame);

    //add event to foresee choosing same selects
    document
      .querySelector(selectors.selectPlayerOne)
      .addEventListener("change", detectSelectOptions);

    //add event to submit
    document
      .querySelector(selectors.form)
      .addEventListener("submit", submitEvent);
  };

  const detectSelectOptions = function (e) {
    const selectedOption = e.target.value;
    const selectTwoOptions = document.querySelector(
      selectors.selectPlayerTwo
    ).options;
    for (let el of selectTwoOptions) {
      selectedOption === el.value
        ? el.setAttribute("disabled", "")
        : el.value !== "Select marker player two"
        ? el.removeAttribute("disabled")
        : false;
    }
  };
  const submitEvent = function (e) {
    e.preventDefault();
    let board = controllerUI.getBoard();
    console.log("load data..");
    let inputs = controllerUI.getValueInputs(),
      player1 = inputs[0],
      player2 = inputs[1];
    if (
      player1.name !== " " &&
      player1.marker !== "Select marker player one" &&
      player2.name !== " " &&
      player2.marker !== "Select marker player two"
    ) {
      document.querySelector(
        selectors.actual
      ).innerText = `Turns of player : ${player1.name} `;
      controllerUI.addMarker(player1, player2, board);
    }
  };
  return {
    init: function () {
      console.log("initializing app..");
      loadEvent();
    },
  };
})();

App.init();
