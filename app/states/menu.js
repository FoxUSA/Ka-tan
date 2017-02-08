var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var kaTan;
(function (kaTan) {
    var MenuState = (function (_super) {
        __extends(MenuState, _super);
        function MenuState() {
            _super.apply(this, arguments);
        }
        MenuState.prototype.create = function () {
        };
        MenuState.prototype.init = function () {
            alert("Menu Init"); //FIXME
        };
        return MenuState;
    })(Phaser.State);
    kaTan.MenuState = MenuState;
})(kaTan || (kaTan = {}));
