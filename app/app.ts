module kaTan {
    export class LoadingState extends Phaser.State {
        public create() {
            kaTanGame.state.add("TitleScreenState", kaTan.MenuState, true);
            //this.state.add("GamePlayState", kaTan.GamePlayState, false);
            //this.state.add("GameOverState", kaTan.GameOverState, false);

            this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        }

        public init(){
            kaTanGame.stage.backgroundColor = "#356b92";
        }

        public preload() {
            // Graphics
                //this.load.image("title", "Graphics/TitleScreen.png");
                //this.load.image("scene", "Graphics/scene720p.png");
                //this.load.image("gameover", "Graphics/GameOver.png");

            //Spritesheets
                //this.load.atlasXML("HERO_WALKING", "Graphics/Hero_Walking.png", "Graphics/Hero_Walking.xml");
                //this.load.atlasXML("HERO_IDLE", "Graphics/Hero_Idle.png", "Graphics/Hero_Idle.xml");

            // Audio
                //this.load.audio("TitleSong", ["Sounds/TitleSong.mp3", "Sounds/TitleSong.ogg", "Sounds/TitleSong.wav"]);
        }

    }

    export class Game extends Phaser.Game{
        constructor() {
            super(1280, 720, Phaser.AUTO, "content",new LoadingState());
        }
    }
}

var kaTanGame:Phaser.Game;

window.onload = () => {
    kaTanGame = new kaTan.Game();
};
