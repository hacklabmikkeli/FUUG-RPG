class Spawner {
    constructor(config, spawnLocations, addObject, deleteObject) {
        this.id = config.id;
        this.spawnInterval = config.spawnInterval;
        this.limit = config.limit;
        this.objectType = config.objectType;
        this.playerLevel = config.playerLevel;

        this.spawnLocations = spawnLocations;
        this.objectsCreated = [];

        this.addObject = addObject;
        this.deleteObject = deleteObject;
        this.start();
    }

    start() {
        this.interval = setInterval(() => {
            if (this.objectsCreated.length < this.limit) {
                this.spawnObject();
            }
        }, this.spawnInterval)
    }

    spawnObject() {
        if (this.objectType === spawnerType.CHEST) {
            this.spawnChest();
        } else if (this.objectType === spawnerType.MONSTER) {
            this.spawnMonster();
        }
    }

    spawnMonster() {
        const location = this.pickRandomLocation();
        const monster = new MonsterModel(location[0],
            location[1],
            randomNumber(0, 100),
            this.id,
            5,
            randomNumber(20,100),
            randomNumber(1,5),
            randomNumber(1, 5),
            randomNumber(5, 100));

        this.objectsCreated.push(monster);
        this.addObject(monster.id, monster);
    }


    spawnChest() {
        const location = this.pickRandomLocation();
        const chest = new ChestModel(location[0], location[1], randomNumber(0, 100), this.id);
        this.objectsCreated.push(chest);
        this.addObject(chest.id, chest);
    }


    pickRandomLocation() {
        const location = this.spawnLocations[Math.floor(Math.random() * this.spawnLocations.length)];
        const invalidLocation = this.objectsCreated.some((obj) => {
            if (obj.x === location[0] && obj.y === location[1]) return true
            return false
        });

        if (invalidLocation) return this.pickRandomLocation();
        return location;
    }



    removeObject(id) {
        this.objectsCreated = this.objectsCreated.filter(obj => obj.id !== id);
        this.deleteObject(id);
    }
}