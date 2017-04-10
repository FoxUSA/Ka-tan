var kaTan;
(function (kaTan) {
    var DebugController = (function () {
        function DebugController() {
        }
        DebugController.render = function (game) {
            game.debug.text("FPS:" + game.time.fps, 32, game.height * .5, "white");
            game.debug.inputInfo(32, game.height * .7);
            game.debug.cameraInfo(game.camera, 32, game.height * .85);
        };
        return DebugController;
    })();
    kaTan.DebugController = DebugController;
})(kaTan || (kaTan = {}));
