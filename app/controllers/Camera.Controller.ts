namespace kaTan {
    export class CameraController{
        game: kaTan.Game;
        origDragPoint: Phaser.Point;
        touchScrollEnabled: boolean=true;
        constructor(game: kaTan.Game) {
            this.game=game;
            window.addEventListener("disableTouchScroll", (e) => {
                this.touchScrollEnabled=false;
            });
            window.addEventListener("enableTouchScroll", (e) => {
                this.touchScrollEnabled=true;
            });
        }

        touchScroll(){
            if (!this.game.input.activePointer.isDown)
                return 	this.origDragPoint = null;

            if (this.origDragPoint) {
                // move the camera by the amount the mouse has moved since last update
                    this.game.camera.x += this.origDragPoint.x - this.game.input.activePointer.position.x;
                    this.game.camera.y += this.origDragPoint.y - this.game.input.activePointer.position.y;
            }
            // set new drag origin to current position
                this.origDragPoint = this.game.input.activePointer.position.clone();
        }

        update(){
            //TODO keyboard panning

            //Touch Scrolling
                if(this.touchScrollEnabled)
                    this.touchScroll();
        }
    }
}
