function Meta(game) { 
	// spriteSheet, startX, startY, frameWidth, 
	// frameHeight, frameDuration, frames, loop, reverse
	this.rNeutral = new Animation(ASSET_MANAGER.getAsset("./img/MetaKnightCustom.png"), 512, 13, 91, 80, 0.05, 1, true, false);
	this.lNeutral = new Animation(ASSET_MANAGER.getAsset("./img/MetaKnightCustom.png"), 2537, 13, 91, 80, 0.05, 1, true, false);
	this.rDucking = new Animation(ASSET_MANAGER.getAsset("./img/MetaKnightCustom.png"), 603, 54, 101, 47, 0.05, 1, true, false);
	this.lDucking = new Animation(ASSET_MANAGER.getAsset("./img/MetaKnightCustom.png"), 2436, 54, 101, 47, 0.05, 1, true, false);
	this.runRAnimation = new Animation(ASSET_MANAGER.getAsset("./img/MetaKnightCustom.png"), 0, 0, 64, 102, 0.05, 8, true, false);
	this.runLAnimation = new Animation(ASSET_MANAGER.getAsset("./img/MetaKnightCustom.png"), 2628, 0, 64, 102, 0.05, 8, true, true);
	this.jumpAnimation = new Animation(ASSET_MANAGER.getAsset("./img/MetaKnightCustom.png"), 0, 101, 84, 105, 0.05, 9, false, false);
	this.jumpLAnimation = new Animation(ASSET_MANAGER.getAsset("./img/MetaKnightCustom.png"), 2384, 101, 84, 105, 0.05, 9, false, true);
	this.attackRAnimation = new Animation(ASSET_MANAGER.getAsset("./img/MetaKnightCustom.png"), 0, 206, 157, 123, 0.05, 10, false, false);
	this.attackLAnimation = new Animation(ASSET_MANAGER.getAsset("./img/MetaKnightCustom.png"), 1570, 206, 157, 123, 0.05, 10, false, true);
	this.jmpAtkAnimR = new Animation(ASSET_MANAGER.getAsset("./img/MetaKnightCustom.png"), 0, 446, 109, 149, 0.04, 8, true, false);
	this.jmpAtkAnimL = new Animation(ASSET_MANAGER.getAsset("./img/MetaKnightCustom.png"), 872, 446, 109, 149, 0.03, 8, true, true);
	this.jumping = false;
	this.attack = false;
	this.run = false;
	this.duck = false;
	this.left = false;
	this.right = true;
	this.air = false;
	this.radius = 100;
	this.ground = 480;
	Entity.call(this, game, 20, 480, "Meta");
	MetaGameX = this.gameX;
	MetaGameY = this.gameY;
}

Meta.prototype = new Entity();
Meta.prototype.constructor = Meta;

Meta.prototype.update = function () {
    if (this.game.x) this.jumping = true;
	if (this.game.z) this.attack = true;
	this.run = (this.game.right || this.game.left);
	this.duck = this.game.down; 
 	if (this.jumping) {
		if (this.right) {
			this.jumpAnimation.elapsedTime = this.jumpLAnimation.currentFrame() > this.jumpAnimation.currentFrame() ? this.jumpLAnimation.elapsedTime : this.jumpAnimation.elapsedTime;
			this.jumpHelper(this.jumpAnimation);
		}
		else {
			this.jumpLAnimation.elapsedTime = this.jumpAnimation.currentFrame() > this.jumpLAnimation.currentFrame() ? this.jumpAnimation.elapsedTime : this.jumpLAnimation.elapsedTime;
			this.jumpHelper(this.jumpLAnimation)
		}
	} 
	if (this.attack && this.jumping) {
		if (this.right) {
			this.jumpHelper(this.jumpAnimation);
			this.jumpAnimation.elapsedTime += this.game.clockTick;
		} else {
			this.jumpHelper(this.jumpLAnimation);
			this.jumpLAnimation.elapsedTime += this.game.clockTick;
		}
	}
	if (this.attack && !this.jumping) {
		this.run = false;
		if (this.attackRAnimation.isDone() || this.attackLAnimation.isDone()) {
			this.attackRAnimation.elapsedTime = 0;
			this.attackLAnimation.elapsedTime = 0;
			this.attack = false;
			if (this.game.right || this.game.left) {
				this.run = true;
			}
		}
	}
	
	if (this.run) {
		if (this.game.right) {
			if (this.gameX + 5 <= 2135) {
				this.gameX += 5;
			}
			this.right = true;
			this.left = false;
			//if (this.gameX > 800) this.gameX = -10;
		} else if (this.game.left) {
			if (this.gameX - 5 >= 0) {
				this.gameX -= 5;
			}
			this.left = true;
			this.right = false;
			//if(this.gameX < -50) this.gameX = 810;
		}
	}
	MetaGameX = this.gameX;
    Entity.prototype.update.call(this);
}

Meta.prototype.draw = function (ctx) {
	if (this.jumping && this.attack) {
		if (this.right) {
			this.jmpAtkAnimR.drawFrame(this.game.clockTick, ctx, this.gameX - this.game.camera.gameX, this.gameY - 20);
		}
		if (this.left) {
			this.jmpAtkAnimL.drawFrame(this.game.clockTick, ctx, this.gameX - this.game.camera.gameX, this.gameY - 20);
		}
	} 

    else if (this.jumping) {
		if (this.right) {
			this.jumpAnimation.drawFrame(this.game.clockTick, ctx, this.gameX - this.game.camera.gameX, this.gameY - 20);
		}
		else {
			this.jumpLAnimation.drawFrame(this.game.clockTick, ctx, this.gameX - this.game.camera.gameX, this.gameY - 20);
		 }
    }
	else if (this.attack) {
		if (this.right) {
			this.attackRAnimation.drawFrame(this.game.clockTick, ctx, this.gameX - this.game.camera.gameX, this.gameY - 3);
		}
		if (this.left) {
			this.attackLAnimation.drawFrame(this.game.clockTick, ctx, this.gameX - 60 - this.game.camera.gameX, this.gameY - 3);
		}
	} 

    else if (this.run && this.right) {
        this.runRAnimation.drawFrame(this.game.clockTick, ctx, this.gameX - this.game.camera.gameX, this.gameY - 7);
    }
	else if (this.run && this.left) {
        this.runLAnimation.drawFrame(this.game.clockTick, ctx, this.gameX - this.game.camera.gameX, this.gameY - 7);
    }

	else if (this.duck) {
		if (this.right) {
			this.rDucking.drawFrame(this.game.clockTick, ctx, this.gameX - this.game.camera.gameX, this.gameY + 40);
		}
		if (this.left) {
			this.lDucking.drawFrame(this.game.clockTick, ctx, this.gameX - this.game.camera.gameX, this.gameY + 40);
		}
	}
	else {
		if (this.right) {
			this.rNeutral.drawFrame(this.game.clockTick, ctx, this.gameX - this.game.camera.gameX, this.gameY);
		}
		if (this.left) {
			this.lNeutral.drawFrame(this.game.clockTick, ctx, this.gameX - this.game.camera.gameX, this.gameY);
		}
	}
    Entity.prototype.draw.call(this);
}

Meta.prototype.jumpHelper = function(theAnim) {
	if (theAnim.isDone()) {
				this.jumpLAnimation.elapsedTime = 0;
				this.jumpAnimation.elapsedTime = 0;
				this.jumping = false;
				this.attack = false;
			} 
			var jumpDistance = theAnim.elapsedTime / theAnim.totalTime;
			var totalHeight = 100;
			if (jumpDistance > 0.5)
				jumpDistance = 1 - jumpDistance;
			
			var height = totalHeight *(-4 * (jumpDistance * jumpDistance - jumpDistance));
			this.gameY = this.ground - height;
			
}