const express = require('express');

const path = require('path');
const app = express();

const httpServer = require("http").createServer(app);
const io = require("socket.io")(httpServer, {
 // ...
});

io.on("connection", (socket) => {
 // ...
 console.log(socket.id, " connected");
 socket.on("cards", (data)=>{
  console.log(socket.id, " received cards");

  setTimeout(()=>{io.emit("cards", data)}, 300); //artifically set timeout to simulate network delay
  console.log(io.allSockets(), " server sending cards");
 });
});

app.use(express.static(path.join(__dirname, 'build')));


app.get('/api/cards', function (req, res) {
 console.log("Req file");
 res.sendFile(path.join(__dirname, 'public', 'card-deck.json') )
});

app.get('/', (req, res) => {
 res.send('Hello World!')
});


httpServer.listen(8080);

console.log("server")
//app.listen(process.env.PORT || 8080);