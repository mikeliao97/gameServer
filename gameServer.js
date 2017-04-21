var express = require('express');
var path = require('path');

var app = express();
var server = require('http').Server(app);
var io = require('socket.io').listen(server);

var velocity = require('./server/velocity.js');
var interactions = require('./server/interactions.js');

var socketManager = require('./server/socket.js')(io);

app.use('*/sockets', express.static(__dirname + '/client/sockets'));
app.use('*/js', express.static(__dirname + '/client/js'));
app.use('*/assets', express.static(path.join(__dirname + '/client/assets')));
app.use('*/css', express.static(path.join(__dirname + '/client/css')));

app.get('*', function(req, res) {
  console.log('request', req.url);
  res.sendFile(__dirname + '/client/index.html');
});

server.listen(process.env.PORT || 3005, function() {
  console.log(`gameServer is listening on PORT ${process.env.port || 3005}`);
});