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
            kaTanGame.kineticScrolling = kaTanGame.plugins.add(Phaser.Plugin.KineticScrolling);
        };
        LoadingState.prototype.create = function () {
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
        };
        LoadingState.prototype.preload = function () {
            // Graphics
            this.load.image("tile", "app/resources/sprites/grass_14.png");
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
