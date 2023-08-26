//function factory for players
const Player = (player, marker) => {
  const getMarker = () => marker;
  const getPlayer = () => player;
  return { getMarker, getPlayer };
};
//this function realize the fill game board
const GameBoard = (function () {
  const gameBoard = [];
  return {
    getBoard: function () {
      return gameBoard;
    },
  };
})();
//this function take care of logical game tic tac toe
/* const logicalGame = (function () {
  let indexArrayO = [],
    indexArrayX = [];

  const takeIndex = (gameBoard) => {
    console.log("initializing take index function");
    gameBoard.map((e, i) => {
      if(e === "x" && !indexArrayX.includes(i)){
        indexArrayX.push(i) 
      }else if(e === "o" && !indexArrayO.includes(i)){
        indexArrayO.push(i)
      }
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
    let player = arr === "playerO" ? "O" : "X";
    if (arr) {
      return `the winner is ${player}`;
    } else {
      return `you lose ${player}`;
    }
  };

  return { 
    takeIndex, 
    reviewArray, 
    winnerIs 
  };
})(); */
//function take care of User Interface
const controllerUI = (function () {
  const selectorsDom = {
    inputPlayerOne: "#player__one",
    inputPlayerTwo: "#player__two",
    selectPlayerOne: ".select__playerOne",
    selectPlayerTwo: ".select__playerTwo",
    form: "#player__options",
    cells: ".cell",
  };  
  const cells = document.querySelectorAll(selectorsDom.cells);

  const getSelectors = function () {
    return selectorsDom;
  }

  const getValueInputs = function (){
    const _playerOne = Player(document.querySelector(selectorsDom.inputPlayerOne).value,
                      document.querySelector(selectorsDom.selectPlayerOne).value )
    const _playerTwo = Player(document.querySelector(selectorsDom.inputPlayerTwo).value,
                      document.querySelector(selectorsDom.selectPlayerTwo).value)
     
     return [
      {
        name: _playerOne.getPlayer(),
        marker: _playerOne.getMarker()
      },
      {
        name:_playerTwo.getPlayer(),
        marker: _playerTwo.getMarker()
      }
    ]
  }

  let player = getValueInputs(),
    actualPlayer = player[0];


  const clickEvent = (p1,p2,board,index,e) => {
    document.querySelector(".actual").innerText = `Turns of player : ${actualPlayer.name == '' ? p2.name :  actualPlayer.name} `;
    actualPlayer = actualPlayer === p1 ? p2 : p1
    e.target.innerText = actualPlayer.marker;
    e.target.setAttribute('disabled','');
    e.target.setAttribute('data-index',index)
    board.push(e.target.dataset.index)
    // board.push(e.target.innerText);
    console.log(board)
    
  }

  const addMarker = function (p1,p2,board) {
    cells.forEach((cell,index) => {
      cell.addEventListener("click", clickEvent.bind(this,p1,p2,board,index),false);
    });
  }

  // public methods
  return {
    getSelectors,
    getValueInputs,
    addMarker
  };
})();
//function take care of running the application
const App = (function () {
  //event listener of input fields players
  let board = GameBoard.getBoard()

  const loadEvent = () => {
    const selectors = controllerUI.getSelectors();
    //add event to submit
    document
      .querySelector(selectors.form)
      .addEventListener("submit", submitEvent);
  };
  const submitEvent = function (e) {
    e.preventDefault();
    console.log("load data..");
    let inputs = controllerUI.getValueInputs(),
        player1 = inputs[0],
        player2 = inputs[1]
        if((player1.name !== " " && player1.marker !== "Select marker player one") && (player2.name !== " " && player2.marker !== "Select marker player two")){
          document.querySelector(".actual").innerText = `Turns of player : ${player1.name} `;  
          controllerUI.addMarker(player1,player2,board);
        }
  };
  return {
    init: function () {
      console.log("initializing app..");
      loadEvent()
    },
  };
})();

App.init();

/* 




 
const updateScreen = (function () {
  const observer = new MutationObserver((board) => {
    board.forEach((element) => {});
  });
})();

 */
