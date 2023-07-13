const options = {
    cors: true
};
const io = require("socket.io")(options);
const {
    TicTacToe
} = require("./ticTacToe");

const ticTacToe = new TicTacToe();
let players = {
    1: "",
    2: ""
};
let started = false;
let activePlayer = 1;
let gameOver = false;

// event gets called when someone connects to the server
io.on("connection", socket => {
    // disconnect if 2 clients connected
    if (io.sockets.sockets.size > 2) {
        console.log("Something went wrong! To many players tried to connect!");
        socket.disconnect();
    }

    // join server with socket id
    const sockId = socket.id;
    joinPlayers(sockId)

    // get player id (1,2)
    const id = getKeyByValue(players, sockId);
    socket.emit('clientId', id);

    // start the game when 2 players connect
    if (io.sockets.sockets.size == 2 && !started) {
        started = true;
        io.emit('start', activePlayer);
        console.log("Match started");
    }

    // send out the current state of the ticTacToe + active id to continue game
    if (started) {
        socket.emit('continue', activePlayer, ticTacToe.getTicTacToe());
    }

    // player turn is send to server
    socket.on("turn", (turn) => {
        console.log(`Turn by ${id}: ${turn.x}, ${turn.y}`);
        if (gameOver) return;

        // switch activePlayer
        activePlayer = 3 - activePlayer;

        // set the ticTacToe
        ticTacToe.setCell(turn.x, turn.y, id);

        // notify all clients that turn happend and over the next active id
        io.emit('turn', {
            "x": turn.x,
            "y": turn.y,
            "next": activePlayer
        });

        // check if game over
        overObj = ticTacToe.checkGameOver(id);
        gameOver = overObj['over'];
        if (gameOver) {
            console.log(overObj['id'] != 0 ? `Game over! The winner is player ${id}` :
                `Game over! Draw`);
            io.emit('over', overObj);

            // reset game
            ticTacToe.resetTicTacToe();
            started = false;
            gameOver = false;
        }
    });

    // remove socket id from player object
    socket.on("disconnect", () => {
        let key = getKeyByValue(players, socket.id)
        players[key] = "";
    })
});

io.listen(3000);
console.log("Server listening on port 3000!")

// add socket id to player obj
function joinPlayers(clientId) {
    for (const keyIdx in players) {
        let curr = players[keyIdx];
        if (curr == "") {
            players[keyIdx] = clientId;
            console.log(players)
            return;
        }
    }
}

function getKeyByValue(obj, value) {
    return Object.keys(obj).find(key => obj[key] === value);
}