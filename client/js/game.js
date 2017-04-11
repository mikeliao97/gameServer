var Game = {};
Game.playerMap = {};

var gyroX;
var gyroY;

var gn = new GyroNorm();

Game.init = function() {
	game.state.disableVisibilityChange = true;

 };

Game.preload = function() {
	game.load.image('background', 'assets/board.png');
	game.load.image('character', 'assets/ball.png');
}

Game.create = function() {
	Game.add.sprite(0, 0, 'background');
	Client.askNewPlayer();
	Game.cursor = {x: 450, y: 300};
	/*
	Use with gyrojs
	// Game.pulse = setInterval(Game.heartBeat, 300);
	 gyro.frequency = 1000
	 gyro.startTracking(function(o) {
      // updating player velocity
		
			const moveX = o.gamma * 30;
			const moveY = o.beta * 30;
			
			// console.log('gamma', o.gamma);
			// console.log('beta', o.beta);
			// console.log('movex', moveX);
			// console.log('moveY', moveY);
			console.log('o', o);
			Game.cursor.x += moveX;
			Game.cursor.y += moveY;
						// console.log('o', o);
			// console.log('coords', Game.cursor);
		
			
   });
	 */
	var args = {
		frequency:50,					// ( How often the object sends the values - milliseconds )
		gravityNormalized:true,			// ( If the garvity related values to be normalized )
		orientationBase:GyroNorm.GAME,		// ( Can be GyroNorm.GAME or GyroNorm.WORLD. gn.GAME returns orientation values with respect to the head direction of the device. gn.WORLD returns the orientation values with respect to the actual north direction of the world. )
		decimalCount:2,					// ( How many digits after the decimal point will there be in the return values )
		logger:true,					// ( Function to be called to log messages from gyronorm.js )
		screenAdjusted:false			// ( If set to true it will return screen adjusted values. )
	};
	
	 gn.init(args).then(function() {
		 gn.start(function(data) {
			// Game.cursor.x += data.do.gamma;
			// Game.cursor.y += data.do.beta;
			console.log('x', data.dm.gx);
			console.log('y', data.dm.gy);

			Game.cursor.x -= data.dm.gx;
			Game.cursor.y += data.dm.gy;
		 })
	 }).catch(function(e) {
		console.log('error', e);
	 })


}

var counter = 0;
Game.update = function() {
	/*
	if (game.input.activePointer.isDown) {
		Game.cursor = {x: game.input.activePointer.x, y: game.input.activePointer.y};
		Game.heartBeat();
	}
	Game.cursor = {x: game.input.activePointer.x, y: game.input.activePointer.y};
	*/
	 // setting gyroscope update frequency

	 Game.heartBeat();
}

Game.heartBeat = function() {
	Client.heartBeat(Game.cursor);
}
Game.addNewPlayer = function(id, x, y) {
	Game.playerMap[id] = Game.add.sprite(x, y, 'character');
	Game.playerMap[id].anchor.x = 0.5;
	Game.playerMap[id].anchor.y = 0.5;	
}

Game.remove = function(id) {
	Game.playerMap[id].destroy();
	delete Game.playerMap[id];
}

Game.updatePlayer = function(id, x, y) {
	var player = Game.playerMap[id];
	if (player) {
		//try making this velocity to git rid of the jerkyness

		var tween = Game.add.tween(player);
		var travel = Game.distance(player.x, player.y, x, y);
		var time = travel * 3;
		tween.to({x: x, y: y}, time);
		tween.start();
	}
}

Game.distance = function(x, y, xTo, yTo) {
	var xDistance = Math.pow(x - xTo, 2);
	var yDistance = Math.pow(y - yTo, 2);
	return Math.sqrt(xDistance + yDistance);
}