class GameScene extends Phaser.Scene {
    constructor() {
        super('Game');

    }


    preload() {

    }
    init() {
        this.scene.launch('Ui');
        console.log(this.scene)
    }

    create() {

        this.cursors = this.input.keyboard.createCursorKeys();
        this.keys = this.input.keyboard.addKeys('W,S,A,D,M');
        this.createAudio();
        this.createGroups();
        this.createMap();
        this.createGameManager();
        this.createMiniMap();
    }

    createPlayer(playerObject) {

        this.player = new PlayerContainer(this,
            playerObject.x * 2,
            playerObject.y * 2, 
            'player',
             4,
             playerObject.health,
             playerObject.maxHealth,
             playerObject.id,
             1
             )
        this.player.setUpAnims();
    }

    update() {
        if (this.player) this.player.update(this.cursors, this.keys, this.player);
    }

    createMap() {
        this.map = new Map(this, 'map', 'background', 'background', 'blocked');
    }

    addCollision() {
        this.physics.add.collider(this.player, this.map.blockedLayer);
        this.physics.add.overlap(this.player, this.chests, this.collectChest, null, this);
        this.physics.add.collider(this.monsters, this.map.blockedLayer);

        this.physics.add.overlap(this.player.weapon, this.monsters, this.enemyOverlap, null, this);
    }


    enemyOverlap(player, monster) {
        if(this.player.playerAttacking && !this.player.swordHit) {
            this.swordHit = true;
            //monster.makeInactive();
            this.events.emit('attackMonster', monster.id, this.player.id);
        }
    }


    killMonster(player, monster) {
        monster.makeInactive();
        this.events.emit('killMonster', monster.id);
    }

    createGameManager() {
        this.events.on('spawnPlayer', (playerObject) => {
            this.createPlayer(playerObject);
            this.addCollision();
        })

        this.events.on('chestSpawned', (chest) => {
            this.spawnChest(chest);
        })

        this.events.on('monsterSpawned', (monster) => {
            this.spawnMonster(monster);
        })

        this.events.on('monsterKilled', (monsterId) => {
            this.monsters.getChildren().forEach((monster) => {
                if(monster.id === monsterId) {
                    monster.makeInactive();
                }
            })
        })

        this.events.on('updateMonsterHealth', (monsterId, health) => {
            this.monsters.getChildren().forEach((monster) => {
                if(monster.id === monsterId) {
                    monster.updateHealth(health);
                }
            })
        })

        this.events.on('attackIndicator', (attackStr, monsterId) => {
            this.monsters.getChildren().forEach((monster) => {
                if(monster.id === monsterId) {
                    monster.showIndicator(attackStr);
                }
            })
        })

        this.events.on('updateScore', (playerId) => {

        })


        this.gameManager = new GameManager(this, this.map.map.objects);
        this.gameManager.setup();
    }

    spawnChest(chestObject) {
        let chest = this.chests.getFirstDead();
        if (!chest) {
            chest = new Chest(this, chestObject.x * 2, chestObject.y * 2, 'items', 36, chestObject.gold, chestObject.id);
            this.chests.add(chest);
        } else {
            chest.coins = chestObject.gold;
            chest.id = chestObject.id;
            chest.setPosition(chestObject.x * 2, chestObject.y * 2);
            chest.makeActive();
        }
    }

    spawnMonster(monsterObject) {
        let monster = this.monsters.getFirstDead();
        if (!monster) {
            monster = new Monster(
                this, 
                monsterObject.x * 2,
                monsterObject.y * 2,
                'player',
                48,
                36,
                monsterObject.id,
                monsterObject.health, 
                monsterObject.maxHealth,
                randomNumber(1, this.player.level + 5),
                randomNumber(1, this.player.level * 5),
                );
            this.monsters.add(monster);
        } else {
            monster.id = monsterObject.id;
            monster.health = monsterObject.health;
            monster.maxHealth = monsterObject.maxHealth;
            monster.setPosition(monsterObject.x * 2, monsterObject.y * 2);
            monster.makeActive();
        }
    }

    createGroups() {

        this.chests = this.physics.add.group();
        this.monsters = this.physics.add.group();

    }

    collectChest(player, chest) {
        this.goldPickupAudio.play();
        chest.makeInactive();
        this.events.emit('pickupChest', chest.id, player.id);
    }

    createAudio() {
        this.goldPickupAudio = this.sound.add('goldSound', { loop: false, volume: 0.3 });
    }

    createMiniMap() {
        this.minimap = this.cameras.add(10, 10, 300, 300).setZoom(0.2).setName('mini');
        this.minimap.setBackgroundColor(0x002244);
        this.minimap.scrollX = 1600;
        this.minimap.scrollY = 300;
        this.minimap.visible = false;
        this.cameras.cameras[1].setBounds(0,0, this.map.widthInPixels, this.map.heightInPixels)
    }

}