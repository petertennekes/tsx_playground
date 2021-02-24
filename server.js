const express = require('express');

const path = require('path');
const app = express();
const fs = require('fs');

const httpServer = require("http").createServer(app);
const io = require("socket.io")(httpServer, {
    // ...
});
const gamestore = {}

const createNewGame = () => {
  const cardData = fs.readFileSync(filename);
  const gameId = Math.random().toString(36).substring(7)
  gamestore[gameId] = JSON.parse(cardData);
  return gameId
}

const filename = path.join(__dirname, 'public', 'card-deck.json');
io.on("connection", (socket) => {
    // ...
    console.log(socket.id, " connected");
    const game_id = socket.handshake.query.game_id;
    console.log(game_id);
    if (socket.handshake.query.game_id) {
        socket.join(socket.handshake.query.game_id);
        socket.emit("cards", gamestore[game_id])
    }
    socket.on("cards", (data) => {
        console.log(socket.id, " received cards");
        gamestore[game_id] = data;
        io.to(game_id).emit("cards", data)
        console.log(io.in(game_id).allSockets(), " server sending cards");
    });
});

app.use(express.static(path.join(__dirname, 'build')));

app.get('/api/new_game', function (req, res) {
    console.log("new game started");
    res.send({"game_id": createNewGame()})
})

httpServer.listen(8080);

console.log("server")
