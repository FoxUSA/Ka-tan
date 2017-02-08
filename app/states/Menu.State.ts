namespace kaTan {
    export class MenuState extends Phaser.State {
        create() {
            let bla = new Phaser.Sprite(kaTanGame,0,0);
            kaTanGame.add.existing(bla);
        }

        init(){
            this.game.state.start("BoardState");
        }

    }
}
