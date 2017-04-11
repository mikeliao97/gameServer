winW = window.innerWidth;
winH = window.innerHeight;

console.log(winW, winH)

// var game = new Phaser.Game(winW * window.devicePixelRatio, winH * window.devicePixelRatio, Phaser.CANVAS, document.getElementById('game'), null, true);

var game = new Phaser.Game(winW, winH, Phaser.CANVAS, document.getElementById('game'), null, true);

game.state.add('Game', Game);
game.state.start('Game'); 