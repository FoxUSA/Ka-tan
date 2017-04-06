declare var alertify;
namespace kaTan {
    export class LoadingState extends Phaser.State {
        public init(){
            kaTanGame.stage.backgroundColor = "#356b92";
            if(Config.debug)
                this.game.time.advancedTiming=true;

        }

        public create() {
            //Add states
                kaTanGame.state.add("MenuState", kaTan.MenuState, true);
                kaTanGame.state.add("BoardState", kaTan.BoardState);

            //Scale screen
                this.scale.scaleMode = Phaser.ScaleManager.RESIZE;
                this.scale.minWidth = 1000;
                this.scale.fullScreenScaleMode = Phaser.ScaleManager.RESIZE;
        }

        public preload() {
            //Graphics
                this.load.image("flag", "app/resources/sprites/flag.png");

                //Tiles
                    this.load.image("rockTile", "app/resources/sprites/tiles/grass_14.png");
                    this.load.image("woodsTile", "app/resources/sprites/tiles/grass_12.png");
                    this.load.image("desertTile", "app/resources/sprites/tiles/sand_15.png");
                    this.load.image("wheatTile", "app/resources/sprites/tiles/medieval_windmill.png");
                    this.load.image("sheepTile", "app/resources/sprites/tiles/grass_05.png");
                    this.load.image("brickTile", "app/resources/sprites/tiles/mars_19.png");
                    this.load.image("dock", "app/resources/sprites/tiles/dock.png");

                //Pieces
                    for(let i = 0; i<4;i++){
                        this.load.image("city"+i, "app/resources/sprites/pieces/city"+i+".png");
                        this.load.image("town"+i, "app/resources/sprites/pieces/tower"+i+".png");
                        this.load.image("road"+i, "app/resources/sprites/pieces/road"+i+".png");
                    }
                    this.load.image("robber", "app/resources/sprites/pieces/robber.png");

                    for(let i = 0; i<6;i++)
                        this.load.image("boat"+i, "app/resources/sprites/boats/ship"+i+".png");

                //Icons
                    this.load.image("showIcon", "app/resources/sprites/contrast.png");

            //Spritesheets
                //this.load.atlasXML("HERO_WALKING", "Graphics/Hero_Walking.png", "Graphics/Hero_Walking.xml");
                //this.load.atlasXML("HERO_IDLE", "Graphics/Hero_Idle.png", "Graphics/Hero_Idle.xml");

            // Audio
                //this.load.audio("TitleSong", ["Sounds/TitleSong.mp3", "Sounds/TitleSong.ogg", "Sounds/TitleSong.wav"]);
        }

    }

    export class Game extends Phaser.Game{
        kineticScrolling:any;
        //SocketIO
            public socket:any;

        constructor() {
            super("100", "100", Phaser.AUTO, "content",new LoadingState());
        }
    }
}


var kaTanGame:kaTan.Game;
window.onload = function() {
    kaTanGame = new kaTan.Game();
};
