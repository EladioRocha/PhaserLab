
var levelConfig;

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
        game.load.image('ninjaRed', 'assets/images/ninjaRed.png');
        game.load.image('iconLive', 'assets/images/iconLive.png');
        
        game.load.spritesheet('smoke', 'assets/images/smoke.png', 125, 125, 20);
        
        game.load.spritesheet('buttonPlay', 'assets/images/buttonPlay.png', 200, 76, 2);
        game.load.spritesheet('buttonContinue', 'assets/images/buttonContinue.png', 200, 76, 2);
        
        game.load.json('level0', 'assets/config/level0.json');
        game.load.json('level1', 'assets/config/level1.json');
        
        //FONTS
        game.load.bitmapFont('fontWhite', 'assets/fonts/bitmapFonts/fontWhite.png', 'assets/fonts/bitmapFonts/fontWhite.fnt');
    },
    create: function() {
        game.add.sprite(0, 0, 'background');
        
        this.ninjaGroup = game.add.group();
        this.smokeGroup = game.add.group();
        
        game.add.sprite(0, 0, 'objects1');
        game.add.sprite(0, 0, 'objects2');
        
        this.lives = 3;
        this.arrayIconLives = [];
        this.arrayIconLives[0] = game.add.sprite(200, game.height - 45, 'iconLive');
        this.arrayIconLives[1] = game.add.sprite(250, game.height - 45, 'iconLive');
        this.arrayIconLives[2] = game.add.sprite(300, game.height - 45, 'iconLive');
        
        this.currentScore =0; 
        this.txtCurrentScore = game.add.bitmapText(100, 35, 'fontWhite', this.currentScore.toString(), 55);
        this.txtCurrentScore.anchor.setTo(0.5);
        
        this.txtTimeLeft = game.add.bitmapText(950, 35, 'fontWhite', "", 55);
        this.txtTimeLeft.anchor.setTo(0.5);
        
        //LEVEL TEXT
        this.txtCurrentLevel = game.add.bitmapText(70, game.height - 20, 'fontWhite', "LEVEL 1", 25);
        this.txtCurrentLevel.anchor.setTo(0, 1);
        
        //Msg
        this.txtMsgEndLevel = game.add.bitmapText(game.width/2 , game.height/2, 'fontWhite', "GAME OVER", 55);
        this.txtMsgEndLevel.anchor.setTo(0.5);
        this.txtMsgEndLevel.visible = false;
        
        var pixel = game.add.bitmapData(1,1);
        pixel.ctx.fillStyle = '#000000';
        pixel.ctx.fillRect(0,0,1,1);
        
        this.bgMenu = game.add.sprite(0,0,pixel);
        this.bgMenu.width = game.width;
        this.bgMenu.height = game.height;
        this.bgMenu.alpha = 0.5;
        
        //Button Play
        this.buttonPlay = game.add.button(game.width/2 , game.height*0.8, 'buttonPlay', this.startGame, this, 1, 0, 1, 0);
        this.buttonPlay.anchor.setTo(0.5);
        //Button Continue
        this.buttonContinue = game.add.button(game.width/2 , game.height*0.8, 'buttonContinue', this.nextLevel, this, 1, 0, 1, 0);
        this.buttonContinue.anchor.setTo(0.5);
        this.buttonContinue.visible = false;
        
        //TWEEN SCORE TEXT
        this.scoreTextTween = game.add.tween(this.txtCurrentScore.scale).to({
            x: [1, 1.5, 1],
            y: [1, 1.5, 1]
        }, 500, Phaser.Easing.Elastic.Out, false, 0, 0, false);
    },
    nextLevel:function(){
        this.level++;
        this.prepareLevel();
    },
    startGame: function(){
        this.level = 0;
        this.currentScore =0; 
        this.lives = 3;
        this.refreshArrayLives();
        this.prepareLevel();
    },
    refreshArrayLives: function(){
        for(var i=0; i<this.arrayIconLives.length; i++){
            this.arrayIconLives[i].visible=false;
        }
        for(var i=0; i<this.lives; i++){
            this.arrayIconLives[i].visible=true;
        }
    },
    looseLive:function(){
        this.lives--;
        this.refreshArrayLives();
        if(this.lives<=0){
            this.gameOver();
        }
    },
    gameOver:function(){
        this.txtMsgEndLevel.visible = true;
        this.txtMsgEndLevel.text = "GAME OVER";
        
        game.time.events.remove(this.timerDown);
        this.destroyNinjaGroup();
        this.bgMenu.visible = true;
        this.buttonPlay.visible = true;
        game.time.events.remove(this.timerShowNinja);
    },
    destroyNinjaGroup:function(){
        this.ninjaGroup.forEach( function(ninja){
            ninja.kill();
        }, this);
        this.ninjaGroup.removeAll(true);
    },
    prepareLevel: function(){
        this.txtCurrentLevel.text = "LEVEL "+(this.level+1);
        this.buttonPlay.visible = false;
        this.bgMenu.visible = false;
        this.buttonContinue.visible = false;
        this.txtMsgEndLevel.visible = false;
        
        this.txtCurrentScore.text = this.currentScore.toString();
        levelConfig = game.cache.getJSON('level'+this.level);
        
        for(var i=0; i<levelConfig.ninjas.length; i++){
            var ninja = new Ninja(i, levelConfig.ninjas[i].sprite, levelConfig.ninjas[i].x0, levelConfig.ninjas[i].y0, levelConfig.ninjas[i].x1, levelConfig.ninjas[i].y1, levelConfig.ninjas[i].scale, levelConfig.ninjas[i].angle, levelConfig.ninjas[i].timeAnimation, levelConfig.ninjas[i].timeDelay);
            this.ninjaGroup.add(ninja);
        }
        
        this.timeLeft = levelConfig.timeLeft;
        this.txtTimeLeft.text = this.timeLeft.toString();
        game.time.events.add(1000, this.callBackShowNinja, this);  //Once
        
        this.timerDown = game.time.events.loop(1000, this.callBackTimeDown, this);  //Loop
    },
    callBackTimeDown:function(){
        this.timeLeft --;
        this.txtTimeLeft.text = this.timeLeft.toString();
        if(this.timeLeft<=0){
            this.levelComplete();
        }
    },
    levelComplete:function(){
        this.txtMsgEndLevel.visible = true;
        this.txtMsgEndLevel.text = "LEVEL COMPLETE";
        
        game.time.events.remove(this.timerDown);
        this.bgMenu.visible = true;
        this.buttonContinue.visible = true;
        this.destroyNinjaGroup();
        game.time.events.remove(this.timerShowNinja);
    },
    callBackShowNinja: function(){
        this.timerShowNinja = game.time.events.add(levelConfig.minTime + Math.random()*levelConfig.deltaTime, this.callBackShowNinja, this);
        this.showNinja();
    },
    showNinja: function(){
        var newNinja = this.getRandomNinja();
        if(newNinja!=null){
            newNinja.Appear();
        }
    },
    getRandomNinja:function(){
        var ninjaAvailable = false;
        
        //Verify
        var amountNinjas = this.ninjaGroup.length;
        for(var i=0; i<amountNinjas; i++){
            if(!this.ninjaGroup.children[i].alive){
                ninjaAvailable = true;
            }
        }
        if(!ninjaAvailable){
            return null;
        }
        
        var index = game.rnd.integerInRange(0, amountNinjas-1);
        var randomNinja = this.ninjaGroup.children[index];
        while(randomNinja.alive){
            index = game.rnd.integerInRange(0, amountNinjas-1);
            randomNinja = this.ninjaGroup.children[index];
        }
        return randomNinja;
    },
    hitNinja:function(id, x, y, scale, angle){
        this.increaseScore();
        var currentSmoke = this.smokeGroup.getFirstDead();
        if(currentSmoke==null){
            currentSmoke = this.smokeGroup.create(x,y,'smoke');
            currentSmoke.animations.add('explode', [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19]);
            currentSmoke.anchor.setTo(0.5, 1);
        }
        
        currentSmoke.reset(x,y);
        currentSmoke.scale.setTo(scale);
        currentSmoke.angle = angle;
        currentSmoke.animExplode = currentSmoke.animations.play('explode', 16);
        currentSmoke.animExplode.onComplete.add(function (sprite, animation) {
            sprite.kill();
        },this);
    },
    increaseScore:function(){
        this.currentScore +=100;  
        this.txtCurrentScore.text = this.currentScore.toString();
        this.scoreTextTween.start();
    },
    update: function() {
    }
}

var game = new Phaser.Game(1012, 657, Phaser.AUTO);
    
game.state.add("gameplay", GamePlayManager);
game.state.start("gameplay");