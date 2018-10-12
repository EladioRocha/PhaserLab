
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
        
        this.ninjaGroup = game.add.group();
        
        game.add.sprite(0, 0, 'objects1');
        game.add.sprite(0, 0, 'objects2');
        
        this.prepareLevel();
        
        
    },
    prepareLevel: function(){
        var ninja1 = new Ninja(0, 'ninja', 537, 400, 537, 304, 0.7, 0, 1500, 1500);
        this.ninjaGroup.add(ninja1);

        var ninja2 = new Ninja(1, 'ninja', 746, -70, 746, 17, 1, 180, 1500, 1500);
        this.ninjaGroup.add(ninja2);
        
        game.time.events.add(1000, this.callBackShowNinja, this);  //Once
    },
    callBackShowNinja: function(){
        game.time.events.add(1000, this.callBackShowNinja, this);  //Once
        this.showNinja();
    },
    showNinja: function(){
        var newNinja = this.ninjaGroup.getFirstDead();
        console.log("showNinja:"+newNinja);
        if(newNinja!=null){
            newNinja.Appear();
        }
    },
    update: function() {
    }
}

var game = new Phaser.Game(1012, 657, Phaser.AUTO);
    
game.state.add("gameplay", GamePlayManager);
game.state.start("gameplay");