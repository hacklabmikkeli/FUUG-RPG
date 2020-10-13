class PlayerModel {
    constructor(spawnLocations) {
        this.health = 100;
        this.maxHealth = 100;
        this.gold = 0;
        this.level = 1;
        this.id = `player-${uuid.v4()}`;
        this.spawnLocations = spawnLocations
        this.xp = 0;
        this.nextLevel = 100;
        const location = this.spawnLocations[Math.floor(Math.random() * this.spawnLocations.length)];
        [this.x, this.y] = location;
        this.attackStr = this.level + randomNumber(1,5)
        
    }

    updateGold(gold) {
        this.gold += gold;
        console.log('Gold: ' + this.gold)
    }

    updateLevel(xpDropped) {
        this.xp += xpDropped;
        if (this.xp > this.nextLevel) {
            this.xp -= this.nextLevel;
            this.level++;
            this.nextLevel +=100;
            this.attackStr += randomNumber(0, this.level)
        }
    }
    
}