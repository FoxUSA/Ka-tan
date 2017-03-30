namespace kaTan {
    export class BoardState extends Phaser.State {
        game: kaTan.Game;
        private cameraController: CameraController;
        constructor(game: kaTan.Game) {
            super();
            this.game = game;
        }

        /**
         * Phaser default create method
         */
        create() {
            let dockGroup = new Phaser.Group(this.game);
            let tileGroup = new Phaser.Group(this.game);
            let pieceGroup = new Phaser.Group(this.game);

            this.game.add.existing(dockGroup);
            this.game.add.existing(tileGroup);
            this.game.add.existing(pieceGroup);

            //UI
                this.game.add.existing(new DiceEntity(this.game));
                this.game.add.sprite(32, 100, "showIcon");
                this.game.add.sprite(32, 200, "showIcon");
                this.game.add.sprite(32, 300, "showIcon");
                this.game.add.sprite(32, 400, "showIcon");

            //Setup Board
                this.game.world.setBounds(0, 0, 2000, 1500);

            //Create from controller
                this.cameraController = new CameraController(this.game);
                this.game.camera.x=82;
                this.game.camera.y=343;

            //TODO
                dockGroup.add(new DockEntity(this.game, 880,400,-210));
                dockGroup.add(new DockEntity(this.game, 1090,400,210));
                dockGroup.add(new DockEntity(this.game, 685,515,-210));
                dockGroup.add(new DockEntity(this.game, 1195,585,-90));
                dockGroup.add(new DockEntity(this.game, 580,700,90));
                dockGroup.add(new DockEntity(this.game, 1195,815,-90));
                dockGroup.add(new DockEntity(this.game, 685,885,30));
                dockGroup.add(new DockEntity(this.game, 880,1000,30));
                dockGroup.add(new DockEntity(this.game, 1090,1000,-30));

            //Handle a full board update
                let handleReturn = ()=>{
                    this.game.socket.on("initBoardUpdate", (data)=>{
                        data.tiles.forEach((tile)=>{
                             tileGroup.add(new TileEntity(  this.game,
                                                            tile.x,
                                                            tile.y,
                                                            tile.tileType,
                                                            tile.diceNumber));
                        });

                        for(let piece in data.pieces)
                            pieceGroup.add(new PieceEntity( this.game,
                                                            data.pieces[piece].x,
                                                            data.pieces[piece].y,
                                                            data.pieces[piece].spriteKey,
                                                            data.pieces[piece].playerNumber,
                                                            data.pieces[piece].id));
                    });
                    this.game.socket.emit("requestInitBoardUpdate");
                };

                handleReturn();

            //Handle disconnect
                this.game.socket.on("disconnect", ()=>{
                    this.game.state.start("MenuState");
                });
        }

        update(){
            this.cameraController.update();//TODO manually creating this object. Is there a better way?
        }

        render(){
            super.render();

            //Debug
                if(Config.debug){
                    this.game.debug.inputInfo(32, this.game.height*.7);
                    this.game.debug.cameraInfo(this.game.camera, 32,  this.game.height*.85);
                }
        }
    }
}
