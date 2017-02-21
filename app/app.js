var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var kaTan;
(function (kaTan) {
    var LoadingState = (function (_super) {
        __extends(LoadingState, _super);
        function LoadingState() {
            _super.apply(this, arguments);
        }
        LoadingState.prototype.init = function () {
            kaTanGame.stage.backgroundColor = "#356b92";
            //kaTanGame.kineticScrolling = kaTanGame.plugins.add((<any>Phaser.Plugin).KineticScrolling);//TODO usefully code to disable typescript
        };
        LoadingState.prototype.create = function () {
            //Add states
            kaTanGame.state.add("MenuState", kaTan.MenuState, true);
            kaTanGame.state.add("BoardState", kaTan.BoardState);
            //Scale screen
            this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        };
        LoadingState.prototype.preload = function () {
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
            this.load.image("showIcon", "app/resources/sprites/contrast.png");
            //Spritesheets
            //this.load.atlasXML("HERO_WALKING", "Graphics/Hero_Walking.png", "Graphics/Hero_Walking.xml");
            //this.load.atlasXML("HERO_IDLE", "Graphics/Hero_Idle.png", "Graphics/Hero_Idle.xml");
            // Audio
            //this.load.audio("TitleSong", ["Sounds/TitleSong.mp3", "Sounds/TitleSong.ogg", "Sounds/TitleSong.wav"]);
        };
        return LoadingState;
    })(Phaser.State);
    kaTan.LoadingState = LoadingState;
    var Game = (function (_super) {
        __extends(Game, _super);
        function Game() {
            _super.call(this, 1280, 720, Phaser.AUTO, "content", new LoadingState());
        }
        return Game;
    })(Phaser.Game);
    kaTan.Game = Game;
})(kaTan || (kaTan = {}));
var kaTanGame;
window.onload = function () {
    kaTanGame = new kaTan.Game();
};
