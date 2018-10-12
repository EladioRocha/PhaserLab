
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
        
        ninja.inputEnabled = true;
        ninja.input.pixelPerfectClick = true;
        ninja.events.onInputDown.add( function(){
            console.log("CLICK");
        }, this);
    },
    update: function() {
    }
}

var game = new Phaser.Game(1012, 657, Phaser.AUTO);
    
game.state.add("gameplay", GamePlayManager);
game.state.start("gameplay");