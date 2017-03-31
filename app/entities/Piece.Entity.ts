namespace kaTan {
    export class PieceEntity extends Phaser.Sprite {
        game:kaTan.Game;
        last:{x:number,y:number,angle:number};
        playerNumber:number;
        id:string;

        constructor(game: kaTan.Game, x: number, y: number, angle:number ,spriteKey, playerNumber:number, id:string) {
            let key = spriteKey;
            if(playerNumber>=0)
                key+=playerNumber;
            super(game, x, y, key, 0);

            this.playerNumber = playerNumber;
            this.id = id;
            this.angle=angle;

            this.inputEnabled = true;
            this.input.enableDrag(false, true);
            if(key!="robber"){
                this.anchor.setTo(.5,.5);
                this.scale.setTo(.5, .5);
            }

            this.setupDragHandlers();

            //Double clack on road to rotate
                if(spriteKey=="road")
                    this.setupDoubleClick();

            this.game.socket.on("pieceUpdate", (data)=>{
                //Check if this event pretains to this specific piece
                    if(this.id!=data.id)
                        return;//Ignore

                this.x = data.x;
                this.y = data.y;
                this.angle=data.angle;

                this.updateLast();
            });
        }

        /**
         * Setup drag handlers
         */
        private setupDragHandlers(){
            this.events.onDragStart.add((e)=>{
                window.dispatchEvent(new Event("disableTouchScroll"));
            });
            this.events.onDragStop.add(()=>{
                window.dispatchEvent(new Event("enableTouchScroll"));
            });
        }

        /**
         * Setup double click handler
         */
        private setupDoubleClick(){
            this.events.onInputDown.add((sprite, pointer) =>{
                if (pointer.msSinceLastClick < this.game.input.doubleTapRate+100)
                  this.angle+=(360/3);
            });
        }

        update(){
            if(this.last && (this.x!=this.last.x || this.y!=this.last.y||this.angle!=this.last.angle))
                 this.game.socket.emit("pieceUpdate", {
                     playerNumber:this.playerNumber,
                     id:this.id,
                     type:this.key,
                     x:this.x,
                     y:this.y,
                     angle:this.angle
                 });

            this.updateLast();
        }

        /**
         * Update last x and y
         */
        private updateLast(){
            this.last={
                x:this.x,
                y:this.y,
                angle:this.angle
            };
        }
    }
}
