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

            let textStyle = Config.defaultTextStyle();
            textStyle.fontSize=15;
            textStyle.align="center";

            let text= new Phaser.Text(this.game, x, y, "2:1\nsheep", textStyle);
            text.anchor.setTo(.5,.5);;

            this.game.add.existing(text);//FIXME
        }
    }
}
