import game from '../index'
import WebFont from 'webfontloader';
import lander from '../assets/eyelander.png'
import platform from '../assets/platform.png'

let youDied = () => {
    console.log('you Died (callback function)')
}


class Level1 extends Phaser.Scene{
    constructor() {
        super({key: 'Level1'});

    }

    preload() {
        this.load.image('lander', lander)
        this.load.image('platform', platform)
        this.levelConfig = {
            startingX: 100,
            startingY: 400
        }

    }

    create() {

        this.cursors = this.input.keyboard.createCursorKeys();

        this.player = this.physics.add.sprite(this.levelConfig.startingX, this.levelConfig.startingY - 28, 'lander');
        let playerShip = this.player
        this.player.setOrigin(0.5, 0.5)
        this.player.setBounce(1, 0.5)
            .setCollideWorldBounds(true)
            .setMaxVelocity(300)
            .setVelocityY(100)


            
        this.platforms = this.physics.add.staticGroup()
        
        
        this.victoryPlatform = this.platforms.create(700, 400, 'platform')
        this.startingPlatform = this.platforms.create(this.levelConfig.startingX, this.levelConfig.startingY, 'platform')
        this.startingPlatform.setTint(0xff22ff)

        this.platformCollider = this.physics.add.collider(this.player, this.startingPlatform, function (player, platform) {
            if(playerShip.body.velocity.y > 100 || player.rotation < -2 || player.rotation > 2) {
                youDied()
            } else {
                playerShip.setVelocity(playerShip.body.velocity.x/2, playerShip.body.velocity.y)
            }

            if (player.rotation > -1.5 && player.rotation < 1.5) {
                player.rotation = player.rotation/2
            }
        })
        
        this.victoryCondition = this.physics.add.collider(this.player, this.victoryPlatform, null, function (player, platform) {
            if(playerShip.body.velocity.x > -0.5 && playerShip.body.velocity.y > -0.5 ) {
                playerShip.body.velocity.x = 0
                console.log("you win!")
                return playerShip.body.position.x = 30
            } else {
                playerShip.setVelocity(playerShip.body.velocity.x/2, playerShip.body.velocity.y)
            }

            if (player.rotation > -1.5 && player.rotation < 1.5) {
                player.rotation = player.rotation/2
            }
        })
        // this.platformCollider.body.setFriction(0.1, 0.3)

        // this.player.onCollide = true
        // this.physics.world.on('collide', (gameObject1, gameObject2, body1, body2) => {
        //         console.log('ouch')
        //         gameObject1.setAlpha(0.5);
        //         gameObject2.setAlpha(0.5);
        //     }
        // );

    }
    
    
    update() {
        
        const { left, right, up } = this.cursors;
        
        if (left.isDown)
        {
            this.player.setAngularVelocity(-150);
        }
        else if (right.isDown)
        {
            this.player.setAngularVelocity(150);
        }
        else
        {
            this.player.setAngularVelocity(0);
        }
        
        if (up.isDown)
        {
            this.physics.velocityFromAngle(this.player.body.rotation-90, 600, this.player.body.acceleration);
        }
        else
        {
            this.player.setAcceleration(0);
        }

        if  (this.player.lifeState == false) {
        }
        
        // this.physics.collide([this.player], [this.victoryPlatform], function () {
        //     console.log('ouch')
        // })
        
        

    }
}

export default Level1;