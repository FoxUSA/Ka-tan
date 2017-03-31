namespace kaTan {
    export class TileEntity extends Phaser.Image {
        private static numberHints={ // Used to dispaly number hints
            2:".",
            3:"..",
            4:"...",
            5:"....",
            6:".....",
            8:".....",
            9:"....",
            10:"...",
            11:"..",
            12:"."
        };
        tileText:Phaser.Text;
        hintText:Phaser.Text;
        constructor(game: Phaser.Game, x: number, y: number,type:string, tileNumber:number=0) {
            super(game, x, y, type+"Tile", 0);

            //Tile Number
                if(tileNumber==0)//Dont display zero
                    return;

                let textStyle = Config.defaultTextStyle();
                if(tileNumber == 6 || tileNumber == 8)
                    textStyle.fill="#f44336";

                this.tileText = this.game.add.text(this.x + this.width / 2,this.y + this.height *.70,tileNumber.toString(),textStyle);
                this.hintText = this.game.add.text(this.x + this.width / 2,this.y + this.height *.76,TileEntity.numberHints[tileNumber],textStyle);
                this.tileText.anchor.set(0.5);
                this.hintText.anchor.set(0.5);
        }
    }
}
