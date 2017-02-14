namespace kaTan {
    export class BoardState extends Phaser.State {
        game: kaTan.Game;
        private tiles: TileEntity[] = [];
        private cameraController: CameraController;
        constructor(game: kaTan.Game) {
            super();
            this.game = game;
        }

        /**
         * Create board tiles
         */
        private createBoard(){
            //Setup board
                let startX = 400;
                let startY = 400;

                let offsetX = 130;
                let offsetY = 115;
                let rows = [3, 4, 5, 4, 3];
                let rowsXOffset = [offsetX, offsetX / 2, 0, offsetX / 2, offsetX];
                let resources = 19;

                let availableTiles = [];

                let count = 0;
                let row = 0;

                /**
                 * Small helper function to
                 * @param string - name - Name to add to array
                 * @param number - count - Number of time to add to array
                 */
                let addResources = function(name:kaTan.TileType,count:number){
                    for(let i = 0; i<count;i++)
                        availableTiles.push(name);
                };

                addResources(TileType.brick,3);
                addResources(TileType.sheep,4);
                addResources(TileType.woods,4);
                addResources(TileType.wheat,4);
                addResources(TileType.rock,3);
                addResources(TileType.desert,1);

                /**
                 * Get a random tile type
                 * @return string - enu [description]
                 */
                let getRandomResource = function():TileType{
                    let tileNumber = Math.floor(Math.random() * availableTiles.length);
                    let tile = availableTiles.splice(tileNumber,1)[0];
                    return tile;
                };

                for (let i = 0; i < resources; i++) {
                    // New row?
                        if (count == rows[row]) {
                            count = 0;
                            row++;
                        }

                    let x = startX+rowsXOffset[row]+(count*offsetX);
                    let y = startY+row*offsetY;

                    // Create an actor with code.
                        let tile = new TileEntity(this.game,x,y,getRandomResource());
                        kaTanGame.add.existing(tile);
                        count++;
                        this.tiles.push(tile);
                }
        }

        create() {
            //Setup Board
                this.createBoard();
                this.game.world.setBounds(0, 0, 1500, 1500);

            //Add UI Controls
                kaTanGame.add.existing(new PieceEntity(this.game,100,100,"town"));
                kaTanGame.add.existing(new PieceEntity(this.game,0,0,"city"));

            //Create from controller
                this.cameraController = new CameraController(this.game);
                this.game.camera.x=82;
                this.game.camera.y=343;
        }

        update(){
            this.cameraController.update();
        }

        render(){
            super.render();

            //Debug
                this.game.debug.inputInfo(32, 32);
                this.game.debug.cameraInfo(this.game.camera, 32, 200);
        }
    }
}
