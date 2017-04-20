if (this.game.device.desktop) {
  this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
  this.scale.minWidth = gameWidth / 2;
  this.scale.minHeight = gameHeight / 2;
  this.scale.maxWidth = gameWidth;
  this.scale.maxHeight = gameHeight;
  this.scale.pageAlignHorizontally = true;
  this.scale.pageAlignVertically = true;
  this.scale.setScreenSize(true);
} else {
  this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
  this.scale.minWidth = gameWidth / 2;
  this.scale.minHeight = gameHeight / 2;
  this.scale.maxWidth = 2048; //You can change this to gameWidth*2.5 if needed        
  this.scale.maxHeight = 1228; //Make sure these values are proportional to the gameWidth and gameHeight          
  this.scale.pageAlignHorizontally = true;
  this.scale.pageAlignVertically = true;
  this.scale.forceOrientation(true, false);
  this.scale.hasResized.add(this.gameResized, this);
  this.scale.enterIncorrectOrientation.add(this.enterIncorrectOrientation, this);
  this.scale.leaveIncorrectOrientation.add(this.leaveIncorrectOrientation, this);
  this.scale.setScreenSize(true);
}
