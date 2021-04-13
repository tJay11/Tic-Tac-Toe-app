
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

let circleTurn: boolean;

startGame()

restartBtn.addEventListener('click', startGame)

function startGame() {
    circleTurn = false;
    hoverClass();
    cellElements.forEach(cell => {
        cell.classList.remove(X_class);
        cell.classList.remove(O_class);
        cell.removeEventListener('click', handleClick);
        cell.addEventListener('click', handleClick, {once: true})
    })
    winningMsg.classList.remove('show')
}


function handleClick(e) { /*--this is the main function of the game,.. and it handles the clicks and contains other functions.........
    (for this game to work you need to check for Win, Draw, Switching Turns and Hovering over the cells)---*/
    const cell = e.target;
    const currentClass = circleTurn ? O_class : X_class;
    placeMark(cell, currentClass);
    if (checkWin(currentClass)) {
        endGame(false);
    }else if(isDraw()) {
        endGame(true);
    }else {
        switchTurns()
        hoverClass()
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
    return [...cellElements].every(cell => {  /*---the cellElements cant take an every method since its not a list so you distructure itb by placing it in [...](list form)--*/
        return cell.classList.contains(X_class) ||
        cell.classList.contains(O_class)
    })
}

function placeMark(cell, currentClass: string) {
    cell.classList.add(currentClass);
}

function switchTurns(){
    circleTurn = !circleTurn;
}

function hoverClass() {
    board.classList.remove(X_class);
    board.classList.remove(O_class);

    if(circleTurn) {
        board.classList.add(O_class);
    }else {
        board.classList.add(X_class);
    }
}

function checkWin(currentClass) {
    return winning_combo.some(combination => {
        return combination.every(index => {
            return cellElements[index].classList.contains(currentClass);
        })
    })
}