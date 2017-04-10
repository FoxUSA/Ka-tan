var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var kaTan;
(function (kaTan) {
    var MenuState = (function (_super) {
        __extends(MenuState, _super);
        function MenuState() {
            _super.apply(this, arguments);
        }
        //TODO Connecting text
        /**
         * Gethostname and load into game
         */
        MenuState.prototype.promptForHostname = function () {
            var _this = this;
            alertify.defaultValue("http://" + window.location.hostname + ":3000").prompt("Enter the server address. The person on the phone probably knows.", function (url, ev) {
                ev.preventDefault();
                alertify.confirm("Would you like to run in full screen?", function () {
                    _this.game.scale.startFullScreen(false);
                    _this.startGame(url);
                }, function () {
                    _this.startGame(url);
                });
            });
        };
        /**
         * Start game
         * @param  {string} url - socket url to connect with
         */
        MenuState.prototype.startGame = function (url) {
            var _this = this;
            this.game.socket = io(url);
            alertify.log("Connecting to " + url);
            this.game.socket.on("connect", function () {
                alertify.success("Connected to server");
                _this.game.state.start("BoardState");
            }, this.promptForHostname);
        };
        MenuState.prototype.init = function () {
            this.game.world.setBounds(0, 0, 2000, 1500);
            this.game.add.image(-128, -128, "flag").scale.setTo(.7, .7);
            alertify.parent(document.body);
            this.promptForHostname();
        };
        return MenuState;
    })(Phaser.State);
    kaTan.MenuState = MenuState;
})(kaTan || (kaTan = {}));
