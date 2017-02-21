namespace kaTan {
    export class LoadingState extends Phaser.State {
        public init(){
            kaTanGame.stage.backgroundColor = "#356b92";
            //kaTanGame.kineticScrolling = kaTanGame.plugins.add((<any>Phaser.Plugin).KineticScrolling);//TODO usefully code to disable typescript
        }

        public create() {
            //Add states
                kaTanGame.state.add("MenuState", kaTan.MenuState, true);
                kaTanGame.state.add("BoardState", kaTan.BoardState);

            //Scale screen
                this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        }

        public preload() {
            //Graphics
                //Tiles
                    this.load.image("rockTile", "app/resources/sprites/tiles/grass_14.png");
                    this.load.image("woodsTile", "app/resources/sprites/tiles/grass_12.png");
                    this.load.image("desertTile", "app/resources/sprites/tiles/sand_15.png");
                    this.load.image("wheatTile", "app/resources/sprites/tiles/medieval_windmill.png");
                    this.load.image("sheepTile", "app/resources/sprites/tiles/grass_05.png");
                    this.load.image("brickTile", "app/resources/sprites/tiles/mars_19.png");

                //Pieces
                    this.load.image("city", "app/resources/sprites/pieces/castle_open.png");
                    this.load.image("town", "app/resources/sprites/pieces/tower.png");

                //Icons
                    this.load.image("diceIcon", "app/resources/sprites/multiplayer.png");

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
