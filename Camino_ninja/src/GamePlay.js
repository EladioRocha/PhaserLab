
GamePlayManager = {
    init: function() {
      //Este hace que la pantalla se responsiva
      game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
      //Los siguientes dos atributos hacen que el background se centre a la pantalla.
      game.scale.pageAlignHorizontally = true;
      game.scale.pageAlignVertically = true;
    },
    preload: function() {
      //Aquí cargamos las imagenes que vamos a usar.
      game.load.image('background', 'assets/images/background.png');
      game.load.image('objects1', 'assets/images/objects1.png');
      game.load.image('objects2', 'assets/images/objects2.png');
      game.load.image('ninja', 'assets/images/ninja.png');
    },
    create: function() {
      //Añadimos las imagenes en el juego.
      game.add.sprite(0,0, 'background');
      //Aqui crearemos un grupo de ninjas para reutilizar y no instanciar una nueva imagen, sería muy pesado para la ram.
      this.ninjaGroup = game.add.group();
      game.add.sprite(0,0, 'objects1');
      game.add.sprite(0,0, 'objects2');

      


      // ninja.inputEnabled = true;
      // ninja.input.pixelPerfectClick = true;
      // ninja.events.onInputDown.add(() => {
      //   console.log("CLICKS");
      // }, this);

    },
    update: function() {

    }
}

var game = new Phaser.Game(1012, 612, Phaser.AUTO);
    
game.state.add("gameplay", GamePlayManager);
game.state.start("gameplay");