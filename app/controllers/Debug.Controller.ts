namespace kaTan {
    export class DebugController{
        public static render(game:kaTan.Game){
            game.debug.text("FPS:"+game.time.fps, 32, game.height*.5, "white");
            game.debug.inputInfo(32, game.height*.7);
            game.debug.cameraInfo(game.camera, 32,  game.height*.85);
        }
    }
}
