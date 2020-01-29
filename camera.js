function Camera(game) {
	Entity.call(this, game, 0, 0);
	this.mapSize = 2200;
	this.screenSize = 800;
	this.myMoveAmount = 0;
}

Camera.prototype = new Entity();
Camera.prototype.constructor = Camera;

Camera.prototype.update = function() {
	playerX = this.game.meta.gameX;
	if (playerX >= this.screenSize / 2 && playerX <= this.mapSize - this.screenSize / 2) {
			this.gameX = playerX - 400;
	}
	else if (playerX - 5 <= 0){ 
		this.gameX = 0;
	} else if (playerX + 5 >= this.mapSize) {
		this.gameX = this.mapSize - 800;
	}
	//console.log(playerX + " " + this.gameX);
	//this.game.mapX = this.gameX;
	//this.checkBoundaries();
}

Camera.prototype.draw = function() {
	
}

Camera.prototype.checkBoundaries = function() {
	if (this.myMoveAmount + this.gameX < this.screenSize - this.mapSize) {
		this.myMoveAmount = this.screenSize - this.mapSize - this.gameX;
	} else if (this.myMoveAmount + this.gameX > 0) {
		this.myMoveAmount = 0 - this.gameX;
	} 
}
