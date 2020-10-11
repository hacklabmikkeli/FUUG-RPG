var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    scene: [
        BootScene,
        TitleScene,
        GameScene,
        UiScene,
    ],
    physics: {
        default: 'arcade',
        arcade: {
            debug: true,
        },
    },
    pixelArt: true,
    roundPixels: true,
};


var game = new Phaser.Game(config);



