var lobbyState = {
  playerNameHeight: 30,

  preload: function() {
  },

  create: function() {
    setLobbyEventHandlers();
    //Maybe you have to add a username like
    //Client.joinLobby(client.username);
    Client.joinLobby();

    //skey for desktop
    var skey = game.input.keyboard.addKey(Phaser.Keyboard.S);
    skey.onDown.addOnce(this.ready, this);
    
  },

  ready: function() {
    console.log('client is ready');
    Client.ready();
  },

  addStartLabels: function() {
    var welcomeLabel = game.add.text(game.world.width /2, 30, 
    "Welcome to Game Server 1", 
      {font: '35px Arial', fill: '#000000' });
    welcomeLabel.anchor.set(0.5);

    var startLabel = game.add.text(game.world.width/2, game.world.height - 20,
      "press the 'S' key when you're ready", 
      {font: '35px Arial', fill: '#000000' });
    startLabel.anchor.set(0.5)
  },

  renderServerInfo: function(players) {

    if (this.allReady(players)) {
      console.log('game should start');
      game.state.start('Game');
    }

    //remove all the elements
    game.world.children = [];

    //Add the starting labels
    this.addStartLabels();

    //Draw the players
    playerNameHeight = 30;
    _.forEach(players, (player) => {
        var textStyle = {
          font: 'bold 30pt italic'
        }
        var playerName = game.add.text(80, playerNameHeight, player.id, textStyle);
        if (player.ready) { //add the ready symbol
          var playerReady = game.add.button(playerName.x + playerName.width, playerNameHeight, 'playerReady');
        } else { //add the not ready symbol
          var playerNotReady = game.add.sprite(playerName.x + playerName.width, playerNameHeight, 'playerNotReady');
          
          //scale the playernot ready button
          playerNotReady.scale.set(0.5);
          playerNotReady.animations.add('toggle', [0, 1, 2, 3], 12, true);
          playerNotReady.play('toggle');

          //mobile can't press s, key, add a click event for ready
          playerNotReady.inputEnabled = true;
          playerNotReady.events.onInputDown.addOnce(this.ready, this);

        }
        playerNameHeight += 150;
    })
  },

  allReady: function(players) {
    
    const ready = players.reduce((acc, curr) => {
     return acc && curr.ready
    }, true)
    console.log('all players ready', ready);
    return ready;
  }



};