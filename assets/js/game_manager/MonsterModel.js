class MonsterModel {
    constructor(x, y, gold, spawnerId, frame, health, attack, level, xpDropped) {
        this.id = `${spawnerId}-${uuid.v4()}`;
        this.spawnerId = spawnerId;
        this.x = x;
        this.y = y;
        this.gold = gold;
        this.frame = frame;
        this.health = health;
        this.maxHealth = health;
        this.attack = attack;
        this.level = level;
        this.xpDropped = xpDropped;
    }

    loseHealth(attackStr) {
        this.health -= attackStr; 
    }

}