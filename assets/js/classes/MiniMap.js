class MiniMap {
    constructor(scene, key, tileSetName, bcName, blockedLayerName, x, y, playerX, playerY) {
        this.scene = scene;
        this.key = key;
        this.tileSetName = tileSetName;
        this.bcName = bcName;
        this.blockedLayer = blockedLayerName;
        this.x = x;
        this.y = y;
        this.playerX = playerX;
        this.playerY = playerY;
        this.createMap()
    }


    createMap() {
        this.map = this.scene.make.tilemap({key: this.key});
        this.tiles = this.map.addTilesetImage(this.bcName, this.bcName, 32, 32, 1, 2);
        this.backgroundLayer = this.map.createStaticLayer(this.bcName, this.tiles, 0, 0);
        this.backgroundLayer.setScale(0.5);

        this.blockedLayer = this.map.createStaticLayer(this.blockedLayer, this.tiles, 0, 0);
        this.blockedLayer.setScale(0.5);
        this.blockedLayer.setCollisionByExclusion([-1]);

        this.scene.cameras.main.setBounds(0,0, this.playerX, this.playerY)
        this.scene.cameras.main.scrollX = this.x;
        this.scene.cameras.main.scrollY = this.y;
        this.player = this.scene.add.image(this.playerX, this.playerY, 'player', 4);
        this.player.setScale(1);
        
        
        this.scene.cameras.main.zoom = 1
    }
}