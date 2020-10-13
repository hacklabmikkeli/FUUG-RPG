const Direction = {
    RIGTH: 'RIGHT',
    LEFT: 'LEFT',
    UP: 'UP',
    DOWN: 'DOWN',

}


class PlayerContainer extends Phaser.GameObjects.Container {
    constructor(scene, x, y, key, frame, health, maxHealth, id, level, xp, attackStr) {
        super(scene, x, y);

        this.setUpAnims()
        this.setSize(16, 16);
        this.scene = scene;
        this.velocity = 160;
        this.currentDirection = Direction.RIGTH;
        this.playerAttacking = false;
        this.swordHit = false;
        this.health = health;
        this.maxHealth = maxHealth;
        this.id = id;
        this.level = level;
        this.nextLvl = 100;

        this.scene.physics.world.enable(this);
        this.body.setCollideWorldBounds(true);

        this.scene.add.existing(this);
        this.scene.cameras.main.startFollow(this);

        this.player = new Player(this.scene, 0, 0, key, frame);
        this.add(this.player);

        this.weapon = this.scene.add.image(1, 25, 'sword');
        this.weapon.setAngle(-135)
        this.scene.add.existing(this.weapon);
        this.weapon.setScale(0.5);
        this.scene.physics.world.enable(this.weapon);
        this.weapon.body.ignoreGravity = true;
        this.add(this.weapon);
        this.weapon.alpha = 0;
        this.miniMapActive = false;
        this.attackStr = attackStr;
        this.xp = xp;     
    }


    update(cursors, keys) {

        this.body.setVelocity(0);
        if (Phaser.Input.Keyboard.JustDown(keys.M)) {
            if (!this.miniMapActive) {
                this.scene.cameras.cameras[1].visible = true;
                this.miniMapActive = true;
            } else {
                this.scene.cameras.cameras[1].visible = false;
                this.miniMapActive = false;
            }
        }
        if (cursors.left.isDown || keys.A.isDown) {
            if (!this.player.anims.getCurrentKey() === 'left') this.player.anims.stop()
            if (!this.player.anims.isPlaying) this.player.anims.play('left')
            this.body.setVelocityX(-this.velocity);
            this.currentDirection = Direction.LEFT;
            this.weapon.setPosition(-17, 1)

        } else if (cursors.right.isDown || keys.D.isDown) {
            if (!this.player.anims.getCurrentKey() === 'right') this.player.anims.stop()
            if (!this.player.anims.isPlaying) this.player.anims.play('right')
            this.body.setVelocityX(this.velocity);
            this.currentDirection = Direction.RIGTH;
            this.weapon.setPosition(17, 1)
        }

        if (cursors.up.isDown || keys.W.isDown) {
            if (!this.player.anims.getCurrentKey() === 'down') this.player.anims.stop()
            if (!this.player.anims.isPlaying) this.player.anims.play('up')
            this.body.setVelocityY(-this.velocity);
            this.currentDirection = Direction.UP;
            this.weapon.setPosition(-1, -30)

        } else if (cursors.down.isDown || keys.S.isDown) {
            if (!this.player.anims.getCurrentKey() === 'up') this.player.anims.stop()
            if (!this.player.anims.isPlaying) this.player.anims.play('down')
            this.body.setVelocityY(this.velocity);
            this.currentDirection = Direction.DOWN;
            this.weapon.setPosition(1, 30)
        }

        if (Phaser.Input.Keyboard.JustDown(cursors.space) && !this.playerAttacking) {
            this.weapon.alpha = 1;
            this.playerAttacking = true;
            this.scene.time.delayedCall(150, () => {
                this.weapon.alpha = 0;
                this.playerAttacking = false;
                this.swordHit = false;
            }, [], this)
            this.weapon.angle +=10
        }
        if (this.playerAttacking) {
            if (this.currentDirection === Direction.DOWN) {
                this.weapon.setAngle(-135)
            } else if (this.currentDirection === Direction.UP) {
                this.weapon.setAngle(45)
            } else if (this.currentDirection === Direction.LEFT) {
                this.weapon.setAngle(-45)
            } else if (this.currentDirection === Direction.RIGTH) {
                this.weapon.setAngle(135)
            }
            
        }
        this.scene.cameras.cameras[1].scrollX = this.player.body.x
        this.scene.cameras.cameras[1].scrollY = this.player.body.y
    }

    setUpAnims() {
        this.scene.anims.create({
            key: 'left',
            frames: this.scene.anims.generateFrameNumbers('player', { frames: [15, 16, 17, 16] }),
            frameRate: 20,
            repeat: 0
        })
        this.scene.anims.create({
            key: 'right',
            frames: this.scene.anims.generateFrameNumbers('player', { frames: [27, 28, 29, 28] }),
            frameRate: 20,
            repeat: 0
        })
        this.scene.anims.create({
            key: 'up',
            frames: this.scene.anims.generateFrameNumbers('player', { frames: [39, 40, 41, 40] }),
            frameRate: 20,
            repeat: 0
        })

        this.scene.anims.create({
            key: 'down',
            frames: this.scene.anims.generateFrameNumbers('player', { frames: [3, 4, 5, 4] }),
            frameRate: 20,
            repeat: 0
        })
    }

}
