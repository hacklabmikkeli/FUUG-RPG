class BootScene extends Phaser.Scene {
    constructor() {
        super('Boot');
    }


    preload() {
        this.load.spritesheet('player', 'assets/images/player.png', { frameWidth: 16, frameHeight: 16 });
        this.load.spritesheet('items', 'assets/images/basictiles.png', { frameWidth: 16, frameHeight: 16 });
        this.load.spritesheet('sword', 'assets/images/sword.png', { frameWidth: 42, frameHeight: 42 });
        this.load.spritesheet('coins', 'assets/images/tileset.png', { frameWidth: 32, frameHeight: 32 });
        this.loadTileMap();
        this.load.image('background', 'assets/level/background-extruded.png');
        this.loadAudio();
    }

    create() {
          this.scene.start('Game');
    }
    loadTileMap() {
        this.load.tilemapTiledJSON('map', 'assets/level/large_level.json')
    }


    loadAudio() {
        this.load.audio('goldSound', ['assets/audio/Pickup.wav']);
    }
}
