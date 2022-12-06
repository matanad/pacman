'use strict'

const WALL = '#'
const FOOD = '.'
const POWER_FOOD = '🍍'
const CHERRY = '🍒'
const EMPTY = ' '

const gGame = {
    score: 0,
    isOn: false
}

var gBoard
var gCherryInterval

const gElGameOverModal = document.querySelector('.game-over-modal')
const gElVictoriusOverModal = document.querySelector('.victorius-modal')

function onInit() {
    gBoard = buildBoard()
    createGhosts(gBoard)
    createPacman(gBoard)
    renderBoard(gBoard, '.board-container')
    gCherryInterval = setInterval(addCherry, 15000)
    gGame.isOn = true
}

function buildBoard() {
    const size = 10
    const board = []

    for (var i = 0; i < size; i++) {
        board.push([])
        for (var j = 0; j < size; j++) {
            board[i][j] = FOOD
            if (i === 0 || i === size - 1 ||
                j === 0 || j === size - 1 ||
                (j === 3 && i > 4 && i < size - 2)) {
                board[i][j] = WALL
            }
            if ((i === 1 && j == 1) || (i === 1 && j === size - 2) ||
                (i === size - 2 && j == 1) || (i === size - 2 && j == size - 2)) {
                board[i][j] = POWER_FOOD
            }
        }
    }
    return board
}

function updateScore(diff) {
    // TODO: update model and dom
    // Model
    gGame.score += diff
    // DOM
    document.querySelector('h2 span').innerText = gGame.score

}

function gameOver() {
    gElGameOverModal.style.display = ('block')
    clearInterval(gIntervalGhosts)
    gGame.isOn = false
    renderCell(gPacman.location, '🪦')
}

function victory() {
    gElVictoriusOverModal.style.display = ('block')
    clearInterval(gIntervalGhosts)
    gGame.isOn = false
}

function onPlayAgain(element) {
    var elModal = document.querySelector(element)
    elModal.style.display = ('none')
    onInit()
}

function addCherry() {
    var cells = getEmptyCell()
    if (!cells) return
    const randomCell = drawNum(cells)
    gBoard[randomCell.i][randomCell.j] = CHERRY
    renderCell(randomCell, CHERRY)
}