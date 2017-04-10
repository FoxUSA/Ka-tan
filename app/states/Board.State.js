var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var kaTan;
(function (kaTan) {
    var BoardState = (function (_super) {
        __extends(BoardState, _super);
        function BoardState(game) {
            _super.call(this);
            this.game = game;
        }
        BoardState.prototype.fullBoardUpdate = function () {
            var _this = this;
            var dockGroup = new Phaser.Group(this.game);
            var tileGroup = new Phaser.Group(this.game);
            var roadGroup = new Phaser.Group(this.game);
            var pieceGroup = new Phaser.Group(this.game);
            this.game.add.existing(dockGroup);
            this.game.add.existing(tileGroup);
            this.game.add.existing(roadGroup);
            this.game.add.existing(pieceGroup);
            this.game.socket.on("initBoardUpdate", function (data) {
                data.tiles.forEach(function (tile) {
                    tileGroup.add(new kaTan.TileEntity(_this.game, tile.x, tile.y, tile.tileType, tile.diceNumber));
                });
                data.docks.forEach(function (dock) {
                    if (kaTan.Config.decorations)
                        dockGroup.add(new kaTan.BoatEntity(_this.game, dock.boatX, dock.boatY, dock.x, dock.y, dock.boatAngle));
                    dockGroup.add(new kaTan.DockEntity(_this.game, dock.x, dock.y, dock.angle, dock.type));
                });
                for (var piece in data.pieces) {
                    var pieceEntity = new kaTan.PieceEntity(_this.game, data.pieces[piece].x, data.pieces[piece].y, data.pieces[piece].angle, data.pieces[piece].spriteKey, data.pieces[piece].playerNumber, data.pieces[piece].id);
                    //Roads will now always be under other pieces
                    if (data.pieces[piece].spriteKey == "road")
                        roadGroup.add(pieceEntity);
                    else
                        pieceGroup.add(pieceEntity);
                }
                dockGroup.sort("z", Phaser.Group.SORT_DESCENDING);
            });
            this.game.socket.emit("requestInitBoardUpdate");
        };
        /**
         * Phaser default create method
         */
        BoardState.prototype.create = function () {
            var _this = this;
            //Setup Board
            this.game.world.setBounds(0, 0, 2000, 1500);
            //Create from controller
            this.cameraController = new kaTan.CameraController(this.game);
            this.game.camera.x = 82;
            this.game.camera.y = 343;
            if (window.innerWidth < 800 || window.innerHeight < 500)
                this.world.scale.setTo(.6, .6);
            if (window.innerWidth > 1000 && window.innerHeight > 800)
                this.world.scale.setTo(1.25, 1.25);
            //Request a full board update
            this.fullBoardUpdate();
            //UI
            this.game.add.existing(new kaTan.DiceEntity(this.game));
            /*this.game.add.sprite(32, 100, "showIcon");
            this.game.add.sprite(32, 200, "showIcon");
            this.game.add.sprite(32, 300, "showIcon");
            this.game.add.sprite(32, 400, "showIcon");*/ //FIXME
            //Handle disconnect
            this.game.socket.on("disconnect", function () {
                alertify.error("Disconnected from server");
                _this.game.state.start("MenuState");
            });
        };
        BoardState.prototype.update = function () {
            this.cameraController.update(); //TODO manually creating this object. Is there a better way?
        };
        BoardState.prototype.render = function () {
            _super.prototype.render.call(this);
            if (kaTan.Config.debug)
                kaTan.DebugController.render(this.game);
        };
        return BoardState;
    })(Phaser.State);
    kaTan.BoardState = BoardState;
})(kaTan || (kaTan = {}));
