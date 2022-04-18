const express = require('express');
const fs = require('fs');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

app.get('*', (req, res) => {
  let newUrl = req.url;
  if (newUrl.startsWith('/')) newUrl = newUrl.slice(1);
  if (newUrl === '') newUrl = 'client/index.html';

  const headers = { 'Content-Type': 'text/html' };
  fs.readFile(newUrl, function (error, data) {
    if (error) {
      res.writeHead(404, headers);
      res.write('<html><h1>error 404 page not found</h1></html>');
    } else {
      res.writeHead(200, headers);
      res.write(data);
    }
    res.end();
  });
});

server.listen(8080, () => {
  console.log('Server is Running');
});

const the_interval = 50;
setInterval(update, the_interval);

function update() {}

io.on('connection', (socket) => {
  console.log('User Connected : ' + socket.id);
  socket.on('disconnect', () => {
    console.log('User Disconnected : ' + socket.id);
  });
});
