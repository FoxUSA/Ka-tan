var kaTan;
(function (kaTan) {
    var Config = (function () {
        function Config() {
        }
        Config.debug = false;
        Config.decorations = true;
        Config.defaultTextStyle = function () {
            return { fill: "white", stroke: "black", strokeThickness: 2 };
        };
        return Config;
    })();
    kaTan.Config = Config;
})(kaTan || (kaTan = {}));
//TODO use amd code loading or ts
