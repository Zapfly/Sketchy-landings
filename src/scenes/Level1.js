import game from '../index'
import WebFont from 'webfontloader';
import lander from '../assets/eyelander.png'
import platform from '../assets/platform.png'
import tiles from '../assets/tiles.png'
import tilemap from '../assets/level1/sketchyLanderLevel-1.json'
import newGameButton from '../assets/new-game-button.png'


let youDied = (deadPlayer, message, retryButton) => {
    console.log('you Died (callback function)')

    // deadPlayer.visible = false
    deadPlayer.data = {alive: false}
    deadPlayer.setVelocityY(0)
    deadPlayer.setVelocityX(0)
    deadPlayer.body.position.y = deadPlayer.body.position.y - 5
    // deadPlayer.body.setImmovable(true)
    message.visible = true
    retryButton.visible = true

    message.x = deadPlayer.body.position.x
    message.y = deadPlayer.body.position.y - 30
    retryButton.x = 400
    retryButton.y = 300


    return deadPlayer.data.alive

}


class Level1 extends Phaser.Scene{
    constructor() {
        super({key: 'Level1'});

    }

    preload() {

        this.load.on('complete', function () {
            console.log("Level 1 has loaded")
        });

        this.load.image('lander', lander)
        this.load.image('platform', platform)
        this.levelConfig = {
            startingX: 150,
            startingY: 400,
            winState: false
        }
        this.load.image('new game button', newGameButton)


    }

    create() {
        let levelConfig = this.levelConfig

        this.cursors = this.input.keyboard.createCursorKeys();


        this.player = this.physics.add.sprite(this.levelConfig.startingX, this.levelConfig.startingY - 28, 'lander');
        let playerShip = this.player
        playerShip.data = {alive: true}
        this.player.setOrigin(0.5, 0.5)
        this.player.setBounce(1, 0.5)
            .setCollideWorldBounds(true)
            .setMaxVelocity(300)
            .setVelocityY(100)


        let deathMessage = this.deathMessage
        let victoryMessage = this.victoryMessage

            
        let webFontConfig = {
            google: {
                families: ['Montserrat:ExtraBold']
            },
            active: () => {
                let instruction1 = this.add.text(this.levelConfig.startingX, this.levelConfig.startingY - 100, 'Use the "UP" arrow key', { fontFamily: 'Montserrat', fontSize: 16 });
                let instruction2 = this.add.text(this.levelConfig.startingX, this.levelConfig.startingY - 80, 'to fly', { fontFamily: 'Montserrat', fontSize: 16 });
                let instruction3 = this.add.text(this.levelConfig.startingX, this.levelConfig.startingY + 30, 'Steer using', { fontFamily: 'Montserrat', fontSize: 16 });
                let instruction4 = this.add.text(this.levelConfig.startingX, this.levelConfig.startingY + 50, '"LEFT" and "RIGHT"', { fontFamily: 'Montserrat', fontSize: 16 });
                deathMessage = this.add.text(this.levelConfig.startingX, this.levelConfig.startingY + 50, "Sorry Dude, you 'sploded", { fontFamily: 'Montserrat', fontSize: 16 });
                victoryMessage = this.add.text(this.levelConfig.startingX, this.levelConfig.startingY + 50, "Congradulations! You Win!", { fontFamily: 'Montserrat', fontSize: 16 });
                instruction1.setOrigin(0.5, 0.5)
                instruction2.setOrigin(0.5, 0.5)
                instruction3.setOrigin(0.5, 0.5)
                instruction4.setOrigin(0.5, 0.5)
                deathMessage.visible = false
                deathMessage.setOrigin(0.5, 0.5)
                victoryMessage.visible = false
                victoryMessage.setOrigin(0.5, 0.5)
            }
        };


            
            // Load the custom font using the WebFontLoader
            WebFont.load(webFontConfig);
            
        this.platforms = this.physics.add.staticGroup()
        
        
        this.victoryPlatform = this.platforms.create(650, 400, 'platform')
        this.victoryPlatform.setOrigin(0.5, 0.5)
        this.startingPlatform = this.platforms.create(this.levelConfig.startingX, this.levelConfig.startingY, 'platform')
        this.startingPlatform.setTint(0xff22ff)
        this.startingPlatform.setOrigin(0.5, 0.5)

        this.tryAgainButton = this.add.sprite(400, 0, 'new game button').setInteractive();
        let tryAgainButton = this.tryAgainButton
        tryAgainButton.setOrigin(0.5, 0.5);
        tryAgainButton.visible = false;

        
        
        tryAgainButton.on(`pointerdown`, () => {
            console.log(JSON.stringify(playerShip))
            playerShip.x = levelConfig.startingX;            
            playerShip.y = levelConfig.startingY- 28;
            playerShip.setVelocityX(0);
            playerShip.setVelocityY(0);
            levelConfig = {
                startingX: 150,
                startingY: 400,
                winState: false                
            }
            playerShip.data.alive = true;
            tryAgainButton.visible = false
            deathMessage.visible = false
            playerShip.rotation = 0
            
        });


        let deathChecker = (player) =>{
            if(levelConfig.winState) return levelConfig.winState
            if(player.data.alive == true) {
                if(player.body.velocity.y > 100 || player.body.velocity.x > 100 || player.rotation < -2 || player.rotation > 2) {
                    return youDied(player, deathMessage, tryAgainButton)
                } else if (player.rotation > -1.5 && player.rotation < 1.5) {
                    player.rotation = player.rotation/2
                    player.setVelocity(player.body.velocity.x/2, player.body.velocity.y)
                    return player.data.alive
                }
    
            }
        }
        
        let youWin = (player, message) => {
                player.body.velocity.x = 0
                player.body.velocity.y = 0
                // player.body.position.x = levelConfig.startingX
                // player.body.position.y = levelConfig.startingY - 40
                
                message.visible = true
                message.x = player.body.position.x
                message.y = player.body.position.y - 30
                
                levelConfig.winState = true
                return levelConfig.winState
        }

        let winChecker = (player, message) => {

            if(player.body.velocity.x > -0.5 && player.body.velocity.y > -0.5 && levelConfig.winState == false && player.data.alive) {
                youWin(player, message)
            }
            return levelConfig.winState            
        }

        this.platformCollider = this.physics.add.collider(this.player, this.startingPlatform, function (player, platform) {
            deathChecker(player)
        })
        
        this.victoryCondition = this.physics.add.collider(this.player, this.victoryPlatform, null, function (player, platform) {
            if (!deathChecker(player)) {
                deathChecker(player)
            } else {
                winChecker(player, victoryMessage)
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