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

  socket.broadcast.emit("cards", data)
  console.log(socket.id, " server sending cards");
 });
});


/*

const wss = new WebSocket.Server({ port: 8081 });

wss.on('connection', function connection(ws) {
 console.log("connected");
 ws.on('message', function incoming(data) {
  console.log('received data. length: %s', data.length);

  wss.clients.forEach(function each(client) {
   if (client !== ws && client.readyState === WebSocket.OPEN) {
    client.send(data);
   }
  });
 });
});

*/
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