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
        constructor(game: Phaser.Game, x: number, y: number,type:TileType) {
            let typeName = TileType[type]+"Tile";
            super(game, x, y, typeName, 0);
            //console.log(typeName);//FIXME
        }
    }
}
