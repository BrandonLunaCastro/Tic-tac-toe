const Player = (player, marker) => {
  const getMarker = () => marker;
  const getPlayer = () => player;
  return { getMarker, getPlayer };
};

const GameBoard = (function () {
  const gameBoard = [];


  return {  
    getBoard : function(){
      return gameBoard
    }
  };

})();



const logicalGame = (function () {
  
  let indexArrayO = [],
    indexArrayX = [];

  const takeIndex = (gameBoard) => {
    console.log("initializing take index function")
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
    let player = arr === 'playerO' ? "O" : "X";
    if (arr) {
      return `the winner is ${player}`;
    } else {
      return `you lose ${player}`;
    }
  };

  return { takeIndex, reviewArray, winnerIs };
})();

const controllerUI = (function () {
  const selectors = {
    inputPlayerOne: document.getElementById('player__one'),
    inputPlayerTwo: document.getElementById('player__two'),
    selectPlayerOne: document.querySelector(".select__playerOne"),
    selectPlayerTwo: document.querySelector(".select__playerTwo"),
    form: document.getElementById("player__options"),
    cells: document.querySelectorAll(".cell"),
  };

  const submitData = function(){
    console.log('initializing submit data')
    selectors.form.addEventListener("submit",e => { 
      e.preventDefault();
      let p1 = selectors.inputPlayerOne.value,
          p2 = selectors.inputPlayerTwo.value,
          s1 = selectors.selectPlayerOne.value,
          s2 = selectors.selectPlayerTwo.value
     
      dataPlayers = [
          {
            name: p1,
            marker: s1
          },
          {
            name: p2,
            marker: s2
          }
        ]
       // console.log(dataPlayers)
        return dataPlayers 
      })
  }
  return {
    addMarker: function (board,marker) {
      selectors.cells.forEach((cell) =>
        cell.addEventListener("click", (e) => {
          e.target.value = marker;
          e.target.disabled = "";
          board.push(e.target.value);
        })
      );
    },submitData
    
  };
})();

const gameDisplay = (function(){
  const playerOne = Player();
  const playerTWo = Player();
  
  const dataPlayers = controllerUI.submitData()
  console.log(dataPlayers)
  return {
    showPlayers : function(){
      console.log(dataPlayers)
    }
  }

})();

const updateScreen = (function(){
    const observer = new MutationObserver((board)=> {
      board.forEach(element => {
        
      });
    })

})();

const App = (function (controllerUI) {
  return {  
    init : function(){
      console.log("initializing app..");
      gameDisplay.showPlayers() ;  
     //controllerUI.addMarker();
      /*   let board = GameBoard.getBoard();
      const player1 = Player("juan","x")
      const marker = player1.getMarker()
      console.log(board)
      controllerUI.addMarker(board,marker)
    */ }
  }
})(controllerUI);

App.init();
