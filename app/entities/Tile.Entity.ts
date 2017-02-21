namespace kaTan {
    export enum TileType{
        brick,
        sheep,
        woods,
        wheat,
        rock,
        desert
    }

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
        constructor(game: Phaser.Game, x: number, y: number,type:TileType, tileNumber:number=0) {
            let typeName = TileType[type]+"Tile";
            super(game, x, y, typeName, 0);

            //Tile Number
                if(tileNumber==0)//Dont display zero
                    return;
                this.tileText = this.game.add.text(this.x + this.width / 2,this.y + this.height *.66,tileNumber.toString(),{});
                this.hintText = this.game.add.text(this.x + this.width / 2,this.y + this.height *.70,TileEntity.numberHints[tileNumber],{});
                this.tileText.anchor.set(0.5);
                this.hintText.anchor.set(0.5);
        }
        update(){
            //this.tileText.x = Math.floor(this.x + this.width / 2);
            //this.tileText.y = Math.floor(this.y + this.height / 2);
        }
    }
}
