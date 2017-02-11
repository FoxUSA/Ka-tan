namespace kaTan {
    export class CameraController{
        game: kaTan.Game;
        constructor(game: kaTan.Game) {
            this.game=game;

            //Config scrolling
                kaTanGame.kineticScrolling.configure({
                    kineticMovement: true,
                    timeConstantScroll: 325,
                    horizontalScroll: true,
                    verticalScroll: true,
                    horizontalWheel: true,
                    verticalWheel: false,
                    deltaWheel: 40
                });

            //Start scrolling
                this.game.kineticScrolling.start();
        }

        update(){
            //TODO keyboard panning
        }
    }
}
