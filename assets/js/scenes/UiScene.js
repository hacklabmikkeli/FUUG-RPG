class UiScene extends Phaser.Scene {
    constructor() {
        super('Ui');
    }

    init() {
        this.gameScene = this.scene.get('Game');
    }

    create() {
        this.setupUiElements();
        this.setupEvents();
    }

    setupUiElements() {
        console.log("Create")
        console.log(this.gameScene.player)
        var player = this.gameScene.player
        this.scoreText = this.add.text(35, 8,   `Coins   : 0`, { fontSize: '16px', fill: '#fff' });
        this.levelText = this.add.text(35, 24,  `Level   : ${player.level}`, { fontSize: '16px', fill: '#fff' });
        this.xpAmount = this.add.text(35, 40,   `XP      : ${player.xp}`, { fontSize: '16px', fill: '#fff' });
        this.toNextLevel = this.add.text(35, 56,`NextLvl : ${player.nextLvl}`, { fontSize: '16px', fill: '#fff' });
        this.STR = this.add.text(35, 72,        `STR     : ${player.attackStr}`, { fontSize: '16px', fill: '#fff' });
        this.coinIcon = this.add.image(15, 20, 'coins', 994);
        this.coinIcon.setScale(0.8)
    }

    setupEvents() {
        this.gameScene.events.on('updateScore', (player) => {
            this.updateScore(player);
    })
}

    updateScore(player) {
        console.log("Update")
        console.log(player)
        var toNextLevel = player.nextLevel - player.xp
        this.scoreText.setText(   `Coins   : ${player.gold}`);
        this.levelText.setText(   `Level   : ${player.level}`);
        this.xpAmount.setText(    `XP      : ${player.xp}`);
        this.toNextLevel.setText( `NextLvl : ${toNextLevel}`);
        this.STR.setText(         `STR     : ${player.attackStr}`);
    }
}