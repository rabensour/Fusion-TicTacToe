# Fusion-TicTacToe

I'm using socket.io library which enables real-time, bi-directional communication between web clients and servers.

For the UI we need a tic tac toe grid (9 cells) => Check file Server/ticTacToe.js 
Container with an id representing cell's position and an onClick function to play. 

Display popup ('You win' / 'You loose'). This popup is hidden with the hide class when the match is starting and will be shown by removing the hide as part of the client side logic when the match has ended => Check file Client/socket.js
The option to play again has been added too with the function restart()

The client is receiving the id from the server and the list of events (start, moves, end)

We connect to our local backend server and define some variables (player id,  player tokens, currently active player)
We will get id from the server. This id will be used to determine the player’s token and also to display the currently active player 
When we get this from the server we assign it to the clientId

The 'start' event : signals the start of the match + tells the clients who will begin
The 'continue' event : allows to receive the current state of the game
The 'turn' event : turn() function takes the coordinates, checks if the field is used or not and then sends an event to the server. 
The 'over' event : signals the end of the match + tells whon won/loose

To start this code : 
1. Start the server with node index.js running on port 3000
2. Open 2 instances of index.html with Live Server representating thw 2 players connecting to the same server we openned at step 1