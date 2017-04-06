var kaTan;
(function (kaTan) {
    var Config = (function () {
        function Config() {
        }
        return Config;
    }());
    Config.debug = false;
    Config.decorations = true;
    Config.defaultTextStyle = function () {
        return { fill: "white", stroke: "black", strokeThickness: 2 };
    };
    kaTan.Config = Config;
})(kaTan || (kaTan = {}));
