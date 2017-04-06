namespace kaTan {
    export class Config{
        public static debug:boolean=false;
        public static decorations:boolean=true;
        public static defaultTextStyle = function():Phaser.PhaserTextStyle{
            return {fill:"white",stroke:"black",strokeThickness:2};
        };
    }
}
//TODO use amd code loading or ts
