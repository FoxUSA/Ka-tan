namespace kaTan {
    export class BoardState extends Phaser.State {
        private tiles: TileEntity[] = [];

        constructor(game: Phaser.Game) {
            super();
            this.game = game;
        }

        create() {
            let startX = 20;
            let startY = 20;

            let offsetX = 130;
            let offsetY = 115;
            let rows = [3, 4, 5, 4, 3];
            let rowsXOffset = [offsetX, offsetX / 2, 0, offsetX / 2, offsetX];
            let resources = 19;
            let brick = 3;
            let sheep = 4;
            let woods = 4;
            let wheat = 4;
            let rock = 3;
            let desert = 1;

            let count = 0;
            let row = 0;

            for (let i = 0; i < resources; i++) {
                // New row?
                    if (count == rows[row]) {
                        count = 0;
                        row++;
                    }

                let x = startX+rowsXOffset[row]+(count*offsetX);
                let y = startY+row*offsetY;

                // Create an actor with code.
                    let tile = new TileEntity(this.game,x,y);
                    kaTanGame.add.existing(tile);
                    count++;
                    this.tiles.push(tile);
            }

        }
    }
}
