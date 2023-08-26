//function factory for players
const Player = (player, marker) => {
  const getMarker = () => marker;
  const getPlayer = () => player;
  return { getMarker, getPlayer };
};
//this function realize the fill game board
const GameBoard = (function () {
  const gameBoard = [];

  const resetAllGame = () => {
    console.log("Initializing resetAll game")
  }

  return {
    getBoard: function () {
      return gameBoard;
    },
    resetAllGame
  };
})();
//this function take care of logical game tic tac toe
 const logicalGame = (function () {
  let gameBoard = GameBoard.getBoard()
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

  const winnerIs = (objX,objO) => {
    let playerWinner = objX.state === true ? objX : objO.state === true ? objO : "DRAW";
    if(playerWinner == objO || playerWinner == objX){
      document.querySelector(".winner").innerText = `Congratulations the winner is ${playerWinner.name}!`
    }else if (gameBoard.length >= 8){
      document.querySelector(".winner").innerText = playerWinner || "Draw lets play again! "      
    }
  };
  return { 
    reviewArray, 
    winnerIs,
  };
})(); 
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

  const dataFormat = function(state,name){
    return {
      state,
      name
    }
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
  let arrayX = [] ,
      arrayO = [] 


  const clickEvent = (p1,p2,board,e) => {
    document.querySelector(".actual").innerText = `Turns of player : ${actualPlayer.name == '' ? p2.name :  actualPlayer.name} `;
    actualPlayer = actualPlayer === p1 ? p2 : p1
    e.target.innerText = actualPlayer.marker;
    e.target.setAttribute('disabled','');
    let dataIndex = e.target.dataset.index;
    actualPlayer.marker === "x" ? arrayX.push(dataIndex) : arrayO.push(dataIndex)
    board.push(e.target.innerText);
    if(board.length >= 3 ){
     let arrX = logicalGame.reviewArray(arrayX),
         arrO = logicalGame.reviewArray(arrayO),
         playerX = p1.marker === "x" ? p1 : p2 ,
         playerO = p1.marker === "o" ? p1 : p2

         let objX = dataFormat(arrX,playerX.name);
         let objO = dataFormat(arrO,playerO.name)
         console.log(logicalGame.winnerIs(objX,objO))
    }   
  }

  const addMarker = function (p1,p2,board) {
    cells.forEach((cell) => {
      cell.addEventListener("click", clickEvent.bind(this,p1,p2,board,),false);
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

    //add event to reset board game
    document.getElementById("replay").addEventListener("click",resetGame)

    //add event to foresee choosing same selects
    document.querySelector(".select__playerOne").addEventListener("change",detectSelectOptions)

    //add event to submit
    document
      .querySelector(selectors.form)
      .addEventListener("submit",submitEvent);
  };

  const resetGame = function(e){
    console.log("replay")
  }

  const detectSelectOptions = function(e){
      const selectedOption = e.target.value;
      const selectTwoOptions = document.querySelector(".select__playerTwo").options
      for(let el of selectTwoOptions){
        selectedOption === el.value 
         ? el.setAttribute("disabled","") 
         : el.value !== "Select marker player two" 
          ? el.removeAttribute("disabled") 
          : false;
      }
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
