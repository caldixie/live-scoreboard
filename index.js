const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/pick.html');
});

app.get('/:team', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.get('/:team/scorer', (req, res) => {
  res.sendFile(__dirname + '/scorer.html');
});

app.use('/static', express.static(__dirname + '/public'))

io.on('connection', (socket) => {
  socket.on('blue-chat message', msg => {
    io.emit('blue-chat message', msg);
  });
  socket.on('green-chat message', msg => {
    io.emit('green-chat message', msg);
  });
  socket.on('blue-scoreboard', msg => {
    io.emit('blue-scoreboard', msg);
  });
    socket.on('green-scoreboard', msg => {
    io.emit('green-scoreboard', msg);
  });
});

http.listen(port, () => {
  console.log(`Socket.IO server running at http://localhost:${port}/`);
});
