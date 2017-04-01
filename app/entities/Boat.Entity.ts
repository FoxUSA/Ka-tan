namespace kaTan {
    export class BoatEntity extends Phaser.Sprite {
        game:kaTan.Game;
        origX:number;
        origY:number;
        toX:number;
        toY:number;
        stop:boolean=true;

        private speed:number;
        private offSet:number= 75;

        constructor(game: kaTan.Game,x,y, toX,toY,angle) {
            super(game, x, y, "boat"+game.rnd.integerInRange(0, 5), 0);

            this.origX=this.x;
            this.origY=this.y;
            this.toX=toX;
            this.toY=toY;
            this.game=game;
            this.anchor.setTo(.5,.5);
            this.scale.setTo(.75,.75);
            this.z=100;
            this.speed=game.rnd.integerInRange(2, 3);

            this.angle=angle;

            setTimeout(()=>{
                this.stop=false;
            }, this.game.rnd.integerInRange(0, 100000));
        }

        private between(n, toN) {
            return n>= toN-this.offSet  && n <= toN+this.offSet;
        }

        update(){
            if(this.stop)
                return;

            if(this.x>this.toX)
                this.x-=this.speed;

            if(this.x<this.toX)
                this.x+=this.speed;

            if(this.y>this.toY)
                this.y-=this.speed;

            if(this.y<this.toY)
                this.y+=this.speed;

            if( this.between(this.x,this.toX)&&
                this.between(this.y,this.toY)){
                this.stop=true;
                setTimeout(()=>{
                    let tempToX=this.toX;
                    let tempToY=this.toY;
                    this.angle+=180;
                    this.stop=false;
                    this.toX=this.origX;
                    this.toY=this.origY;
                    this.origX=tempToX;
                    this.origY=tempToY;
                }, this.game.rnd.integerInRange(3000, 10000));
            }
        }
    }
}
