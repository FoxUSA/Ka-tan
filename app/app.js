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
        LoadingState.prototype.create = function () {
            kaTanGame.state.add("TitleScreenState", kaTan.MenuState, true);
            this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        };
        LoadingState.prototype.init = function () {
            kaTanGame.stage.backgroundColor = "#356b92";
            alert("Loading Init");
        };
        LoadingState.prototype.preload = function () {
        };
        return LoadingState;
    }(Phaser.State));
    kaTan.LoadingState = LoadingState;
    var Game = (function (_super) {
        __extends(Game, _super);
        function Game() {
            return _super.call(this, 1280, 720, Phaser.AUTO, "content") || this;
        }
        return Game;
    }(Phaser.Game));
    kaTan.Game = Game;
})(kaTan || (kaTan = {}));
var kaTanGame;
window.onload = function () {
    kaTanGame = new kaTan.Game();
};
