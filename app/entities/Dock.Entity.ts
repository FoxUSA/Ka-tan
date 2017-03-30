namespace kaTan {
    export class DockEntity extends Phaser.Image {

        /**
         * Creates a dock entity
         * @param  {Phaser.Game} game [description]
         * @param  {number}      x    [description]
         * @param  {number}      y    [description]
         * @param  {number} angle     [description]
         */
        constructor(game: Phaser.Game, x: number, y: number,angle:number =0) {
            super(game, x, y, "dock", 0);
            this.anchor.setTo(.5,.5);
            this.angle=angle;
            this.width=70;
            this.height=70;
        }
    }
}
