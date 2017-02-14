namespace kaTan {
    export class PieceEntity extends Phaser.Sprite {
        game:kaTan.Game;
        constructor(game: kaTan.Game, x: number, y: number,sprite) {
            super(game, x, y, sprite, 0);
            this.inputEnabled = true;
            this.input.enableDrag(false, true);
            
            this.events.onDragStart.add((e)=>{
                window.dispatchEvent(new Event("disableTouchScroll"));
            });
            this.events.onDragStop.add(()=>{
                window.dispatchEvent(new Event("enableTouchScroll"));
            });
        }
    }
}
