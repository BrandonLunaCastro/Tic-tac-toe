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
  function clickEvent(marker,board,e) {
    console.log(board,marker,e)
    e.target.innerText = marker;
    e.target.disabled = "";
    board.push(e.target.innerText);
  }
  // public methods
  return {
    addMarker: function (marker,board) {
      cells.forEach((cell) => {
        cell.addEventListener("click", clickEvent.bind(this,marker,board),false);
      });
    }, 
    getSelectors: function () {
      return selectorsDom;
    },
    getValueInputs:function (){
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
  };
})();
//function take care of running the application
const App = (function (controllerUI) {
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
        jugador1 = inputs[0],
        jugador2 = inputs[1]
        if((jugador1.name !== " " && jugador1.marker !== "Select marker player one") && (jugador2.name !== " " && jugador2.marker !== "Select marker player two")){
          console.log(jugador1.marker);
          controllerUI.addMarker(jugador1.marker,board);
        }
  };
  return {
    init: function () {
      console.log("initializing app..");
      loadEvent()
    },
  };
})(controllerUI);

App.init();

/* 
const logicalGame = (function () {
  let indexArrayO = [],
    indexArrayX = [];

  const takeIndex = (gameBoard) => {
    console.log("initializing take index function");
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
    let player = arr === "playerO" ? "O" : "X";
    if (arr) {
      return `the winner is ${player}`;
    } else {
      return `you lose ${player}`;
    }
  };

  return { takeIndex, reviewArray, winnerIs };
})();



/*  const submitData =   () =>  {
    console.log("initializing submit data");
    //evento submit
     selectors.form.addEventListener("submit", eventSubmit);
    //funcion del evento submit
    function eventSubmit(e) {
      e.preventDefault();
        let p1 = selectors.inputPlayerOne.value,
        p2 = selectors.inputPlayerTwo.value,
        s1 = selectors.selectPlayerOne.value,
        s2 = selectors.selectPlayerTwo.value;

      const playerOne =  Player(p1,s1);
      const playerTwo = Player(p2,s2);
      return {playerOne,playerTwo}
    };
  };


 
const updateScreen = (function () {
  const observer = new MutationObserver((board) => {
    board.forEach((element) => {});
  });
})();

 */
