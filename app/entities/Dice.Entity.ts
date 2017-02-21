namespace kaTan {
    export class DiceEntity extends Phaser.Text {
        game:kaTan.Game;
        constructor(game: kaTan.Game) {
            super(game, 32, 30,"",Config.defaultTextStyle);
            this.game=game;
            this.fixedToCamera=true;
            this.text = "Roll:"+this.roll();
        }

        /**
         * Roll the dice
         * @return {number} - number from 2 - 12
         */
        private roll():number{
            return this.game.rnd.integerInRange(1, 6)+this.game.rnd.integerInRange(1, 6); //Have to do it this way because a random number from 2 to 12 would not have probability.
        }

        /**
         * Phaser update method
         */
        update(){
            //this.text = "Roll:"+this.roll();
            //TODO clickabe to re roll
        }
    }
}
