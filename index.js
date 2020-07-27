var io = require('socket.io')(process.env.PORT || 52300);

// Classes
var Player = require('./Classes/Player');

console.log('Server has started');

var players = [];
var sockets = [];

io.on('connection', function(socket) {
    console.log('Connection made!');

    var player = new Player();
    var thisPlayerID = player.id;

    players[thisPlayerID] = player;
    sockets[thisPlayerID] = socket;

    // Tell client their ID
    socket.emit('register', { id: thisPlayerID });
    socket.emit('spawn', player); // Tell the client to spawn
    socket.broadcast.emit('spawn', player); // Tell every other socket to spawn this client

    // Tell the client to spawn all existing players
    for(var playerID in players){
        if(playerID != thisPlayerID){
            socket.emit('spawn', players[playerID]);
        }
    }

    socket.on('disconnect', function() {
        console.log('A client has disconnected');
        delete players[thisPlayerID];
        delete sockets[thisPlayerID];
        socket.broadcast.emit('disconnected', player);
    });
});