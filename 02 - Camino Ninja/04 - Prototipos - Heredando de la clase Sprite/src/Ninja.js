
Ninja = function(){
    Phaser.Sprite.call(this, game, 100, 500, 'ninja');
}

Ninja.prototype = Object.create(Phaser.Sprite.prototype);
Ninja.prototype.constructor = Ninja;