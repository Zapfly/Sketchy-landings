import background from '../assets/background-castle.jpg'
// import menuButtons from '../assets/grey buttons.png'
import startButton from '../assets/start-button.png'
import continueButton from '../assets/continue-button.png'
import howToPlayButton from '../assets/how-to-play-button.png'
import instructionsButton from '../assets/instructions-button.png'
import loadButton from '../assets/load-game-button.png'
import newGameButton from '../assets/new-game-button.png'
import optionsButton from '../assets/options-button.png'
import settingsButton from '../assets/settings-button.png'
import game from '../index'
import MyGame from '../index'

class TitleScene extends Phaser.Scene{
    constructor() {
        super({key: 'TitleScene'});

    }
    preload() {
        this.load.image('background_image',);
        this.load.image('background-castle', background);
        this.load.image('start button', startButton)
        this.load.image('new game button', newGameButton)
        this.load.image('continue button', continueButton)
        this.load.image('load button', loadButton)
        this.load.image('how to play button', howToPlayButton)
        this.load.image('instructions button', instructionsButton)
        this.load.image('options button', optionsButton)
        this.load.image('settings button', settingsButton)



    }
    create() {
        this.cameras.main.fadeIn(500, 0, 0, 0)

      
        const background = this.add.image(300, 300, 'background-castle');
        let backgroundScaleFactor = 600/1080;
        background.scaleX = backgroundScaleFactor;
        background.scaleY = backgroundScaleFactor;
        

        let buttons = this.add.group();

        let startMenuButton = buttons.create(400, 0, 'start button').setInteractive();
        let continueMenuButton = buttons.create(400, 0, 'continue button').setInteractive();
        let howToPlayMenuButton = buttons.create(400, 0, 'how to play button').setInteractive();

        let mainMenu = [
            startMenuButton,
            continueMenuButton,
            howToPlayMenuButton
        ]
        let menuIncrement = 200
        
        mainMenu.forEach(element => {
            element.setY(menuIncrement)
            menuIncrement = menuIncrement + 50
        } )

        
        startMenuButton.on(`pointerdown`, () => { 
            game.scene.transition('MyGame', 2000)
        });
        continueMenuButton.on(`pointerdown`, () => console.log("hello from Start Menu"));        

        let wKey = this.input.keyboard.addKey('W')
        wKey.on('down', () => {
            console.log('hello from TitleScene')
        })

    }

    update() {
        
    }
}

export default TitleScene;