import Phaser from 'phaser';
import logoImg from './assets/logo.png';
import background from './assets/background-castle.jpg'
import TitleScene from './scenes/TitleScene'
import WebFont from 'webfontloader';


// function loadFont(name, url) {
//     var newFont = new FontFace(name, `url(${url})`);
//     newFont.load().then(function (loaded) {
//         document.fonts.add(loaded);
//     }).catch(function (error) {
//         return error;
//     });
// }

class MyGame extends Phaser.Scene
{
    constructor ()
    {
        super({key: 'MyGame'});
    }

    preload() {
        this.load.image('logo', logoImg);
        this.load.image('background', background);


        // Configure the WebFontLoader
        let webFontConfig = {
          google: {
            families: ['Montserrat:ExtraBold']
          },
          active: () => {
              let creditStatement = this.add.text(400, 100, 'POWERED BY', { fontFamily: 'Montserrat', fontSize: 32 });
              creditStatement.setOrigin(0.5, 0.5)
            // Create your text object here
        }
    };

        // Load the custom font using the WebFontLoader
        WebFont.load(webFontConfig);
    }

    create ()
    {
        // const background = this.add.image(300, 300, 'background')
        // let backgroundScaleFactor = 600/1080;
        // background.scaleX = backgroundScaleFactor;
        // background.scaleY = backgroundScaleFactor;



        const logo = this.add.image(400, 300, 'logo');

        this.tweens.add({
            targets: logo,
            y: 450,
            duration: 1000,
            ease: "Power2",
            yoyo: true,
            loop: 0
        });

        console.log("Game scene has loaded")

        // let menuButton = this.add.dom(200, 200, 'div', 'background-color: green;')



        this.input.on('pointerup', () => {
            this.cameras.main.fadeOut(500, 0, 0, 0);
        });

        this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
            this.scene.start('TitleScene', {fadeIn: true})
            // this.time.delayedCall(500, () => {
            // })
        })
    }
    update() {


    }

}


const config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 800,
    height: 600,
    dom: {
        createContainer: true
    },
    scene: [MyGame, TitleScene]
};

const game = new Phaser.Game(config);
// game.scene.add('MyGame', MyGame);
game.scene.start('MyGame')

// game.scene.add('TitleScene', TitleScene);
// game.scene.start('TitleScene')

export default game