const AMOUNT_DIAMONDS = 30

GamePlayManager = {
  init: function(){
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    game.scale.pageAlignHorizontaly = true
    game.scale.pageAlignVertically = true

    this.flagFirstMouseDown = false;

  },

  preload: function(){
    game.load.image('background', 'assets/images/background.png')
    game.load.spritesheet('horse', 'assets/images/horse.png', 84, 156, 2)
    game.load.spritesheet('diamonds', 'assets/images/diamonds.png', 81, 84, 4)
  },

  getBoundsDiamond: function(currentDiamond){
    return new Phaser.Rectangle(currentDiamond.left, currentDiamond.top, currentDiamond.width, currentDiamond.height)

  },

  isRectanglesOverLapping: function(rect1, rect2){
    if(rect1.x > rect2.x+rect2.width || rect2.x > rect1.x+rect1.width){
      return false
    }
    if(rect1.y > rect2.y+rect2.height || rect2.y > rect1.y+rect1.height){
      return false
    }

    return true; 
  },

  create: function(){
    game.add.sprite(0,0, 'background')
    this.horse = game.add.sprite(0,0, 'horse')
    this.horse.frame = 0
    this.horse.x = game.width/2
    this.horse.y = game.height/2
    this.horse.anchor.setTo(0.5)

    game.input.onDown.add(this.onTap, this)

    this.diamonds = []
    for(let i = 0; i < AMOUNT_DIAMONDS; i++){
      let diamond = game.add.sprite(100, 100, 'diamonds')
      diamond.frame = game.rnd.integerInRange(0,3)
      diamond.scale.setTo(0.30 + game.rnd.frac())
      diamond.anchor.setTo(0.5)
      diamond.x = game.rnd.integerInRange(50, 1050)
      diamond.y = game.rnd.integerInRange(50, 600)

      this.diamonds[i] = diamond
      let rectHorse = this.getBoundsDiamond(this.horse)
      let rectRecurrentDiamond = this.getBoundsDiamond(diamond)
      while(this.isOverLappingOtherDiamond(i, rectRecurrentDiamond || this.isRectanglesOverLapping(rectHorse, rectRecurrentDiamond))){
        diamond.x = game.rnd.integerInRange(50, 1050)
        diamond.y = game.rnd.integerInRange(50, 600)
        rectRecurrentDiamond = this.getBoundsDiamond(diamond)
      }

    }
  },

  onTap: function(){
    this.flagFirstMouseDown = true;
  },

  isOverLappingOtherDiamond: function(index, rect2){
    for(let i = 0; i < index; i++){
      let rect1 = this.getBoundsDiamond(this.diamonds[i])
      if(this.isRectanglesOverLapping(rect1, rect2)){
        return true;
      }
    }
  },

  getBoundHorse: function(){
    let x0 = this.horse.x - this.horse.width/2
    
  },

  update: function(){
    if(this.flagFirstMouseDown){
      let pointerX = game.input.x
      let pointerY = game.input.y
  
      let distX = pointerX - this.horse.x
      let distY = pointerY - this.horse.y
  
      if(distX > 0){
        this.horse.scale.setTo(1,1)
      } else {
        this.horse.scale.setTo(-1,1)
      }
  
      this.horse.x += distX * 0.02
      this.horse.y += distY * 0.02
    }

    for(let i = 0; i < AMOUNT_DIAMONDS; i++){
      let rectHorse = this.getBoundHorse();
    }
  }
}

let game = new Phaser.Game(1136, 640, Phaser.AUTO)

game.state.add('Gameplay', GamePlayManager)
game.state.start('Gameplay')