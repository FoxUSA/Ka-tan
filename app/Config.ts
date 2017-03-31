namespace kaTan {
    export class Config{
        public static debug:boolean=false;
        public static defaultTextStyle = function():Phaser.PhaserTextStyle{
            return {fill:"white",stroke:"black",strokeThickness:2};
        };
        public static serverURL:string = "http://192.168.1.55:3000";
    }
}
//TODO use amd code loading or ts
