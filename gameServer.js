var express = require('express');
var path = require('path');
const url = require('url');
var app = express();
var server = require('http').Server(app);
// var io = require('socket.io')(server); 

// var io = require('socket.io')(server, {path: '/gameServer1/socket.io/'});
// var io = require('socket.io')(server, {transports: ["websocket", "polling"] });

var velocity = require('./server/velocity.js');
var interactions = require('./server/interactions.js');

// var socketManager = require('./server/socket.js')(io);

app.use('*/sockets', express.static(__dirname + '/client/sockets'));
app.use('*/js', express.static(__dirname + '/client/js'));
app.use('*/assets', express.static(path.join(__dirname + '/client/assets')));
app.use('*/css', express.static(path.join(__dirname + '/client/css')));



app.get('*', function(req, res) {
  var requestUrl = url.parse(req.url);
  //my god this is terrible code
  //this if statement just checks if the requestUrl.path == something like '/GameServer1/'
  if (requestUrl.path.length === 13) { 
    
    var pathName = requestUrl.path + 'socket.io/'
    
    var io = require('socket.io')(server, {path: pathName});
    var socketManager = require('./server/socket.js')(io);
  } 


  res.sendFile(__dirname + '/client/index.html');
});

server.listen(process.env.PORT || 3005, function() {
  console.log(`gameServer is listening on PORT ${process.env.port || 3005}`);
});