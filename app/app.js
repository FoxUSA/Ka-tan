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
            return _super !== null && _super.apply(this, arguments) || this;
        }
        LoadingState.prototype.init = function () {
            kaTanGame.stage.backgroundColor = "#356b92";
            if (kaTan.Config.debug)
                this.game.time.advancedTiming = true;
        };
        LoadingState.prototype.create = function () {
            kaTanGame.state.add("MenuState", kaTan.MenuState, true);
            kaTanGame.state.add("BoardState", kaTan.BoardState);
            this.scale.scaleMode = Phaser.ScaleManager.RESIZE;
            this.scale.minWidth = 1000;
            this.scale.fullScreenScaleMode = Phaser.ScaleManager.RESIZE;
        };
        LoadingState.prototype.preload = function () {
            this.load.image("flag", "app/resources/sprites/flag.png");
            this.load.image("rockTile", "app/resources/sprites/tiles/grass_14.png");
            this.load.image("woodsTile", "app/resources/sprites/tiles/grass_12.png");
            this.load.image("desertTile", "app/resources/sprites/tiles/sand_15.png");
            this.load.image("wheatTile", "app/resources/sprites/tiles/medieval_windmill.png");
            this.load.image("sheepTile", "app/resources/sprites/tiles/grass_05.png");
            this.load.image("brickTile", "app/resources/sprites/tiles/mars_19.png");
            this.load.image("dock", "app/resources/sprites/tiles/dock.png");
            for (var i = 0; i < 4; i++) {
                this.load.image("city" + i, "app/resources/sprites/pieces/city" + i + ".png");
                this.load.image("town" + i, "app/resources/sprites/pieces/tower" + i + ".png");
                this.load.image("road" + i, "app/resources/sprites/pieces/road" + i + ".png");
            }
            this.load.image("robber", "app/resources/sprites/pieces/robber.png");
            for (var i = 0; i < 6; i++)
                this.load.image("boat" + i, "app/resources/sprites/boats/ship" + i + ".png");
            this.load.image("showIcon", "app/resources/sprites/contrast.png");
        };
        return LoadingState;
    }(Phaser.State));
    kaTan.LoadingState = LoadingState;
    var Game = (function (_super) {
        __extends(Game, _super);
        function Game() {
            return _super.call(this, "100", "100", Phaser.AUTO, "content", new LoadingState()) || this;
        }
        return Game;
    }(Phaser.Game));
    kaTan.Game = Game;
})(kaTan || (kaTan = {}));
var kaTanGame;
window.onload = function () {
    kaTanGame = new kaTan.Game();
};
