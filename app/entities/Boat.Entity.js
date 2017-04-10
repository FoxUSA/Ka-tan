var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var kaTan;
(function (kaTan) {
    var BoatEntity = (function (_super) {
        __extends(BoatEntity, _super);
        function BoatEntity(game, x, y, toX, toY, angle) {
            var _this = this;
            _super.call(this, game, x, y, "boat" + game.rnd.integerInRange(0, 5), 0);
            this.stop = true;
            this.offSet = 75;
            this.origX = this.x;
            this.origY = this.y;
            this.toX = toX;
            this.toY = toY;
            this.game = game;
            this.anchor.setTo(.5, .5);
            this.scale.setTo(.75, .75);
            this.z = 100;
            this.speed = game.rnd.integerInRange(2, 3);
            this.angle = angle;
            setTimeout(function () {
                _this.stop = false;
            }, this.game.rnd.integerInRange(0, 100000));
        }
        BoatEntity.prototype.between = function (n, toN) {
            return n >= toN - this.offSet && n <= toN + this.offSet;
        };
        BoatEntity.prototype.update = function () {
            var _this = this;
            if (this.stop)
                return;
            if (this.x > this.toX)
                this.x -= this.speed;
            if (this.x < this.toX)
                this.x += this.speed;
            if (this.y > this.toY)
                this.y -= this.speed;
            if (this.y < this.toY)
                this.y += this.speed;
            if (this.between(this.x, this.toX) &&
                this.between(this.y, this.toY)) {
                this.stop = true;
                setTimeout(function () {
                    var tempToX = _this.toX;
                    var tempToY = _this.toY;
                    _this.angle += 180;
                    _this.stop = false;
                    _this.toX = _this.origX;
                    _this.toY = _this.origY;
                    _this.origX = tempToX;
                    _this.origY = tempToY;
                }, this.game.rnd.integerInRange(3000, 10000));
            }
        };
        return BoatEntity;
    })(Phaser.Sprite);
    kaTan.BoatEntity = BoatEntity;
})(kaTan || (kaTan = {}));
