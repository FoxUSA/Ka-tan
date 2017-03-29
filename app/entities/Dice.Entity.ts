namespace kaTan {
    export class DiceEntity extends Phaser.Text {
        game:kaTan.Game;
        constructor(game: kaTan.Game) {
            super(game, 32, 30,"",Config.defaultTextStyle);
            this.game=game;
            this.fixedToCamera=true;
            this.roll();

            this.inputEnabled = true;
            this.events.onInputDown.add(this.roll,this);
        }

        /**
         * Roll the dice
         */
        private roll():void{
            this.text = "Roll:"+ (this.game.rnd.integerInRange(1, 6)+this.game.rnd.integerInRange(1, 6)); //Have to do it this way because a random number from 2 to 12 would not have probability.
        }
    }
}
