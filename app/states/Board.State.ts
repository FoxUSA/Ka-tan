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
         * Create a random board
         * @param  {Phaser.Group} tileGroup   - Group to add tiles to
         */
        private createBoard(tileGroup: Phaser.Group){
            //Setup board
                let startX = 400;
                let startY = 400;

                let offsetX = 130;
                let offsetY = 115;
                let rows = [3, 4, 5, 4, 3];
                let rowsXOffset = [offsetX, offsetX / 2, 0, offsetX / 2, offsetX];
                let resources = 19;

                let availableTiles = [];
                let availableTileNumbers: number[] = [2,3,3,4,4,5,5,6,6,8,8,9,9,10,10,11,11,12];

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
                 * @return {TileType} - random tile type
                 */
                let getRandomResource = function():TileType{
                    let tileNumber = Math.floor(Math.random() * availableTiles.length);
                    let tile = availableTiles.splice(tileNumber,1)[0];
                    return tile;
                };

                /**
                 * Get a random tile number
                 * @return {number} - random tile number
                 */
                let getRandomTileNumber = function():number{
                    let i = Math.floor(Math.random() * availableTileNumbers.length);
                    let tileNumber = availableTileNumbers.splice(i,1)[0];
                    return tileNumber;
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
                        let tileType = getRandomResource();
                        let tile = new TileEntity(this.game,x,y,tileType,tileType!=TileType.desert?getRandomTileNumber():0);
                        tileGroup.add(tile);
                        count++;
                        this.tiles.push(tile);
                }
        }

        /**
         * [createPiece description]
         * @param  {Phaser.Group} pieceGroup  [description]
         * @param  {number}       x           [description]
         * @param  {number}       y           [description]
         * @param  {number}       xOffset     [description]
         * @param  {number}       yOffset     [description]
         * @param  {number}       tint        [description]
         */
        private createPiece(pieceGroup: Phaser.Group, x:number,y:number,xOffset:number,yOffset:number,tint:number){
            for(let i = 0;i<5;i++)
                pieceGroup.add(new PieceEntity( this.game,
                                                        x+this.game.rnd.integerInRange(5, 30),
                                                        y+this.game.rnd.integerInRange(5, 30),
                                                        "town",
                                                        tint));

            for(let i = 0;i<4;i++)
                pieceGroup.add(new PieceEntity( this.game,
                                                        x+xOffset+this.game.rnd.integerInRange(5, 30),
                                                        y+yOffset+this.game.rnd.integerInRange(5, 30),
                                                        "city",
                                                        tint));
        }

        /**
         * Phaser default create method
         */
        create() {
            let tileGroup = new Phaser.Group(this.game);
            let pieceGroup = new Phaser.Group(this.game);
            let numberGroup = new Phaser.Group(this.game); //Number of each resource

            this.game.add.existing(tileGroup);
            this.game.add.existing(pieceGroup);
            this.game.add.existing(numberGroup);

            //Setup Board
                this.createBoard(tileGroup);
                this.game.world.setBounds(0, 0, 1500, 1500);

            //Add Pieces
                this.createPiece(pieceGroup, 600,300,100,0,0x428ff4);
                this.createPiece(pieceGroup, 600,1000,100,0,0xffffff);
                this.createPiece(pieceGroup, 200,600,0,100,0xf47d42);
                this.createPiece(pieceGroup, 1100,600,0,100,0x41f465);

            //Create from controller
                this.cameraController = new CameraController(this.game);
                this.game.camera.x=82;
                this.game.camera.y=343;
        }

        update(){
            this.cameraController.update();//TODO manually creating this object. Is there a better way?
        }

        render(){
            super.render();

            //Debug
                this.game.debug.inputInfo(32, 32);
                this.game.debug.cameraInfo(this.game.camera, 32, 200);
        }
    }
}
