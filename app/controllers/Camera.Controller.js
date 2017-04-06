var kaTan;
(function (kaTan) {
    var CameraController = (function () {
        function CameraController(game) {
            var _this = this;
            this.touchScrollEnabled = true;
            this.game = game;
            window.addEventListener("disableTouchScroll", function (e) {
                _this.touchScrollEnabled = false;
            });
            window.addEventListener("enableTouchScroll", function (e) {
                _this.touchScrollEnabled = true;
            });
        }
        CameraController.prototype.touchScroll = function () {
            if (!this.game.input.activePointer.isDown)
                return this.origDragPoint = null;
            if (this.origDragPoint) {
                // move the camera by the amount the mouse has moved since last update
                this.game.camera.x += this.origDragPoint.x - this.game.input.activePointer.position.x;
                this.game.camera.y += this.origDragPoint.y - this.game.input.activePointer.position.y;
            }
            // set new drag origin to current position
            this.origDragPoint = this.game.input.activePointer.position.clone();
        };
        CameraController.prototype.update = function () {
            //TODO keyboard panning
            //Touch Scrolling
            if (this.touchScrollEnabled)
                this.touchScroll();
        };
        return CameraController;
    })();
    kaTan.CameraController = CameraController;
})(kaTan || (kaTan = {}));
