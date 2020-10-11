class GameManager {
    constructor(scene, mapData,) {
        this.mapData = mapData;
        this.scene = scene;

        this.spawners = {};
        this.chests = {};
        this.monsters = {};

        this.playerLocations = [];
        this.chestLocations = {};
        this.monsterLocations = {};
        this.players = {};

    }


    setup() {
        this.parseMapData();
        this.setupEventListeners();
        this.setupSpawners();
        this.spawnPlayer();
    }

    spawnPlayer() {
        const player = new PlayerModel(this.playerLocations);
        this.players[player.id] = player;
        this.scene.events.emit('spawnPlayer', player);
    }

    setupSpawners() {

        let spawner;
        Object.keys(this.chestLocations).forEach((key) => {
            const config = {
                spawnInterval: 3000,
                limit: 3,
                objectType: spawnerType.CHEST,
                id: `chest-${key}`,
            }
            spawner = new Spawner(config,
                this.chestLocations[key],
                this.addChest.bind(this),
                this.deleteChest.bind(this));
            this.spawners[spawner.id] = spawner;
        });

        Object.keys(this.monsterLocations).forEach((key) => {
            const config = {
                spawnInterval: 3000,
                limit: 3,
                objectType: spawnerType.MONSTER,
                id: `monster-${key}`,
            }
            spawner = new Spawner(config,
                this.monsterLocations[key],
                this.addMonster.bind(this),
                this.deleteMonster.bind(this));
            this.spawners[spawner.id] = spawner;
        });
    }

    addChest(chestId, chest) {
        this.chests[chestId] = chest;
        this.scene.events.emit('chestSpawned', chest)
    }

    deleteChest(chestId) {
        delete this.chests[chestId];
    }

    addMonster(monsterId, monster) {
        this.monsters[monsterId] = monster;
        this.scene.events.emit('monsterSpawned', monster)
    }

    deleteMonster(monsterId) {

    }

    setupEventListeners() {
        this.scene.events.on('pickupChest', (chestId, playerId) => {
            if (this.chests[chestId]) {
                const { gold } = this.chests[chestId];
                this.players[playerId].updateGold(gold);
                this.spawners[this.chests[chestId].spawnerId].removeObject(chestId);
                this.scene.events.emit('updateScore', this.players[playerId]);
            }
        })
        this.scene.events.on('attackMonster', (monsterId, playerId) => {
            if (this.monsters[monsterId]) {
                let attackStr = randomNumber(0, 5);
                this.monsters[monsterId].loseHealth(attackStr);
                this.scene.events.emit('attackIndicator', attackStr, monsterId);
                if (this.monsters[monsterId].health <= 0) {
                    const { gold } = this.monsters[monsterId];
                    this.players[playerId].updateGold(gold);
                    this.spawners[this.monsters[monsterId].spawnerId].removeObject(monsterId);
                    this.scene.events.emit('monsterKilled', monsterId);
                    this.players[playerId].updateLevel(this.monsters[monsterId].xpDropped);
                    this.scene.events.emit('updateScore', this.players[playerId]);
                    
                } else {
                    this.scene.events.emit('updateMonsterHealth', monsterId, this.monsters[monsterId].health);
                }
            }
        })
    }


    parseMapData() {
        this.mapData.forEach((layer) => {
            if (layer.name === 'player_locations') {
                layer.objects.forEach((obj) => {
                    this.playerLocations.push([obj.x, obj.y]);
                });
            } else if (layer.name === 'chest_locations') {
                layer.objects.forEach((obj) => {
                    var spawner = getTiledProperty(obj, 'spawner');
                    if (this.chestLocations[spawner]) {
                        this.chestLocations[spawner].push([obj.x, obj.y]);
                    } else {
                        this.chestLocations[spawner] = [[obj.x, obj.y]];
                    }
                });
            } else if (layer.name === 'monster_locations') {
                layer.objects.forEach((obj) => {
                    var spawner = getTiledProperty(obj, 'spawner');
                    if (this.monsterLocations[spawner]) {
                        this.monsterLocations[spawner].push([obj.x, obj.y]);
                    } else {
                        this.monsterLocations[spawner] = [[obj.x, obj.y]];
                    }
                });
            }
        });
    }
}