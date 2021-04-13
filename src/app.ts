
/*---Global variables---*/
const winning_combo = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
]
const X_class: string = 'x';
const O_class: string = 'circle'
const board = document.getElementById('board');
const winningMsg = document.getElementById('winning-msg');
const restartBtn = document.getElementById('restart-btn');
const cellElements = document.querySelectorAll('[data-cell]');
const winningMsgTxt = document.querySelector('[data-winning-msg-text]');

let circleTurn: boolean; /*--needed to know whose turn it is--*/
/*---End Global Variables----*/

startGame()

restartBtn.addEventListener('click', startGame) /*--for the restartBtm to work you'd need to remove the classes (X, O) and event
listener shown in the startGame function--*/

function startGame() {
    circleTurn = false;
    boardHoverClass();
    cellElements.forEach(cell => { /*--the forEach method loops through each cell=any name and shows an arrow function--*/
        cell.classList.remove(X_class);
        cell.classList.remove(O_class);
        cell.removeEventListener('click', handleClick);
        cell.addEventListener('click', handleClick, {once: true}) /*--{once: true} ensures that a cell can be clicked only once---*/
    })
    winningMsg.classList.remove('show')
}


function handleClick(e) { /*--this is the main function of the game,.. and it handles the clicks and contains other functions.........
    (for this game to work you need to check for Win, Draw, Switching Turns and Hovering over the cells)---*/

    const cell = e.target; /*---the e argument is needed to be able to target the specific cell----*/
    const currentClass = circleTurn ? O_class : X_class; /*--if its circles turn return O_class else X_class---short form of conditional---*/
    placeMark(cell, currentClass);
    if (checkWin(currentClass)) {
        endGame(false);
    }else if(isDraw()) {
        endGame(true);
    }else {
        switchTurns();
        boardHoverClass();
    }
}

function endGame(draw) {
    if (draw) {
        winningMsgTxt.innerHTML = "Draw😢"
    }else {
        winningMsgTxt.innerHTML = circleTurn ? "O's Wins😁" : "X's Wins😁";
    }
    winningMsg.classList.add('show')
}

function isDraw() {
    return [...cellElements].every(cell => {  /*---the cellElements cant take an every method since its not a list so you
         destructure itb by placing it in [...](list form)--*/
        return cell.classList.contains(X_class) ||
        cell.classList.contains(O_class)
    })
}

function placeMark(cell, currentClass: string) { /*---this function places the X or O in the cells---*/
    cell.classList.add(currentClass);
}

function switchTurns(){
    circleTurn = !circleTurn; /*---this, !circleTurn, sets it to the opposite of circleTurn---*/
}

function boardHoverClass() {
    board.classList.remove(X_class); /*---removing the classes on the board to make sure there is no class--*/
    board.classList.remove(O_class);

    if(circleTurn) {
        board.classList.add(O_class);/*---adding the classes based on the player turn--*/
    }else {
        board.classList.add(X_class);
    }
}

function checkWin(currentClass) { /*--check all the winning combinations to see if some are met by the current combinations---*/
    return winning_combo.some(combination => { /*--the .some method returns true if any of the values inside are true--
        --which will loop over all the different combinations--*/
        return combination.every(index => { /*---.every method here makes sure that every element has the same class--*/
            return cellElements[index].classList.contains(currentClass);/*--if the currentClass is in all three of the elements
            inside the combination then there is a winner--*/
        })
    })
}