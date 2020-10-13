class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, key, frame) {

        
        super(scene, x, y, key, frame);

        this.scene = scene;
        this.scene.physics.world.enable(this);

        this.setImmovable(true);
        this.setScale(2);

        this.scene.add.existing(this);
    }
    
}
