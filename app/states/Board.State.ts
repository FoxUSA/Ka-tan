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
            let roadGroup = new Phaser.Group(this.game);
            let pieceGroup = new Phaser.Group(this.game);

            this.game.add.existing(dockGroup);
            this.game.add.existing(tileGroup);
            this.game.add.existing(roadGroup);//TODO sort piece group so you dont need two groups for z
            this.game.add.existing(pieceGroup);

            //UI
                this.game.add.existing(new DiceEntity(this.game));
                /*this.game.add.sprite(32, 100, "showIcon");
                this.game.add.sprite(32, 200, "showIcon");
                this.game.add.sprite(32, 300, "showIcon");
                this.game.add.sprite(32, 400, "showIcon");*///FIXME

            //Setup Board
                this.game.world.setBounds(0, 0, 2000, 1500);

            //Create from controller
                this.cameraController = new CameraController(this.game);
                this.game.camera.x=82;
                this.game.camera.y=343;

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

                        data.docks.forEach((dock)=>{
                             dockGroup.add(new DockEntity(  this.game,
                                                            dock.x,
                                                            dock.y,
                                                            dock.angle,
                                                            dock.type));
                        });

                        for(let piece in data.pieces){
                            let pieceEntity = new PieceEntity(this.game,
                                                        data.pieces[piece].x,
                                                        data.pieces[piece].y,
                                                        data.pieces[piece].angle,
                                                        data.pieces[piece].spriteKey,
                                                        data.pieces[piece].playerNumber,
                                                        data.pieces[piece].id);

                            //Roads will now always be under other pieces
                                if(data.pieces[piece].spriteKey=="road")
                                    roadGroup.add(pieceEntity);
                                else
                                    pieceGroup.add(pieceEntity);
                        }
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
