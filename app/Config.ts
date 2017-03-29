namespace kaTan {
    export class Config{
        public static debug:boolean=true;
        public static defaultTextStyle:Phaser.PhaserTextStyle = {fill:"white",stroke:"black",strokeThickness:2};
        public static serverURL:string = "http://localhost:3000";
    }
}
//TODO use amd code loading or ts
