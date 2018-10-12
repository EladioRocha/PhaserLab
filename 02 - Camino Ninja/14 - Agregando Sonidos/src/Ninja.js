
Ninja = function(id, assetName, x0, y0, x1, y1, scale, angle, timeAnimation, timeDelay){
    Phaser.Sprite.call(this, game, x0, y0, assetName);
    
    this.inputEnabled = true;
    this.input.pixelPerfectClick = true;
    this.events.onInputDown.add( function () {
        this.kill();
        GamePlayManager.hitNinja(this.id, this.x, this.y, this.scale.x, this.angle);
        if(this.tweenIn!=null){
            this.tweenIn.stop();
        }
        if(this.tweenOut!=null){
            this.tweenOut.stop();
        }
    }, this);
    
    this.id = id;
    this.x0 = x0;
    this.y0 = y0;
    this.x1 = x1;
    this.y1 = y1;
    this.defaultScale = scale;
    this.angle = angle;
    this.timeAnimation = timeAnimation;
    this.timeDelay = timeDelay;
    
    this.scale.setTo(scale);
    this.anchor.setTo(0.5, 1);
    this.kill();
}

Ninja.prototype = Object.create(Phaser.Sprite.prototype);
Ninja.prototype.constructor = Ninja;

Ninja.prototype.Appear = function(){
    this.reset(this.x0, this.y0);
    this.tweenIn = game.add.tween(this);
    this.tweenOut = game.add.tween(this);
    
    this.tweenIn.to( { x:this.x1, y:this.y1 }, this.timeAnimation, Phaser.Easing.Quadratic.In );
    this.tweenOut.to( { x:this.x0, y:this.y0 }, this.timeAnimation, Phaser.Easing.Quadratic.Out, false, this.timeDelay );
    
    this.tweenIn.onComplete.add( function () {
        this.tweenOut.start();
        this.tweenOut.onComplete.add( function () {
            GamePlayManager.looseLive();
            this.kill();
            if(this.tweenIn!=null){
                this.tweenIn.stop();
            }
            if(this.tweenOut!=null){
                this.tweenOut.stop();
            }
        }, this);
        
    }, this);
    
    
    this.tweenIn.start();
}

Ninja.prototype.kill = function(){
    if(this.tweenIn!=null){
        this.tweenIn.stop();
    }
    if(this.tweenOut!=null){
        this.tweenOut.stop();
    }
    Phaser.Sprite.prototype.kill.call(this);
}
