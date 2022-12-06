'use strict'

const PACMAN = '🥶'
var gPacman

function createPacman(board) {
    // DONE: initialize gPacman...
    gPacman = {
        location: {
            i: 2,
            j: 2
        },
        isSuper: false,
        currCellContent: EMPTY,
        dir: 'up'
    }
    gBoard[gPacman.location.i][gPacman.location.j] = PACMAN
}

function movePacman(ev) {
    if (!gGame.isOn) return
    // DONE: use getNextLocation(), nextCell
    const nextLocation = getNextLocation(ev.key)
    const nextCell = gBoard[nextLocation.i][nextLocation.j]

    // DONE: return if cannot move
    if (nextCell === WALL) return

    // DONE: hitting a ghost? call gameOver
    if (nextCell === GHOST && !gPacman.isSuper) {
        gameOver()
        return
    } else if (nextCell === GHOST && gPacman.isSuper) {
        for (var i = 0; i < gGhosts.length; i++) {
            if (gGhosts[i].location.i === nextLocation.i && gGhosts[i].location.j === nextLocation.j) {
                gGhosts.splice(i, 1)
            }

        }
    }

    if (nextCell === FOOD) {
        updateScore(1)
    }

    if (nextCell === CHERRY) {
        updateScore(10)
    }

    if (nextCell === POWER_FOOD) {
        if (!gPacman.isSuper) {
            powerFood()
            gPacman.isSuper = true
        } else {
            return
        }
    }



    // DONE: moving from current location:
    // DONE: update the model
    gBoard[gPacman.location.i][gPacman.location.j] = EMPTY
    // DONE: update the DOM
    renderCell(gPacman.location, EMPTY)

    gBoard[nextLocation.i][nextLocation.j] = PACMAN
    gPacman.location = nextLocation
    // DONE: update the DOM
    renderCell(nextLocation, getPacmanHTML())
    if (!isFoodOnBoard()) victory()
}

function getNextLocation(eventKeyboard) {
    // console.log(eventKeyboard)
    const nextLocation = {
        i: gPacman.location.i,
        j: gPacman.location.j
    }
    // DONE: figure out nextLocation
    switch (eventKeyboard) {
        case 'ArrowUp':
            gPacman.dir = 'up'
            nextLocation.i--
            break;
        case 'ArrowRight':
            gPacman.dir = 'right'
            nextLocation.j++
            break;
        case 'ArrowDown':
            gPacman.dir = 'down'
            nextLocation.i++
            break;
        case 'ArrowLeft':
            gPacman.dir = 'left'
            nextLocation.j--
            break;
    }
    return nextLocation
}

function powerFood() {
    var ghostTimeOut
    var ghostsColors = []
    for (var i = 0; i < gGhosts.length; i++) {
        ghostsColors.push(gGhosts[i].color)
        gGhosts[i].color = 'blue'
        renderCell(gGhosts[i].location, getGhostHTML(gGhosts[i]))
    }
    ghostTimeOut = setTimeout(() => {
        for (var i = 0; i < gGhosts.length; i++) {
            gGhosts[i].color = ghostsColors[i]
            renderCell(gGhosts[i].location, getGhostHTML(gGhosts[i]))
        }
        createGhosts(gBoard, 3 - gGhosts.length)
        gBoard[gGhosts[0].location.i][gGhosts[0].location.j] = GHOST
        renderCell(gGhosts[0].location, GHOST)
        gPacman.isSuper = false
        clearInterval(gIntervalGhosts)
        clearTimeout(ghostTimeOut)
    }, 5000);
}

function isFoodOnBoard() {
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[i].length; j++) {
            if (gBoard[i][j] === FOOD) return true
        }
    }
    false
}

function getPacmanHTML() {
    return `<div class="${gPacman.dir}">${PACMAN}</div>`
}

function removeGhost() {
    
}