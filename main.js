var MetaGameX = null;
var MetaGameY = null;
var CameraX = 0;
var CameraY = 0;
function Animation(spriteSheet, startX, startY, frameWidth, frameHeight, frameDuration, frames, loop, reverse) {
    this.spriteSheet = spriteSheet;
    this.startX = startX;
    this.startY = startY;
    this.frameWidth = frameWidth;
    this.frameDuration = frameDuration;
    this.frameHeight = frameHeight;
    this.frames = frames;
    this.totalTime = frameDuration * frames;
    this.elapsedTime = 0;
    this.loop = loop;
    this.reverse = reverse;
}

Animation.prototype.drawFrame = function (tick, ctx, x, y, scaleBy) {
    var scaleBy = scaleBy || 1;
    this.elapsedTime += tick;
    if (this.loop) {
        if (this.isDone()) {
            this.elapsedTime = 0;
        }
    } else if (this.isDone()) {
        return;
    }
    var index = this.reverse ? this.frames - this.currentFrame() - 1 : this.currentFrame();
    var vindex = 0;
    if ((index + 1) * this.frameWidth + this.startX > this.spriteSheet.width) {
        index -= Math.floor((this.spriteSheet.width - this.startX) / this.frameWidth);
        vindex++;
    }
    while ((index + 1) * this.frameWidth > this.spriteSheet.width) {
        index -= Math.floor(this.spriteSheet.width / this.frameWidth);
        vindex++;
    }

    var locX = x;
    var locY = y;
    var offset = vindex === 0 ? this.startX : 0;
    ctx.drawImage(this.spriteSheet,
                  index * this.frameWidth + offset, vindex * this.frameHeight + this.startY,  // source from sheet
                  this.frameWidth, this.frameHeight,
                  locX, locY,
                  this.frameWidth * scaleBy,
                  this.frameHeight * scaleBy);
	
}

Animation.prototype.currentFrame = function () {
    return Math.floor(this.elapsedTime / this.frameDuration);
}

Animation.prototype.isDone = function () {
    return (this.elapsedTime >= this.totalTime);
}

function Background(game) {
	this.bkgr = new Animation(ASSET_MANAGER.getAsset("./img/SeaBkgr.png"), 0, 0, 850, 551, 1, 1, true, false);
	 this.radius = 200;
	   Entity.call(this, game, 0, 0, "Background");
}

Background.prototype = new Entity();
Background.prototype.constructor = Background;

Background.prototype.update = function () {
}

Background.prototype.draw = function (ctx) {
   this.bkgr.drawFrame(this.game.clockTick, ctx, this.gameX, this.gameY);
  // ctx.drawImage(this, this.width, this.height);
}

function Tile(game) {
	this.gTile = new Animation(ASSET_MANAGER.getAsset("./img/GroundTile.png"), 0, 0, 200, 200, 1, 1, true, false);
	this.radius = 200;
	Entity.call(this, game, 0, 530, "Tile");
}

Tile.prototype = new Entity();
Tile.prototype.constructor = Tile;

Tile.prototype.update = function () {
	
}

Tile.prototype.draw = function (ctx) {
	for (var i = 0; i <= 14; i++) {
		this.gTile.drawFrame(this.game.clockTick, ctx, this.gameX + (i * 200) - this.game.camera.gameX, this.gameY);
	}
  // ctx.drawImage(this, this.width, this.height);
}

var ASSET_MANAGER = new AssetManager();

ASSET_MANAGER.queueDownload("./img/MetaKnightCustom.png");
ASSET_MANAGER.queueDownload("./img/SeaBkgr.png");
ASSET_MANAGER.queueDownload("./img/GroundTile.png");
ASSET_MANAGER.downloadAll(function () {
	var canvas = document.getElementById('gameWorld');
    var ctx = canvas.getContext('2d');

    var gameEngine = new GameEngine();
	gameEngine.init(ctx);
    var bg = new Background(gameEngine);
	var tile = new Tile(gameEngine);
	//var meta = new Meta(gameEngine);
	//var camera = new Camera(gameEngine);
	//gameEngine.addEntity(camera);
    gameEngine.addEntity(bg);
    gameEngine.addEntity(tile);
	//gameEngine.addEntity(meta);
	gameEngine.addEntity(gameEngine.meta);
	gameEngine.addEntity(gameEngine.camera);
    //gameEngine.init(ctx);
    gameEngine.start();
});
