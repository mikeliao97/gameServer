
var gameServerUrls = {
  'gameServer1': '/gameServer1',
  'gameServer2': '/gameServer2',
  'gameServer3': '/gameServer3',
}

var pathname = document.location.pathname

var Client = {};
if (pathname !== '/') {
   alert(`origin ${document.location.origin}`);
   alert(`extra, ${pathname + 'socket.io'}`);
   Client.socket = io.connect(document.location.origin, {path: pathname + 'socket.io'});
} else {
  Client.socket = io.connect();
}




var setGameEventHandlers = function() {
  Client.socket.on('newPlayer', function(player) {

    console.log('adding new player in client');
    Game.addNewPlayer(player);
  });

  Client.socket.on('allPlayers', function(players) {
    players.forEach((player) => {
      Game.addNewPlayer(player);
    });
  });

  Client.socket.on('pulse', function(players) {
  	players.forEach( (player) => {
  		Game.updatePlayerPosition(player);
  	})
  })

  Client.socket.on('death', function(player) {
  	Game.death(player);
  })

  Client.socket.on('remove', function(playerId) {
    Game.remove(playerId);
  });

  Client.socket.on('gameOver', function(players) {
    Game.over(players);
  });

};

var setLobbyEventHandlers = function() {

  Client.socket.on('playerReady', function(username) {
    lobbyState.playerReady(username);
  });

  /* Add other code */
  Client.socket.on('renderInfo', function(allPlayers) {
    lobbyState.renderServerInfo(allPlayers);
  })
};

var removeAllSocketListeners = function() {
  Client.socket.removeAllListeners('playerJoined');
  Client.socket.removeAllListeners('playerReady');
  Client.socket.removeAllListeners('allPlayersInLobby');
  Client.socket.removeAllListeners('newPlayer');
  Client.socket.removeAllListeners('allPlayers');
  Client.socket.removeAllListeners('remove');
  Client.socket.removeAllListeners('updatePlayer');
};

var removeAllSocketListenersGame = function() {
  Client.socket.removeAllListeners('newPlayer');
  Client.socket.removeAllListeners('allPlayers');
  Client.socket.removeAllListeners('pulse');
  Client.socket.removeAllListeners('death');
  Client.socket.removeAllListeners('remove');
  Client.socket.removeAllListeners('gameOver');
  Client.socket.removeAllListeners('heartBeat');
  
}




Client.askNewPlayer = function() {
  Client.socket.emit('addNewPlayer');
};

Client.heartBeat = function(coordinates) {
  Client.socket.emit('heartBeat', coordinates);
};

Client.joinLobby = function() {
  Client.socket.emit('joinLobby', window.username);
  //Maybe do Clietn.socket.emit('joinLobby', username);
};

Client.ready = function() {
  Client.socket.emit('playerReady');
};

Client.askNewSpectator = function() {
  Client.socket.emit('newSpectator');
};