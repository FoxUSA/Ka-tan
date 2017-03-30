declare var io;
namespace kaTan {
    export class MenuState extends Phaser.State {
        game:kaTan.Game;

        init(){
            this.game.socket=io(Config.serverURL);
            this.game.socket.on("connect", ()=>{
                this.game.state.start("BoardState");
            });
        }
    }
}
