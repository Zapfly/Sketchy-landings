import game from '../index'
import WebFont from 'webfontloader';
import lander from '../assets/eyelander.png'

class Level1 extends Phaser.Scene{
    constructor() {
        super({key: 'Level1'});

    }

    preload() {
        this.load.image('lander', lander)

    }

    create() {

        this.cursors = this.input.keyboard.createCursorKeys();

        this.player = this.physics.add.sprite(400, 300, 'lander');
        this.player.setOrigin(0.5, 0.5)
        this.player.setBounce(1, 0.5)
            .setCollideWorldBounds(true)
            .setMaxVelocity(300);
            
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



    }
}

export default Level1;