const STATE_GAME_NONE = 0;
const STATE_GAME_LOADING = 1;
const STATE_GAME_PLAYING = 2;
const STATE_GAME_GAME_OVER = 3;
const STATE_GAME_WIN = 4;

let stateGame = STATE_GAME_NONE;

GamePlayManager = {
  /*--------------- Principal function about Phaser instance ---------------*/
  init: function(){
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL
    game.scale.pageAlignHorizontally = true;
    game.scale.pageAlignVertically = true;
  },
  
  preload: function(){
    game.load.image('background', 'assets/images/backgroundSpace_01.1.png');
    game.load.image('ship', 'assets/images/fighter.png');
    game.load.image('bomb', 'assets/images/000.png');
    game.load.spritesheet('buttonPlay', 'assets/images/normal.png', 68, 68);
  },
  
  create: function(){
    //Background game
    this.background = game.add.tileSprite(0,0,600,600, 'background');
    //Ship game
    this.ship = game.add.sprite(game.width/2,500, 'ship');
    this.ship.anchor.setTo(0.5);
    //Button game;
    this.buttonPlay = game.add.button(game.width/2, game.height/2, 'buttonPlay', this.startGame, this, 0,0,0);
    this.buttonPlay.anchor.setTo(0.5);
    this.buttonPlay.scale.setTo(2,2);
    //Bomb game
    this.bomb = game.add.sprite(10, 10, 'bomb');
    this.bomb.scale.setTo(0.7);
    //Keys game
    this.registerKeys();
    //Physics game
    // game.physics.startSystem(Phaser.Physics.ARCADE);
    
  },
  
  update: function(){
    switch(stateGame){
      case STATE_GAME_NONE:

        break;
      case STATE_GAME_LOADING:

        break;
      case STATE_GAME_PLAYING:
        this.background.tilePosition.y--;
        if(this.spaceKey.isDown){
          console.log('SPACE');
        } 
        if(this.leftKey.isDown){
          this.ship.position.x -= 5;
        }
        if(this.rightKey.isDown){
          this.ship.position.x += 5;
        }
        if(this.upKey.isDown){
          this.ship.position.y -= 5;
        }
        if(this.downKey.isDown){
          this.ship.position.y += 5;
        }
        break;
      case STATE_GAME_GAME_OVER:

        break;
      case STATE_GAME_WIN:

        break;
    }
  },

  /*--------------- End of functions ---------------*/


  /*--------------- My functions --------------*/
  startGame: function(){
    this.buttonPlay.visible = false;
    stateGame = STATE_GAME_PLAYING;
  },

  registerKeys: function(){
    this.spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    this.leftKey = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
    this.rightKey = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
    this.upKey = game.input.keyboard.addKey(Phaser.Keyboard.UP);
    this.downKey = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
  }
  /*--------------- End my functions ---------------*/
}

const game = new Phaser.Game(600, 600, Phaser.AUTO);
game.state.add('gameplay', GamePlayManager);
game.state.start('gameplay');