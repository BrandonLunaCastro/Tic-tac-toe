'use strict'

const Player = () => {  
    let option  
    const getOption = () => {     
        document.querySelector('.btns').addEventListener('click',e => {
            option = e.target;
            option.setAttribute('disabled','')
            return option.value
        });
    }

    return{ getOption }

}   

const GameBoard = (function(){
    
    let cells = document.querySelectorAll(".cell");
    
    const gameBoard = [];
    
    let option1 = Player() //instance of the function factory Player 
    option1 = option1.getOption()
   
    function addMark(){
      cells.forEach((cell) => {
        cell.addEventListener("click",e => {
          console.log(option1)
          e.target.innerText = option1
        });
      })  
    }

    function fillBoard(){
        cells.forEach((cell)=>{
            gameBoard.push(cell.innerText)
        }); 
        return gameBoard
    }
  
    return {fillBoard,addMark,option1}  

})();

const gameDisplay = (function(){
  
   
      
})();



 window.addEventListener('DOMContentLoaded',e => {
    GameBoard.addMark()
    GameBoard.option1
}) 