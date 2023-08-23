'use strict'

const Player = (player,marcador) => {  
    const getMarker = () => marcador;
    const getPlayer = () => player;
    return {getMarker,getPlayer}
};   
const displayController = (function(){
      
})();


const GameBoard = (function(){
    
    let cells = document.querySelectorAll(".cell");
    const gameBoard = [];

    function fillBoard(){
        cells.forEach((cell)=>{
            gameBoard.push(cell.innerText);
        }); 
        return gameBoard;
    }

    return {gameBoard}  
})();

const updateScreen = () => {

}

window.addEventListener('DOMContentLoaded',e => {
  console.log(GameBoard.gameBoard)
}) 