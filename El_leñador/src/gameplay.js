const STATE_GAME_NONE = 0;
const STATE_GAME_LOADING = 1;
const STATE_GAME_PLAYING = 2;
const STATE_GAME_GAME_OVER = 3;
const STATE_GAME_WIN = 4;

let stateGame = STATE_GAME_NONE;
let distanceTrunks = 70;

GamePlayManager = {
  init: function(){
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL
    game.scale.pageAlignHorizontally = true;
    game.scale.pageAlignVertically = true;

    this.cursors = game.input.keyboard.createCursorKeys();
    this.pressEnable = true;
  },
  
  preload: function(){
    stateGame = STATE_GAME_LOADING;
    game.load.image('background','assets/images/background.png');
    game.load.image('manStand','assets/images/man_stand.png');
    game.load.image('manHit', 'assets/images/man_hit.png');
    game.load.image('trunk', 'assets/images/trunk.png');
    game.load.image('tomb', 'assets/images/tomb.png')
    game.load.spritesheet('buttonPlay','assets/images/buttonPlay.png',65,65,2);

    game.load.audio('loopMusic', 'assets/sounds/musicLoop.mp3');
    game.load.audio('sfxHit', 'assets/sounds/sfxHit.mp3');
    game.load.audio('sfxGameOver', 'assets/sounds/sfxGameOver.mp3');
  },
  
  create: function(){
    this.sequence = [];
    game.add.sprite(0,0,'background');
    this.man = game.add.sprite(80, 460,'manStand');
    this.man.anchor.setTo(0.5, 1);
    this.buttonPlay = game.add.button(game.width/2, game.height/2, 'buttonPlay', this.startGame, this, 1, 0, 1, 0);
    this.buttonPlay.anchor.setTo(0.5);

    this.trunks = game.add.group();
    for(let i = 0; i < 30; i++){
      let trunk = this.trunks.create(0,0,'trunk');
      trunk.anchor.setTo(0,0.5);
      trunk.kill();
    }

    this.tomb = game.add.sprite(80, 460, 'tomb');
    this.tomb.anchor.setTo(0.5, 1);
    this.tomb.visible = false;

    //Texto del juego
    const style = {
      font: 'bold 30pt Arial',
      fill: '#FFFFFF',
      align: 'center'
    }
    
    this.currentScore = 0;

    this.textField = game.add.text(game.width/2, 40, this.currentScore.toString(), style);
    this.textField.anchor.setTo(0.5);

    let pixel = game.add.bitmapData(1,1);
    pixel.ctx.fileStyle = "red";
    pixel.ctx.fillRect(0,0,1,1);

    this.bar = game.add.sprite(0,0,pixel);
    this.bar.anchor.setTo(0);
    this.bar.width = game.width;
    this.bar.height = 10;

    this.sfxGameOver = game.add.audio('sfxGameOver');
    this.sfxHit = game.add.audio('sfxHit');
    this.loopMusic = game.add.audio('loopMusic');
  },

  refreshBar: function(value){
    let newWidth = this.bar.width + value;
    if(newWidth > game.width){
      newWidth = game.width;
    }
    if(newWidth <= 0){
      newWidth = 0;
      this.gameOver();
    }
    this.bar.width = newWidth;
  },

  startGame: function(){
    stateGame = STATE_GAME_PLAYING;
    this.bar.width = game.width;
    this.loopMusic.loop = true;
    this.loopMusic.play();
    //Limpiar secuencia
    for(let i = 0; i < this.sequence.length; i++){
      if(this.sequence[i] != null){
        this.sequence[i].kill();
      }
    }

    this.currentScore = 0;
    this.textField.text = this.currentScore.toString();
    //Sequence
    this.buttonPlay.visible = false;
    this.sequence = [];
    this.sequence.push(null);
    this.sequence.push(null);
    this.sequence.push(null);

    this.man.visible = true;
    this.tomb.visible = false;

    for(let i = 0; i < 10; i++){
      this.addTrunk();
    }
    this.printSequence();
  },

  increaseScore: function(){
    this.currentScore += 100;
    this.textField.text = this.currentScore.toString();
  },

  hitMan: function(direction){
    this.sfxHit.play();
    for(let i = 0; i < this.sequence.length; i++){
      if(this.sequence[i] != null){
        this.sequence[i].y += distanceTrunks;
      }
    }

    let firtsTrunk = this.sequence.shift();
    if(firtsTrunk != null){
      firtsTrunk.kill();
    }
    this.addTrunk();
    let checkTrunk = this.sequence[0];
    if(checkTrunk != null && checkTrunk.direction == direction){
      this.gameOver();
    } else{
      this.increaseScore();
    }
    this.printSequence();
  },

  gameOver: function(){
    stateGame = STATE_GAME_GAME_OVER;
    this.man.visible = false;
    this.tomb.visible = true;
    this.tomb.x = this.man.x;
    this.buttonPlay.visible = true;
    this.loopMusic.stop();
    this.sfxGameOver.play();
  },

  addTrunk: function(){
    this.refreshBar(6);
    let number = game.rnd.integerInRange(-1,1);
    if(number == 1){
      let trunk = this.trunks.getFirstDead();
      trunk.direction = 1;
      trunk.scale.setTo(1);
      trunk.reset(game.world.centerX, 380 - (this.sequence.length)*distanceTrunks)
      this.sequence.push(trunk);
    } else if(number == -1){
      let trunk = this.trunks.getFirstDead();
      trunk.direction = -1;
      trunk.scale.setTo(-1,1);
      trunk.reset(game.world.centerX, 380 - (this.sequence.length)*distanceTrunks)
      this.sequence.push(trunk);
    } else {
      this.sequence.push(null)
    }
  },

  printSequence: function(){
    let stringSequence = '';
    for (let i = 0; i < this.sequence.length; i++) {
      if(this.sequence[i] == null){
        stringSequence += '0,';
      } else {
        stringSequence += this.sequence[i].direction+",";
      }
    }
    console.log(stringSequence);
  },

  update: function(){
    switch(stateGame){
      case STATE_GAME_NONE:

        break;
      case STATE_GAME_LOADING:

        break;
      case STATE_GAME_PLAYING:
        this.refreshBar(-0.5);
        if(this.cursors.left.isDown && this.pressEnable){
          this.pressEnable = false;
          this.man.x = 80;
          this.man.scale.setTo(1);
          this.man.loadTexture('manHit');
          this.hitMan(-1);
        }
        if(this.cursors.right.isDown && this.pressEnable){
          this.pressEnable = false;
          this.man.x = 240;
          this.man.scale.setTo(-1, 1);
          this.man.loadTexture('manHit');
          this.hitMan(1);
        }
        if(this.cursors.left.isUp && this.cursors.right.isUp){
          this.pressEnable = true;
          this.man.loadTexture('manStand');
        }
        break;
      case STATE_GAME_GAME_OVER:
        console.log('GAME OVER')
        break;
      case STATE_GAME_WIN:

        break;
    }
  }
}

const game = new Phaser.Game(320, 480, Phaser.AUTO);
game.state.add('gameplay', GamePlayManager);
game.state.start('gameplay');