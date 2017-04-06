var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var kaTan;
(function (kaTan) {
    var DockEntity = (function (_super) {
        __extends(DockEntity, _super);
        /**
         * Creates a dock entity
         * @param  {Phaser.Game} game [description]
         * @param  {number}      x    [description]
         * @param  {number}      y    [description]
         * @param  {number}      angle         [description]
         * @param  {string}      type [description]
         */
        function DockEntity(game, x, y, angle, type) {
            if (angle === void 0) { angle = 0; }
            _super.call(this, game, x, y, "dock", 0);
            this.anchor.setTo(.5, .5);
            this.angle = angle;
            this.width = 70;
            this.height = 70;
            var textStyle = kaTan.Config.defaultTextStyle();
            textStyle.fontSize = 15;
            var text = new Phaser.Text(this.game, x, y, type == "Any" ? "3:1" : "2:1", textStyle);
            var text2 = new Phaser.Text(this.game, x, y + 15, type, textStyle);
            text.anchor.setTo(.5, .5);
            text2.anchor.setTo(.5, .5);
            this.game.add.existing(text);
            this.game.add.existing(text2);
        }
        return DockEntity;
    })(Phaser.Image);
    kaTan.DockEntity = DockEntity;
})(kaTan || (kaTan = {}));
