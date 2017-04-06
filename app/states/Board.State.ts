namespace kaTan {
    export class BoardState extends Phaser.State {
        game: kaTan.Game;
        private cameraController: CameraController;
        constructor(game: kaTan.Game) {
            super();
            this.game = game;
        }

        private fullBoardUpdate(){
            let dockGroup = new Phaser.Group(this.game);
            let tileGroup = new Phaser.Group(this.game);
            let roadGroup = new Phaser.Group(this.game);
            let pieceGroup = new Phaser.Group(this.game);

            this.game.add.existing(dockGroup);
            this.game.add.existing(tileGroup);
            this.game.add.existing(roadGroup);
            this.game.add.existing(pieceGroup);

            this.game.socket.on("initBoardUpdate", (data)=>{
                data.tiles.forEach((tile)=>{
                     tileGroup.add(new TileEntity(  this.game,
                                                    tile.x,
                                                    tile.y,
                                                    tile.tileType,
                                                    tile.diceNumber));
                });

                data.docks.forEach((dock)=>{
                    if(Config.decorations)
                        dockGroup.add(new BoatEntity(   this.game,
                                                        dock.boatX,
                                                        dock.boatY,
                                                        dock.x,
                                                        dock.y,
                                                        dock.boatAngle));
                    dockGroup.add(new DockEntity(   this.game,
                                                    dock.x,
                                                    dock.y,
                                                    dock.angle,
                                                    dock.type));
                });

                for(let piece in data.pieces){
                    let pieceEntity = new PieceEntity(  this.game,
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

                dockGroup.sort("z", Phaser.Group.SORT_DESCENDING);
            });
            this.game.socket.emit("requestInitBoardUpdate");
        }

        /**
         * Phaser default create method
         */
        create() {
            //Setup Board
                this.game.world.setBounds(0, 0, 2000, 1500);

            //Create from controller
                this.cameraController = new CameraController(this.game);
                this.game.camera.x=82;
                this.game.camera.y=343;

                if(window.innerWidth<800||window.innerHeight<500)
                    this.world.scale.setTo(.6,.6);

                if(window.innerWidth>1000&&window.innerHeight>800)
                    this.world.scale.setTo(1.25,1.25);

            //Request a full board update
                this.fullBoardUpdate();

            //UI
                this.game.add.existing(new DiceEntity(this.game));
                /*this.game.add.sprite(32, 100, "showIcon");
                this.game.add.sprite(32, 200, "showIcon");
                this.game.add.sprite(32, 300, "showIcon");
                this.game.add.sprite(32, 400, "showIcon");*///FIXME

            //Handle disconnect
                this.game.socket.on("disconnect", ()=>{
                    alertify.error("Disconnected from server");
                    this.game.state.start("MenuState");
                });
        }

        update(){
            this.cameraController.update();//TODO manually creating this object. Is there a better way?
        }

        render(){
            super.render();
            if(Config.debug)
                DebugController.render(this.game);
        }
    }
}
