namespace kaTan {

    export class TileEntity extends Phaser.Image {

        constructor(game: Phaser.Game, x: number, y: number) {
            super(game, x, y, "tile", 0);
        }
    }
}
