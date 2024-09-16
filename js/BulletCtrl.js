import Bullet from "../js/Bullet.js";

export default class BulletCtrl{
        bullets = [];
        timeTilNextBullet = 0;
    constructor(canvas){
        this.canvas = canvas;
    }

    shoot(x,y,speed,damage,delay){
        if(this.timeTilNextBullet <= 0){
            //if(this.bullets.length < 3){ //reduce bullets, or will depend in all bullets shown on screen, oh wait got some logical errors here
            this.bullets.push(new Bullet(x,y,speed,damage));
                //}
                var bulletwav = new Audio("../audio/shoot02wav-14562.mp3");
                bulletwav.volume = 0.3;
                bulletwav.play();
            this.timeTilNextBullet = delay;
        }

        this.timeTilNextBullet--;
    }
    draw(ctx){
        console.log(this.bullets.length);
        this.bullets.forEach((bullet) => {
                if(this.BulletScreen(bullet)){
                    const index = this.bullets.indexOf(bullet);
                    this.bullets.splice();
                }
            bullet.draw(ctx);
        });
    }

    collideWith(sprite){
        return this.bullets.some(bullet=>{
            if(bullet.collideWith(sprite)){
                this.bullets.splice(this.bullets.indexOf(bullet),1);
                return true;
            }
            return false;
        })
    }

    BulletScreen(bullet){
        return bullet.y <= -bullet.height;
    }
}