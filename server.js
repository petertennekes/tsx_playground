const express = require('express');

const path = require('path');
const app = express();
const fs = require('fs');

const httpServer = require("http").createServer(app);
const io = require("socket.io")(httpServer, {
 // ...
});

const filename = path.join(__dirname, 'public', 'card-deck.json');
const cardData = fs.readFileSync(filename);
io.on("connection", (socket) => {
 // ...
 console.log(socket.id, " connected");
 const game_id = socket.handshake.query.game_id;
 console.log(game_id);
 if (socket.handshake.query.game_id){
   socket.join(socket.handshake.query.game_id);
   socket.emit("cards", JSON.parse(cardData))
 }
 socket.on("cards", (data)=>{
  console.log(socket.id, " received cards");

  io.to(game_id).emit("cards", data)
  console.log(io.in(game_id).allSockets(), " server sending cards");
 });
});

app.use(express.static(path.join(__dirname, 'build')));

app.get('/api/new_game', function (req, res) {
 console.log("new game started");
 res.send({"game_id": Math.random().toString(36).substring(7) })
})

app.get('/api/cards', function (req, res) {
 console.log("Req file");
 res.sendFile(filename)
});

app.get('/', (req, res) => {
 res.send('Hello World!')
});


httpServer.listen(8080);

console.log("server")
//app.listen(process.env.PORT || 8080);