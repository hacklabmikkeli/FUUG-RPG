class UiScene extends Phaser.Scene {
    constructor() {
        super('Ui');
    }

    init() {
        // grab a reference to the game scene
        this.gameScene = this.scene.get('Game');
    }

    create() {
        this.setupUiElements();
        this.setupEvents();
        
    }

    setupUiElements() {
        // create the score text game object
        this.scoreText = this.add.text(35, 8,   'Coins   : 0', { fontSize: '16px', fill: '#fff' });
        this.levelText = this.add.text(35, 24,  'Level   : 1', { fontSize: '16px', fill: '#fff' });
        this.xpAmount = this.add.text(35, 40,   'XP      : 0', { fontSize: '16px', fill: '#fff' });
        this.toNextLevel = this.add.text(35, 56,'NextLvl : 100', { fontSize: '16px', fill: '#fff' });
        // creaet coin icon
        this.coinIcon = this.add.image(15, 20, 'coins', 994);
        this.coinIcon.setScale(0.8)
    }

    setupEvents() {
        this.gameScene.events.on('updateScore', (player) => {
            var toNextLevel = player.nextLevel - player.xp
            this.scoreText.setText(   `Coins   : ${player.gold}`);
            this.levelText.setText(   `Level   : ${player.level}`);
            this.xpAmount.setText(    `XP      : ${player.xp}`);
            this.toNextLevel.setText( `NextLvl : ${toNextLevel}`);
        });
    }
}
