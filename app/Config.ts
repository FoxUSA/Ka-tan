namespace kaTan {
    export class Config{
        public static debug:boolean=true;
        public static decorations:boolean=true;
        public static defaultTextStyle = function():Phaser.PhaserTextStyle{
            return {fill:"white",stroke:"black",strokeThickness:2};
        };
        public static serverURL:string = "http://127.0.0.1:3000";
    }
}
//TODO use amd code loading or ts
