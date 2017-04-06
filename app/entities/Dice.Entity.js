var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var kaTan;
(function (kaTan) {
    var DiceEntity = (function (_super) {
        __extends(DiceEntity, _super);
        function DiceEntity(game) {
            var _this = this;
            _super.call(this, game, 32, 30, "Roll:", kaTan.Config.defaultTextStyle());
            this.game = game;
            this.fixedToCamera = true;
            this.inputEnabled = true;
            this.events.onInputDown.add(this.roll, this);
            this.game.socket.on("roll", function (data) {
                _this.text = "Roll:" + data;
                _this.addColor("red", 0);
                //this.newColor("red");
                setTimeout(function () {
                    _this.addColor("white", 0);
                }, 1500);
            });
        }
        /**
         * Roll the dice
         */
        DiceEntity.prototype.roll = function () {
            this.game.socket.emit("roll");
        };
        return DiceEntity;
    })(Phaser.Text);
    kaTan.DiceEntity = DiceEntity;
})(kaTan || (kaTan = {}));
