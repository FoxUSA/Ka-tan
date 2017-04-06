declare var io;
namespace kaTan {
    export class MenuState extends Phaser.State {
        game:kaTan.Game;
        //TODO Connecting text

        /**
         * Gethostname and load into game
         */
        private promptForHostname(){
            alertify.defaultValue("http://"+window.location.hostname+":3000").prompt("Enter the server address. The person on the phone probably knows.", (url, ev) =>{
                ev.preventDefault();

                alertify.confirm("Would you like to run in full screen?",()=>{
                        this.game.scale.startFullScreen(false);
                        this.startGame(url);
                },()=>{
                    this.startGame(url);
                });

            });
        }

        /**
         * Start game
         * @param  {string} url - socket url to connect with
         */
        private startGame(url){
            this.game.socket=io(url);
            alertify.log("Connecting to "+url);

            this.game.socket.on("connect", ()=>{
                alertify.success("Connected to server");
                this.game.state.start("BoardState");
            },this.promptForHostname);
        }

        init(){
            this.game.world.setBounds(0, 0, 2000, 1500);
            this.game.add.image(-128, -128, "flag").scale.setTo(.7, .7);

            alertify.parent(document.body);

            this.promptForHostname();
        }
    }
}
