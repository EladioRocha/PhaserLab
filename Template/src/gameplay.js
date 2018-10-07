
GamePlayManager = {
  init: function(){
    console.log('Init');
  },
  
  preload: function(){
    console.log('Preload');

  },
  
  create: function(){
    console.log('Create');

  },
  
  update: function(){
    console.log('Update');

  }
}

const game = new Phaser.Game(1136, 640, Phaser.AUTO);
game.state.add('gameplay', GamePlayManager);
game.state.start('gameplay');