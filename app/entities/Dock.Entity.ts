namespace kaTan {
    export class DockEntity extends Phaser.Image {

        /**
         * Creates a dock entity
         * @param  {Phaser.Game} game [description]
         * @param  {number}      x    [description]
         * @param  {number}      y    [description]
         * @param  {number}      angle         [description]
         * @param  {string}      type [description]
         */
        constructor(game: Phaser.Game, x: number, y: number,angle:number =0,type:string) {
            super(game, x, y, "dock", 0);
            this.anchor.setTo(.5,.5);
            this.angle=angle;
            this.width=70;
            this.height=70;

            let textStyle = Config.defaultTextStyle();
            textStyle.fontSize=15;
            
            let text= new Phaser.Text(this.game, x, y, type=="Any"?"3:1":"2:1", textStyle);
            let text2= new Phaser.Text(this.game, x, y+15, type, textStyle);
            text.anchor.setTo(.5,.5);
            text2.anchor.setTo(.5,.5);

            this.game.add.existing(text);
            this.game.add.existing(text2);
        }
    }
}
