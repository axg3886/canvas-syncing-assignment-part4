const http = require('http');
const fs = require('fs');
const socketio = require('socket.io');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const index = fs.readFileSync(`${__dirname}/../client/index.html`);

const onRequest = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/html' });
  response.write(index);
  response.end();
};

const app = http.createServer(onRequest).listen(port);
const io = socketio(app);

console.log(`Listening on 127.0.0.1: ${port}`);

io.sockets.on('connection', (socket) => {
  // Catch draw messages
  socket.on('draw', (data) => {
    // Send it to everyone
    io.emit('update', data);
  });
});
