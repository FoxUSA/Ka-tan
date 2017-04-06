var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var kaTan;
(function (kaTan) {
    var TileEntity = (function (_super) {
        __extends(TileEntity, _super);
        function TileEntity(game, x, y, type, tileNumber) {
            if (tileNumber === void 0) { tileNumber = 0; }
            _super.call(this, game, x, y, type + "Tile", 0);
            //Tile Number
            if (tileNumber == 0)
                return;
            var textStyle = kaTan.Config.defaultTextStyle();
            if (tileNumber == 6 || tileNumber == 8)
                textStyle.fill = "#f44336";
            this.tileText = this.game.add.text(this.x + this.width / 2, this.y + this.height * .70, tileNumber.toString(), textStyle);
            this.hintText = this.game.add.text(this.x + this.width / 2, this.y + this.height * .76, TileEntity.numberHints[tileNumber], textStyle);
            this.tileText.anchor.set(0.5);
            this.hintText.anchor.set(0.5);
        }
        TileEntity.numberHints = {
            2: ".",
            3: "..",
            4: "...",
            5: "....",
            6: ".....",
            8: ".....",
            9: "....",
            10: "...",
            11: "..",
            12: "."
        };
        return TileEntity;
    })(Phaser.Image);
    kaTan.TileEntity = TileEntity;
})(kaTan || (kaTan = {}));
