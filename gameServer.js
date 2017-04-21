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

var counter = 0;
app.get('*', function(req, res) {
  var requestUrl = url.parse(req.url);
  var regex = /gameServer\d\/$/
  //This regex checks if the request Url is in the form of /GameServer2/
  console.log('requestUrl', requestUrl);
  var matched = requestUrl.path.search(regex);
  console.log('matched', matched);
  if (matched !== -1 && counter === 0) { 
    console.log('DOING STIFFFFFFFFFF');
    var pathName = requestUrl.path + 'socket.io/'

    var io = require('socket.io')(server, {path: pathName});
    var socketManager = require('./server/socket.js')(io);
    counter++;
  } 


  res.sendFile(__dirname + '/client/index.html');
});

server.listen(process.env.PORT || 3005, function() {
  console.log(`gameServer is listening on PORT ${process.env.port || 3005}`);
});