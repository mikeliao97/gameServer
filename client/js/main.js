winW = window.innerWidth;
winH = window.innerHeight;


//Desktop View




var game = new Phaser.Game(900, 750, Phaser.CANVAS, document.getElementById('game'), null, true);
console.log('game', game);
game.state.add('Load', loadState);
game.state.add('Menu', menuState);
game.state.add('Lobby', lobbyState);
game.state.add('Game', Game);
game.state.add('Spectate', spectateState);
game.state.add('Results', gameResult);
game.state.start('Load');
