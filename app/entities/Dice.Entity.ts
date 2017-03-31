namespace kaTan {
    export class DiceEntity extends Phaser.Text {
        game:kaTan.Game;
        constructor(game: kaTan.Game) {
            super(game, 32, 30,"Roll:",Config.defaultTextStyle());
            this.game=game;
            this.fixedToCamera=true;

            this.inputEnabled = true;
            this.events.onInputDown.add(this.roll,this);
            this.game.socket.on("roll", (data)=>{
                this.text = "Roll:"+ data;
                this.addColor("red", 0) ;
                //this.newColor("red");
                setTimeout(()=>{
                    this.addColor("white", 0);
                },1500);
            });
        }

        /**
         * Roll the dice
         */
        private roll():void{
            this.game.socket.emit("roll");
        }
    }
}
