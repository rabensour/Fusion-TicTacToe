const socket = io("ws://localhost:3000");
const token = {
    1: "cross",
    2: "circle"
};
let clientId;
let activeId;

// get client id
socket.on('clientId', (id) => {
    clientId = id;
})

// get the first active player id and set up html for game
socket.on('start', (startId) => {
    activeId = startId;

    document.getElementById('current-turn').classList.remove('hide');
    document.getElementById('clientId').innerHTML = clientId == activeId ? 'Your' : 'Not your';
});

// get the active player and get ticTacToe state
socket.on('continue', (active, ticTacToe) => {
    activeId = active;
    for (let x = 0; x < ticTacToe.length; x++) {
        for (let y = 0; y < ticTacToe.length; y++) {
            setTicTacToe(x, y, ticTacToe[y][x]);
        }
    }

    document.getElementById('current-turn').classList.remove('hide');
    document.getElementById('clientId').innerHTML = clientId == activeId ? 'Your' : 'Not your';
})

// update ticTacToe with turn information
socket.on('turn', (turn) => {
    const {x, y, next} = turn;
    setTicTacToe(x, y, activeId);

    activeId = next;
    document.getElementById('clientId').innerHTML = clientId == activeId ? 'Your' : 'Not your';
})

// show popup with win information
socket.on('over', (overObj) => {
    winnerId = overObj['id']
    if (winnerId != 0)
        document.getElementById('winnerId').innerHTML = clientId == winnerId ? 'win' : 'loose';
    else
        document.getElementById('winnerId').innerHTML = 'draw';
    
    socket.disconnect();

    document.getElementById('popup').classList.remove('hide');
    document.getElementById('current-turn').classList.add('hide');
})


// send turn event to server
function turn(x, y) {
    if (activeId != clientId) return;
    if (getTicTacToe(x,y).classList.contains(token[1]) || getTicTacToe(x,y).classList.contains(token[2])) return;
    console.log('send')
    socket.emit("turn", {
        "x": x,
        "y": y
    })
}

// get ticTacToe
function getTicTacToe(x, y) {
    return document.getElementById(`x${x}y${y}`)
}

// update css for ticTacToe
function setTicTacToe(x, y, id) {
    let ticTacToe = getTicTacToe(x,y);
    ticTacToe.classList.add(`${token[id]}`);
}

// restart the game
function restart() {
    window.location.reload();
}