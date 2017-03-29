namespace kaTan {
    export class PieceEntity extends Phaser.Sprite {
        game:kaTan.Game;
        last:{x:number,y:number};
        private static color = [0x428ff4,0xffffff,0xf47d42,0x41f465];
        playerNumber:number;
        pieceNumber:number;

        constructor(game: kaTan.Game, x: number, y: number,spriteKey, playerNumber:number, pieceNumber:number) {
            super(game, x, y, spriteKey, 0);

            this.playerNumber = playerNumber;
            this.pieceNumber = pieceNumber;

            this.inputEnabled = true;
            this.input.enableDrag(false, true);
            this.tint=PieceEntity.color[playerNumber];
            this.scale.setTo(.75, .75);

            this.events.onDragStart.add((e)=>{
                window.dispatchEvent(new Event("disableTouchScroll"));
            });
            this.events.onDragStop.add(()=>{
                window.dispatchEvent(new Event("enableTouchScroll"));
            });


            this.game.socket.on("pieceUpdate", (data)=>{
                //Check if this event pretains to this specific piece
                    if(data.playerNumber!=this.playerNumber || data.pieceNumber!=this.pieceNumber ||data.type!=this.key)
                        return;//Ignore

                this.x = data.x;
                this.y = data.y;

                this.updateLast();
            });
        }

        update(){
            if(!this.last || this.x!=this.last.x || this.y!=this.last.y)
                 this.game.socket.emit("pieceUpdate", {
                     playerNumber:this.playerNumber,
                     pieceNumber:this.pieceNumber,
                     type:this.key,
                     x:this.x,
                     y:this.y
                 });

            this.updateLast();
        }

        /**
         * Update last x and y
         */
        private updateLast(){
            this.last={
                x:this.x,
                y:this.y
            };
        }
    }
}
