var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var kaTan;
(function (kaTan) {
    var PieceEntity = (function (_super) {
        __extends(PieceEntity, _super);
        function PieceEntity(game, x, y, angle, spriteKey, playerNumber, id) {
            var _this = this;
            var key = spriteKey;
            if (playerNumber >= 0)
                key += playerNumber;
            _super.call(this, game, x, y, key, 0);
            this.playerNumber = playerNumber;
            this.id = id;
            this.angle = angle;
            this.inputEnabled = true;
            this.input.enableDrag(false, true);
            if (key != "robber") {
                this.anchor.setTo(.5, .5);
                this.scale.setTo(.5, .5);
            }
            this.setupDragHandlers();
            //Double clack on road to rotate
            if (spriteKey == "road")
                this.setupDoubleClick();
            this.game.socket.on("pieceUpdate", function (data) {
                //Check if this event pretains to this specific piece
                if (_this.id != data.id)
                    return; //Ignore
                _this.x = data.x;
                _this.y = data.y;
                _this.angle = data.angle;
                _this.updateLast();
            });
        }
        /**
         * Setup drag handlers
         */
        PieceEntity.prototype.setupDragHandlers = function () {
            this.events.onDragStart.add(function (e) {
                window.dispatchEvent(new Event("disableTouchScroll"));
            });
            this.events.onDragStop.add(function () {
                window.dispatchEvent(new Event("enableTouchScroll"));
            });
        };
        /**
         * Setup double click handler
         */
        PieceEntity.prototype.setupDoubleClick = function () {
            var _this = this;
            this.events.onInputDown.add(function (sprite, pointer) {
                if (pointer.msSinceLastClick < _this.game.input.doubleTapRate + 100)
                    _this.angle += (360 / 3);
            });
        };
        PieceEntity.prototype.update = function () {
            if (this.last && (this.x != this.last.x || this.y != this.last.y || this.angle != this.last.angle))
                this.game.socket.emit("pieceUpdate", {
                    playerNumber: this.playerNumber,
                    id: this.id,
                    type: this.key,
                    x: this.x,
                    y: this.y,
                    angle: this.angle
                });
            this.updateLast();
            //Robber bounce
            if (this.key == "robber") {
                //Only do sometimes
                if (this.game.rnd.integerInRange(0, 2) != 1)
                    return;
                this.anchor.setTo(this.game.rnd.realInRange(0, .05), this.game.rnd.realInRange(0, .05));
                this.scale.setTo(this.game.rnd.realInRange(1, 1.05), this.game.rnd.realInRange(1.0, 1.05));
            }
        };
        /**
         * Update last x and y
         */
        PieceEntity.prototype.updateLast = function () {
            this.last = {
                x: this.x,
                y: this.y,
                angle: this.angle
            };
        };
        return PieceEntity;
    })(Phaser.Sprite);
    kaTan.PieceEntity = PieceEntity;
})(kaTan || (kaTan = {}));
