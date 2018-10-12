
GamePlayManager = {
    init: function() {
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        game.scale.pageAlignHorizontally = true;
        game.scale.pageAlignVertically = true;
    },
    preload: function() {
        game.load.image('background', 'assets/images/background.png');
        game.load.image('objects1', 'assets/images/objects1.png');
        game.load.image('objects2', 'assets/images/objects2.png');
        game.load.image('ninja', 'assets/images/ninja.png');
    },
    create: function() {
        game.add.sprite(0, 0, 'background');
        game.add.sprite(0, 0, 'objects1');
        game.add.sprite(0, 0, 'objects2');
        
        var ninja = game.add.sprite(500, 220, 'ninja');
        this.tween = game.add.tween(ninja);
        this.tween.to({x:700, y:170}, 1500, Phaser.Easing.Elastic.InOut);
        this.tween.start();
        
        this.tween.onComplete.add( function(){
            console.log("END ANIMATION");
            }
        );
    },
    update: function() {
    }
}

var game = new Phaser.Game(1012, 657, Phaser.AUTO);
    
game.state.add("gameplay", GamePlayManager);
game.state.start("gameplay");