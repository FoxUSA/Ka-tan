namespace kaTan {
    export class LoadingState extends Phaser.State {
        public init(){
            kaTanGame.stage.backgroundColor = "#356b92";
            kaTanGame.kineticScrolling = kaTanGame.plugins.add((<any>Phaser.Plugin).KineticScrolling);
        }

        public create() {
            //Add states
                kaTanGame.state.add("MenuState", kaTan.MenuState, true);
                kaTanGame.state.add("BoardState", kaTan.BoardState);

            //Scale screen
                //this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL; TODO

            //Config scrolling
                kaTanGame.kineticScrolling.configure({
                    kineticMovement: true,
                    timeConstantScroll: 325,
                    horizontalScroll: true,
                    verticalScroll: true,
                    horizontalWheel: true,
                    verticalWheel: false,
                    deltaWheel: 40
                });
        }

        public preload() {
            // Graphics
                this.load.image("tile", "app/resources/sprites/grass_14.png");

            //Spritesheets
                //this.load.atlasXML("HERO_WALKING", "Graphics/Hero_Walking.png", "Graphics/Hero_Walking.xml");
                //this.load.atlasXML("HERO_IDLE", "Graphics/Hero_Idle.png", "Graphics/Hero_Idle.xml");

            // Audio
                //this.load.audio("TitleSong", ["Sounds/TitleSong.mp3", "Sounds/TitleSong.ogg", "Sounds/TitleSong.wav"]);
        }

    }

    export class Game extends Phaser.Game{
        kineticScrolling:any;
        constructor() {
            super(1280, 720, Phaser.AUTO, "content",new LoadingState());
        }
    }
}


var kaTanGame:kaTan.Game;
window.onload = () => {
    kaTanGame = new kaTan.Game();
};
